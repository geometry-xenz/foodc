#!/usr/bin/env python3
"""Multi-viewport runtime verification and screenshots for DRISHYAM."""

from __future__ import annotations

import glob
import json
import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = os.environ.get("DRISHYAM_URL", "http://127.0.0.1:3100")
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "screenshots"

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "tablet": {"width": 834, "height": 1112},
    "mobile": {"width": 390, "height": 844},
}

APP_ROUTES = [
    ("dashboard", "/app", "Your kitchen"),
    ("pantry", "/app/pantry", "Your pantry"),
    ("recipes", "/app/recipes", "Your recipes"),
    ("flavour", "/app/flavour", "Molecular Aroma Network"),
    ("meal-planner", "/app/meal-planner", "Compose your day"),
    ("meal-history", "/app/meal-history", "Meal History & Portions"),
    ("shopping", "/app/shopping", "Shopping List"),
    ("nutrition", "/app/nutrition", "Your biology"),
    ("goals", "/app/goals", "Goals & Target Configuration"),
    ("saved", "/app/saved", "Saved Recipes"),
    ("profile", "/app/profile", "Profile & Preferences"),
    ("settings", "/app/settings", "Settings & Account"),
]

console_errors: list[str] = []
page_errors: list[str] = []


def capture(page, path: Path, full_page: bool = False) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    page.screenshot(path=str(path), full_page=full_page)


def login(page) -> None:
    page.goto(f"{BASE}/login", wait_until="networkidle")
    page.fill("#email", "demo@drishyam.ai")
    page.fill("#password", "drishyam2026")
    page.click('button[type="submit"]')
    page.wait_for_url("**/app", timeout=25000)
    page.wait_for_load_state("networkidle")


def settle(page, ms: int = 900) -> None:
    page.wait_for_timeout(ms)


def verify_viewport(browser, name: str, viewport: dict) -> dict:
    context = browser.new_context(
        viewport=viewport,
        device_scale_factor=1,
        reduced_motion="no-preference",
    )
    page = context.new_page()
    page.on(
        "console",
        lambda msg: console_errors.append(f"[{name}] {msg.text}")
        if msg.type == "error"
        else None,
    )
    page.on("pageerror", lambda err: page_errors.append(f"[{name}] {err}"))

    result: dict = {"viewport": name, "routes": {}, "landing": {}}

    # Landing experience
    page.goto(BASE, wait_until="load")
    settle(page, 5200)  # allow the cinematic preloader to finish
    page.mouse.move(viewport["width"] * 0.65, viewport["height"] * 0.4)
    settle(page, 500)
    capture(page, OUT / name / "01-landing-hero.png")
    result["landing"]["hero"] = page.locator("h1").inner_text()

    for index in (1, 2, 3, 4, 5):
        section = page.locator(f"#scene-{index}")
        section.scroll_into_view_if_needed()
        settle(page, 1100)
        capture(page, OUT / name / f"0{index + 1}-landing-scene-{index}.png")

    # Return to top for the nav preview
    page.evaluate("window.scrollTo(0, 0)")
    settle(page)

    # Authentication
    login(page)
    capture(page, OUT / name / "07-login-success.png")

    for slug, route, marker in APP_ROUTES:
        page.goto(f"{BASE}{route}", wait_until="networkidle")
        settle(page, 700)
        body = page.locator("body").inner_text()
        result["routes"][slug] = marker in body
        result.setdefault("widths", {})[slug] = page.evaluate(
            "() => ({scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth})"
        )
        capture(page, OUT / name / f"08-{slug}.png", full_page=True)

    # Recipes detail modal
    page.goto(f"{BASE}/app/recipes", wait_until="networkidle")
    settle(page)
    first_card = page.locator("article button").first
    if first_card.count() > 0:
        first_card.click()
        page.wait_for_selector('[role="dialog"]', timeout=10000)
        settle(page, 900)
        capture(page, OUT / name / "09-recipe-modal.png")

    # Planner assignment modal (desktop + tablet only)
    if name != "mobile":
        page.goto(f"{BASE}/app/planner", wait_until="networkidle")
        settle(page)
        assign = page.get_by_text("Assign dish").first
        if assign.count() > 0:
            assign.click()
            page.wait_for_selector('[role="dialog"]', timeout=10000)
            settle(page, 900)
            capture(page, OUT / name / "10-planner-modal.png")

    result["body_width"] = page.evaluate(
        "() => ({scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth})"
    )
    context.close()
    return result


def chromium_executable() -> str | None:
    if os.environ.get("CHROMIUM_PATH"):
        return os.environ["CHROMIUM_PATH"]
    candidates = sorted(
        glob.glob(
            str(
                Path.home()
                / ".cache/ms-playwright/chromium_headless_shell-*/*/chrome-headless-shell"
            )
        ),
        reverse=True,
    )
    if not candidates and os.path.exists("/usr/bin/chromium"):
        return "/usr/bin/chromium"
    return candidates[0] if candidates else None


def main() -> int:
    OUT.mkdir(exist_ok=True)
    results = {}
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            headless=True, executable_path=chromium_executable()
        )
        for name, viewport in VIEWPORTS.items():
            print(f"→ {name} {viewport['width']}×{viewport['height']}")
            results[name] = verify_viewport(browser, name, viewport)
        browser.close()

    report = {
        "baseUrl": BASE,
        "viewports": results,
        "consoleErrors": console_errors,
        "pageErrors": page_errors,
    }
    (OUT / "report.json").write_text(json.dumps(report, indent=2))

    failed_routes = [
        f"{viewport}:{slug}"
        for viewport, data in results.items()
        for slug, ok in data["routes"].items()
        if not ok
    ]
    overflow = [
        f"{viewport}:{slug}: {widths}"
        for viewport, data in results.items()
        for slug, widths in data.get("widths", {}).items()
        if widths["scroll"] > widths["client"] + 1
    ]

    print(json.dumps(report, indent=2))
    print(f"\nScreenshots: {OUT}")
    if failed_routes:
        print("Missing route markers:", failed_routes)
    if overflow:
        print("Horizontal overflow:", overflow)
    if page_errors:
        print("Page errors:", page_errors)
    if console_errors:
        print("Console errors:", console_errors)

    return 1 if failed_routes or page_errors or overflow else 0


if __name__ == "__main__":
    sys.exit(main())
