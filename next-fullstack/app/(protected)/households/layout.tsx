import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { UserProvider } from "@/hooks/useUser";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/get-user";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/auth/login");
  }

  return (
    <UserProvider requireAuth={true}>
      <main className="min-h-screen flex flex-col items-center">
        <div className="flex-1 w-full flex flex-col gap-12 items-center">
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
              <div className="flex gap-5 items-center font-semibold">
                <Link href={"/households"}>What for Dinner</Link>
              </div>
              {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
            </div>
          </nav>
          <div className="flex-1 flex flex-col gap-20 p-5 w-full max-w-5xl">
            {children}
          </div>

          <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
            <p className="font-semibold">
              What for dinner
            </p>
            <ThemeSwitcher />
          </footer>
        </div>
      </main>
    </UserProvider>
  );
}
