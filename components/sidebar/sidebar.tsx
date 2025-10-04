import SidebarHeader from "@/components/sidebar/sidebar-header";
import SidebarFooter from "@/components/sidebar/sidebar-footer";

export default function Sidebar() {
    return (
        <div className={"flex flex-col h-full"}>
            <SidebarHeader />
            <div className={"h-full overflow-y-auto"}>

            </div>
            <SidebarFooter />
        </div>
    )
}