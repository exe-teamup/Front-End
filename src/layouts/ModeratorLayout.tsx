import React, { useState } from 'react';
import { Layout, Menu, Avatar, Badge, Input } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  BookOutlined,
  FileTextOutlined,
  UserOutlined,
  ReadOutlined,
  BellOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const ModeratorLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      key: '/moderator',
      icon: <HomeOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/moderator/workload',
      icon: <TeamOutlined />,
      label: 'Workload Giảng viên',
    },
    {
      key: '/moderator/groups',
      icon: <UsergroupAddOutlined />,
      label: 'Tổng quan Nhóm',
    },
    {
      type: 'divider',
    },
    {
      key: 'setup',
      icon: <SettingOutlined />,
      label: 'Thiết lập (Setup)',
      children: [
        {
          key: '/moderator/semesters',
          icon: <BookOutlined />,
          label: 'Quản lý Kỳ học',
        },
        {
          key: '/moderator/templates',
          icon: <FileTextOutlined />,
          label: 'Quản lý Template Nhóm',
        },
        {
          key: '/moderator/lecturers',
          icon: <UserOutlined />,
          label: 'Quản lý Giảng viên',
        },
        {
          key: '/moderator/students',
          icon: <TeamOutlined />,
          label: 'Quản lý Sinh viên',
        },
        {
          key: '/moderator/courses',
          icon: <ReadOutlined />,
          label: 'Quản lý Lớp học',
        },
      ],
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = e => {
    navigate(e.key);
  };

  // Get current selected key based on pathname
  const getSelectedKey = () => {
    const path = location.pathname;
    // Check if any submenu item matches
    for (const item of menuItems) {
      if (item && 'children' in item && item.children) {
        for (const child of item.children) {
          if (child && 'key' in child && path === child.key) {
            return [child.key as string];
          }
        }
      }
    }
    return [path];
  };

  const getOpenKeys = () => {
    const path = location.pathname;
    if (
      path.includes('/semesters') ||
      path.includes('/templates') ||
      path.includes('/lecturers') ||
      path.includes('/students') ||
      path.includes('/courses')
    ) {
      return ['setup'];
    }
    return [];
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
        style={{
          background: '#001529',
        }}
        width={250}
      >
        <div
          style={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: collapsed ? '18px' : '20px',
            fontWeight: 'bold',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.2s',
          }}
        >
          {collapsed ? '📊' : '📊 EXE Logo'}
        </div>

        <div
          style={{
            padding: collapsed ? '12px 8px' : '16px',
            background: 'rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            style={{
              color: '#fff',
              fontSize: collapsed ? '12px' : '16px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            MODERATOR
          </div>
        </div>

        <Menu
          theme='dark'
          mode='inline'
          selectedKeys={getSelectedKey()}
          defaultOpenKeys={getOpenKeys()}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            borderRight: 0,
            marginTop: '8px',
          }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: '0 24px',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(0,21,41,0.08)',
          }}
        >
          <Input
            placeholder='Search'
            prefix={<SearchOutlined style={{ color: '#999' }} />}
            style={{
              width: '300px',
              borderRadius: '8px',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Badge count={11} offset={[-5, 5]}>
              <BellOutlined
                style={{ fontSize: '20px', cursor: 'pointer', color: '#666' }}
              />
            </Badge>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Avatar
                style={{ backgroundColor: '#1890ff' }}
                icon={<UserOutlined />}
              />
              <span style={{ fontWeight: 500, color: '#333' }}>Moderator</span>
            </div>
          </div>
        </Header>

        <Content
          style={{
            margin: '24px',
            padding: 0,
            minHeight: 280,
            background: '#f0f2f5',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ModeratorLayout;
