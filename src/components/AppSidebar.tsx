
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

import { 
  LayoutDashboard, 
  Sun, 
  Users, 
  BarChart3, 
  Settings,
  FileText,
  LogOut
} from "lucide-react";

export function AppSidebar() {
  const { logout, user, isCompany } = useAuth();

  const companyMenuItems = [
    { icon: LayoutDashboard, label: "Painel", to: "/dashboard" },
    { icon: Sun, label: "Usinas Solares", to: "/plants" },
    { icon: Users, label: "Clientes", to: "/clients" },
    { icon: BarChart3, label: "Análises", to: "/analytics" },
    { icon: FileText, label: "Relatórios", to: "/reports" },
    { icon: Settings, label: "Configurações", to: "/settings" },
  ];

  const clientMenuItems = [
    { icon: LayoutDashboard, label: "Painel", to: "/dashboard" },
    { icon: Sun, label: "Minhas Usinas", to: "/my-plants" },
    { icon: BarChart3, label: "Desempenho", to: "/performance" },
    { icon: FileText, label: "Relatórios", to: "/reports" },
    { icon: Settings, label: "Configurações", to: "/settings" },
  ];

  const menuItems = isCompany ? companyMenuItems : clientMenuItems;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="solar-gradient rounded-lg p-2">
            <Sun className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Solara Power Hub</h1>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{isCompany ? "Portal da Empresa" : "Portal do Cliente"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 ${
                          isActive ? "bg-sidebar-accent text-white" : "text-sidebar-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name}
              </p>
              <p className="text-xs text-sidebar-foreground opacity-70 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent w-full justify-start"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
