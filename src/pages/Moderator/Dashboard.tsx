import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Button,
  List,
  Tag,
  Avatar,
  Space,
  Modal,
  Form,
  Select,
  DatePicker,
  InputNumber,
  message,
} from 'antd';
import {
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  mockDashboardStats,
  mockGroups,
  mockActivities,
  type Group,
  type Activity,
} from './mockData';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const stats = [
    {
      title: 'Tổng số nhóm',
      value: mockDashboardStats.totalGroups,
      icon: <TeamOutlined />,
      color: '#1890ff',
      bgColor: '#e6f7ff',
      trend: 'up',
      trendValue: 12,
    },
    {
      title: 'Chờ phân công',
      value: mockDashboardStats.pendingAssignment,
      icon: <ClockCircleOutlined />,
      color: '#fa8c16',
      bgColor: '#fff7e6',
      trend: 'down',
      trendValue: 3,
    },
    {
      title: 'GV phân dãng',
      value: mockDashboardStats.assigned,
      icon: <CheckCircleOutlined />,
      color: '#52c41a',
      bgColor: '#f6ffed',
      trend: 'up',
      trendValue: 8,
    },
    {
      title: 'Giảng viên đang dạy',
      value: mockDashboardStats.activeLecturers,
      icon: <UserOutlined />,
      color: '#722ed1',
      bgColor: '#f9f0ff',
      trend: 'up',
      trendValue: 2,
    },
  ];

  const pendingGroups = mockGroups
    .filter(g => g.status === 'pending')
    .slice(0, 3);

  const handleAddSemester = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(() => {
        // New semester validated
        message.success('Đã thêm kỳ học mới thành công!');
        form.resetFields();
        setIsModalOpen(false);
      })
      .catch(() => {
        // Validate Failed
      });
  };

  const handleModalCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
          Washboard - Mog vien
        </h1>
        <p style={{ color: '#666', marginTop: '8px' }}>
          Quản lý và điều tiết hoạt động
        </p>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              hoverable
              onClick={() => {
                if (index === 0 || index === 1 || index === 2) {
                  navigate('/moderator/groups');
                } else if (index === 3) {
                  navigate('/moderator/workload');
                }
              }}
              style={{
                borderRadius: '12px',
                background: stat.bgColor,
                border: 'none',
              }}
            >
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={
                  <div
                    style={{
                      fontSize: '32px',
                      color: stat.color,
                      marginBottom: '8px',
                    }}
                  >
                    {stat.icon}
                  </div>
                }
                valueStyle={{ color: stat.color, fontWeight: 'bold' }}
                suffix={
                  <div style={{ fontSize: '14px', marginLeft: '8px' }}>
                    {stat.trend === 'up' ? (
                      <ArrowUpOutlined style={{ color: '#52c41a' }} />
                    ) : (
                      <ArrowDownOutlined style={{ color: '#ff4d4f' }} />
                    )}
                    <span style={{ marginLeft: '4px', color: '#666' }}>
                      {stat.trendValue}
                    </span>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* Pending Groups Section */}
        <Col xs={24} lg={16}>
          <Card
            title='Quản lý Template Nhóm'
            extra={
              <Button
                type='primary'
                icon={<PlusOutlined />}
                onClick={handleAddSemester}
              >
                Thêm mới Kỳ hạq
              </Button>
            }
            style={{ borderRadius: '12px' }}
          >
            <List
              dataSource={pendingGroups}
              renderItem={(group: Group) => (
                <List.Item
                  style={{
                    cursor: 'pointer',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '8px',
                    background: '#fafafa',
                  }}
                  onClick={() => navigate('/moderator/groups')}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{ backgroundColor: '#1890ff' }}
                        icon={<TeamOutlined />}
                      />
                    }
                    title={
                      <Space>
                        <span style={{ fontWeight: 'bold' }}>{group.name}</span>
                        <Tag color='orange'>Vừa phải</Tag>
                      </Space>
                    }
                    description={
                      <Space direction='vertical' size={4}>
                        <div>
                          <span style={{ color: '#666' }}>Giảng viên: </span>
                          <span>{group.leader}</span>
                        </div>
                        <div>
                          <Space size={16}>
                            <span>👥 {group.members} thành viên</span>
                            <span>
                              📋 {group.registeredLecturers} GV đăng ký
                            </span>
                          </Space>
                        </div>
                        <div>
                          <Space size={4}>
                            <span style={{ color: '#666' }}>Ngành:</span>
                            {group.majors.map(major => (
                              <Tag key={major} color='blue'>
                                {major}
                              </Tag>
                            ))}
                          </Space>
                        </div>
                      </Space>
                    }
                  />
                  <div>
                    <Tag color='green'>Sửa</Tag>
                  </div>
                </List.Item>
              )}
            />

            <Button
              type='primary'
              block
              size='large'
              style={{ marginTop: '16px', borderRadius: '8px' }}
              onClick={() => navigate('/moderator/groups')}
            >
              Xem chi tiết
            </Button>
          </Card>
        </Col>

        {/* Right Sidebar */}
        <Col xs={24} lg={8}>
          <Space direction='vertical' size={16} style={{ width: '100%' }}>
            {/* Priority Notifications */}
            <Card title='Thông báo ưu tiên' style={{ borderRadius: '12px' }}>
              <Space direction='vertical' size={12} style={{ width: '100%' }}>
                <Card
                  size='small'
                  style={{ background: '#fff7e6', border: '1px solid #ffd591' }}
                >
                  <Space>
                    <span style={{ fontSize: '20px' }}>⚠️</span>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#fa8c16' }}>
                        Cần xử lý
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {mockDashboardStats.pendingAssignment} nhóm đang chờ
                        phân công GV
                      </div>
                    </div>
                  </Space>
                </Card>

                <Card
                  size='small'
                  style={{ background: '#f6ffed', border: '1px solid #b7eb8f' }}
                >
                  <Space>
                    <span style={{ fontSize: '20px' }}>✓</span>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#52c41a' }}>
                        Hoàn thành
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {mockDashboardStats.assigned} nhóm đã được phân công
                      </div>
                    </div>
                  </Space>
                </Card>

                <Card
                  size='small'
                  style={{ background: '#e6f7ff', border: '1px solid #91d5ff' }}
                >
                  <Space>
                    <span style={{ fontSize: '20px' }}>📊</span>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#1890ff' }}>
                        Thống kê
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {mockDashboardStats.activeLecturers} giảng viên đang
                        hướng dẫn
                      </div>
                    </div>
                  </Space>
                </Card>
              </Space>
            </Card>

            {/* Recent Activities */}
            <Card title='Hoạt động gần đây' style={{ borderRadius: '12px' }}>
              <List
                size='small'
                dataSource={mockActivities.slice(0, 5)}
                renderItem={(activity: Activity) => (
                  <List.Item style={{ padding: '8px 0' }}>
                    <div style={{ width: '100%' }}>
                      <div
                        style={{
                          borderLeft: `4px solid ${
                            activity.type === 'assignment'
                              ? '#1890ff'
                              : activity.type === 'update'
                                ? '#722ed1'
                                : activity.type === 'registration'
                                  ? '#52c41a'
                                  : '#fa8c16'
                          }`,
                          paddingLeft: '12px',
                        }}
                      >
                        <div style={{ fontSize: '13px', marginBottom: '4px' }}>
                          {activity.message}
                        </div>
                        <div style={{ fontSize: '11px', color: '#999' }}>
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
              <Button block style={{ marginTop: '12px', borderRadius: '8px' }}>
                Xem lịch sử đầy đủ
              </Button>
            </Card>
          </Space>
        </Col>
      </Row>

      {/* Add Semester Modal */}
      <Modal
        title='Thêm mới Kỳ hạq'
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText='Tạo'
        cancelText='Hủy'
        width={500}
      >
        <Form form={form} layout='vertical' style={{ marginTop: '24px' }}>
          <Form.Item
            name='semesterName'
            label='Tên Kỳ hạc'
            rules={[{ required: true, message: 'Vui lòng nhập tên kỳ học!' }]}
          >
            <Select placeholder='Fall 2025'>
              <Select.Option value='Fall 2025'>Fall 2025</Select.Option>
              <Select.Option value='Summer 2025'>Summer 2025</Select.Option>
              <Select.Option value='Spring 2025'>Spring 2025</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name='startDate'
            label='Ngày bắt đầu'
            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
          >
            <DatePicker style={{ width: '100%' }} placeholder='Summer 2025' />
          </Form.Item>

          <Form.Item name='endDate' label='Ngày kết thúc'>
            <DatePicker style={{ width: '100%' }} placeholder='Summer 2025' />
          </Form.Item>

          <Form.Item name='springCount' label='Spring 20hảu'>
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              max={10}
              placeholder='4'
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
