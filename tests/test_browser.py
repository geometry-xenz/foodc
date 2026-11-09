import asyncio
import time
import subprocess
import os
from playwright.async_api import async_playwright

async def run_browser_tests():
    # 1. Start uvicorn server
    server_proc = subprocess.Popen(
        ["./venv/bin/uvicorn", "backend.app.main:app", "--host", "127.0.0.1", "--port", "8000"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    time.sleep(2) # Give server time to bind

    os.makedirs("test_screenshots", exist_ok=True)
    logs = []
    errors = []

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(
                executable_path="/usr/bin/chromium",
                headless=True,
                args=["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"]
            )

            # Viewports to test
            viewports = [
                {"name": "desktop", "width": 1440, "height": 900, "is_mobile": False},
                {"name": "tablet_ipad", "width": 768, "height": 1024, "is_mobile": True},
                {"name": "mobile_phone", "width": 390, "height": 844, "is_mobile": True}
            ]

            for vp in viewports:
                print(f"\n--- Testing Viewport: {vp['name']} ({vp['width']}x{vp['height']}) ---")
                context = await browser.new_context(
                    viewport={"width": vp["width"], "height": vp["height"]},
                    is_mobile=vp["is_mobile"],
                    has_touch=vp["is_mobile"]
                )
                page = await context.new_page()

                def on_console(msg):
                    if msg.type in ("error", "warning"):
                        print(f"[{vp['name']} Console {msg.type}]: {msg.text}")
                        logs.append(f"{vp['name']}: {msg.text}")

                def on_page_error(err):
                    print(f"[{vp['name']} PageError]: {err}")
                    errors.append(f"{vp['name']}: {err}")

                page.on("console", on_console)
                page.on("pageerror", on_page_error)

                # Test 1: Homepage Visit
                await page.goto("http://127.0.0.1:8000/", wait_until="networkidle")
                await page.wait_for_timeout(1000)
                await page.screenshot(path=f"test_screenshots/{vp['name']}_homepage.png", full_page=False)
                print(f"   ✓ Captured {vp['name']}_homepage.png")

                # Test 2: If mobile/tablet, test mobile menu open
                if vp["is_mobile"]:
                    menu_btn = page.locator("#menu-toggle:visible")
                    if await menu_btn.count() > 0:
                        await menu_btn.first.click()
                        await page.wait_for_timeout(500)
                        await page.screenshot(path=f"test_screenshots/{vp['name']}_mobile_menu.png")
                        print(f"   ✓ Captured {vp['name']}_mobile_menu.png")

                # Test 3: Scroll down to trigger ScrollTrigger & sections
                await page.evaluate("window.scrollTo(0, 1200)")
                await page.wait_for_timeout(800)
                await page.screenshot(path=f"test_screenshots/{vp['name']}_scrolled.png", full_page=False)

                # Test 4: Navigate to App
                await page.goto("http://127.0.0.1:8000/app", wait_until="networkidle")
                await page.wait_for_timeout(1200)
                await page.screenshot(path=f"test_screenshots/{vp['name']}_app_dashboard.png")
                print(f"   ✓ Captured {vp['name']}_app_dashboard.png")

                # Test 5: Navigate to Pantry tab (click visible tab button)
                pantry_btn = page.locator("[data-tab='pantry']:visible").first
                if await pantry_btn.count() > 0:
                    await pantry_btn.click()
                    await page.wait_for_timeout(800)
                    await page.screenshot(path=f"test_screenshots/{vp['name']}_app_pantry.png")
                    print(f"   ✓ Captured {vp['name']}_app_pantry.png")

                # Test 6: Navigate to Recipes tab
                recipes_btn = page.locator("[data-tab='recipes']:visible").first
                if await recipes_btn.count() > 0:
                    await recipes_btn.click()
                    await page.wait_for_timeout(1000)
                    await page.screenshot(path=f"test_screenshots/{vp['name']}_app_recipes.png")
                    print(f"   ✓ Captured {vp['name']}_app_recipes.png")

                # Test 7: Navigate to Goals tab
                goals_btn = page.locator("[data-tab='goals']:visible").first
                if await goals_btn.count() > 0:
                    await goals_btn.click()
                    await page.wait_for_timeout(800)
                    await page.screenshot(path=f"test_screenshots/{vp['name']}_app_goals.png")
                    print(f"   ✓ Captured {vp['name']}_app_goals.png")

                # Test 8: Navigate to Nutrition tab
                nutrition_btn = page.locator("[data-tab='nutrition']:visible").first
                if await nutrition_btn.count() > 0:
                    await nutrition_btn.click()
                    await page.wait_for_timeout(800)
                    await page.screenshot(path=f"test_screenshots/{vp['name']}_app_nutrition.png")
                    print(f"   ✓ Captured {vp['name']}_app_nutrition.png")

                await context.close()

            await browser.close()

    finally:
        server_proc.terminate()
        server_proc.wait()

    print("\n================ TEST SUMMARY ================")
    print(f"Console warnings/errors: {len(logs)}")
    print(f"Page uncaught errors: {len(errors)}")
    for e in errors:
        print(f"  ❌ {e}")
    if not errors:
        print("🎉 ZERO PAGE ERRORS! Rendering succeeded across all viewports!")

if __name__ == "__main__":
    asyncio.run(run_browser_tests())
