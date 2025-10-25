import React, { useState } from 'react';
import { Layout, Menu, Avatar, Badge, Input, Dropdown, List } from 'antd';
import type { MenuProps } from 'antd';
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
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import exeLogo from '../assets/exe.png';

interface NotificationItem {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const ModeratorLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock notifications data
  const notifications: NotificationItem[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Cần xử lý',
      description: '12 nhóm đang chờ phân công GV',
      time: '5 phút trước',
      read: false,
    },
    {
      id: '2',
      type: 'success',
      title: 'Hoàn thành',
      description: '36 nhóm đã được phân công thành công',
      time: '1 giờ trước',
      read: false,
    },
    {
      id: '3',
      type: 'info',
      title: 'Thông kê',
      description: '8 giảng viên đang hướng dẫn',
      time: '2 giờ trước',
      read: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return (
          <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '18px' }} />
        );
      case 'warning':
        return (
          <ExclamationCircleOutlined
            style={{ color: '#fa8c16', fontSize: '18px' }}
          />
        );
      case 'info':
        return (
          <InfoCircleOutlined style={{ color: '#1890ff', fontSize: '18px' }} />
        );
      default:
        return <BellOutlined style={{ fontSize: '18px' }} />;
    }
  };

  const notificationContent = (
    <div style={{ width: '360px', maxHeight: '400px', overflowY: 'auto' }}>
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid #f0f0f0',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        Thông báo
      </div>
      <List
        itemLayout='horizontal'
        dataSource={notifications}
        renderItem={item => (
          <List.Item
            style={{
              padding: '12px 16px',
              backgroundColor: item.read ? '#fff' : '#f6ffed',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = item.read
                ? '#fff'
                : '#f6ffed';
            }}
          >
            <List.Item.Meta
              avatar={getNotificationIcon(item.type)}
              title={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontWeight: item.read ? 'normal' : 'bold' }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: '12px', color: '#999' }}>
                    {item.time}
                  </span>
                </div>
              }
              description={
                <span style={{ fontSize: '13px' }}>{item.description}</span>
              }
            />
          </List.Item>
        )}
      />
      <div
        style={{
          padding: '12px 16px',
          textAlign: 'center',
          borderTop: '1px solid #f0f0f0',
          cursor: 'pointer',
          color: '#1890ff',
        }}
      >
        Xem tất cả thông báo
      </div>
    </div>
  );

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
          background: 'linear-gradient(180deg, #FF6B35 0%, #F57C00 100%)',
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
            background: 'rgba(255,255,255,0.15)',
            borderBottom: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
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
            <Dropdown
              dropdownRender={() => notificationContent}
              trigger={['click']}
              placement='bottomRight'
            >
              <Badge count={unreadCount} offset={[-5, 5]}>
                <BellOutlined
                  style={{ fontSize: '20px', cursor: 'pointer', color: '#666' }}
                />
              </Badge>
            </Dropdown>
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
