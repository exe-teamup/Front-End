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
import exeLogo from '../assets/exe.png';

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
            padding: '12px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.2s',
          }}
        >
          <img
            src={exeLogo}
            alt='EXE Logo'
            style={{
              height: collapsed ? '40px' : '48px',
              width: 'auto',
              objectFit: 'contain',
              transition: 'all 0.2s',
            }}
          />
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
            {collapsed ? 'MOD' : 'MODERATOR'}
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
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          }}
        >
          <Input
            placeholder='Tìm kiếm...'
            prefix={<SearchOutlined />}
            style={{
              width: '300px',
              borderRadius: '20px',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Badge count={5}>
              <BellOutlined
                style={{ fontSize: '20px', cursor: 'pointer', color: '#666' }}
              />
            </Badge>
            <Avatar
              style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}
              icon={<UserOutlined />}
            />
          </div>
        </Header>

        <Content
          style={{
            margin: 0,
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
