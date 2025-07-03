import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/get-user";
import Breadcrumbs from "./breadcrumbs";
import { getMyHouseholds } from "@/lib/supabase/get-my-households";

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode,
  params: Promise<{ household: string }>
}) {
  const user = await getUser();
  if (!user) {
    redirect("/auth/login");
  }
  const { household: currentHouseholdId } = await params;
  const { error, households } = await getMyHouseholds();
  if (error) {
    return <div>{error}</div>
  }

  return (
    <SidebarProvider>
      <AppSidebar appSidebar={{ households: households || [], currentHouseholdId: Number(currentHouseholdId), user }} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumbs />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
