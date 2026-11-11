import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/api";
import LoginPage from "@/app/login/page";

export const metadata = {
  title: "Create DRISHYAM Account — Intelligent Kitchen",
  description: "Register for your DRISHYAM computational gastronomy workspace.",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getSessionUser();
  if (session) redirect("/app");

  const params = await searchParams;
  return (
    <LoginPage
      searchParams={Promise.resolve({
        mode: "register",
        next: params.next,
      })}
    />
  );
}
