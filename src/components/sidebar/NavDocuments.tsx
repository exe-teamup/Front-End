import { NavLink } from 'react-router-dom';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavDocumentsProps {
  items: NavItem[];
}

export function NavDocuments({ items }: NavDocumentsProps) {
  // Tách Dashboard ra khỏi danh sách clickable items
  const dashboardItem = items.find(item => item.title === 'Dashboard');
  const menuItems = items.filter(item => item.title !== 'Dashboard');

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>
        {dashboardItem ? dashboardItem.title : 'Quản lý'}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      isActive
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-gray-900 hover:bg-accent hover:text-accent-foreground'
                    }
                  >
                    <Icon className='h-4 w-4' />
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
