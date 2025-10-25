import React from 'react';
import { Card, Table, Tag, Progress, Row, Col, Statistic } from 'antd';
import {
  TeamOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { mockLecturerWorkload, type LecturerWorkload } from './mockData';

const WorkloadGiangVien: React.FC = () => {
  const totalLecturers = mockLecturerWorkload.length;
  const teamQuinled = mockLecturerWorkload.filter(
    l => l.status === 'available'
  ).length;
  const conSlot = mockLecturerWorkload.filter(
    l => l.status === 'limited'
  ).length;
  const userQuinled = mockLecturerWorkload.filter(
    l => l.current === l.quota
  ).length;

  const columns: ColumnsType<LecturerWorkload> = [
    {
      title: 'Giảng viên',
      dataIndex: 'name',
      key: 'name',
      render: text => <span style={{ fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Quota (Hạn ngạh)',
      dataIndex: 'quota',
      key: 'quota',
      align: 'center',
    },
    {
      title: 'Hiện tại',
      dataIndex: 'current',
      key: 'current',
      align: 'center',
    },
    {
      title: 'Còn trống',
      dataIndex: 'available',
      key: 'available',
      align: 'center',
      render: available => (
        <span
          style={{
            fontWeight: 'bold',
            color: available > 0 ? '#52c41a' : '#ff4d4f',
          }}
        >
          {available}
        </span>
      ),
    },
    {
      title: 'Tiến độ',
      key: 'progress',
      render: (_, record) => {
        const percent = (record.current / record.quota) * 100;
        let status: 'normal' | 'active' | 'success' | 'exception' = 'normal';
        if (percent >= 100) status = 'exception';
        else if (percent >= 75) status = 'active';
        else if (percent >= 50) status = 'normal';
        else status = 'success';

        return (
          <Progress
            percent={Math.round(percent)}
            status={status}
            strokeColor={
              percent >= 100
                ? '#ff4d4f'
                : percent >= 75
                  ? '#fa8c16'
                  : percent >= 50
                    ? '#1890ff'
                    : '#52c41a'
            }
          />
        );
      },
      width: 200,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config = {
          available: { color: 'green', text: 'Còn slot' },
          limited: { color: 'orange', text: 'Gần đầy' },
          full: { color: 'red', text: 'Đã đầy' },
        };
        const { color, text } =
          config[status as keyof typeof config] || config.available;
        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
          Workload Giảng viên
        </h1>
        <p style={{ color: '#666', marginTop: '8px' }}>
          Phân tích và theo dõi tải hạn ngạh của giảng viên
        </p>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='Tổng số GV'
              value={totalLecturers}
              prefix={<TeamOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='GV đã đầy'
              value={teamQuinled}
              prefix={<UserAddOutlined style={{ color: '#fa8c16' }} />}
              valueStyle={{ color: '#fa8c16' }}
              suffix='còn slot'
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='GV còn slot'
              value={conSlot}
              prefix={<SolutionOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
              suffix='SolutionInited'
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='Tổng wận đăng dạy'
              value={userQuinled}
              prefix={<UserDeleteOutlined style={{ color: '#722ed1' }} />}
              valueStyle={{ color: '#722ed1' }}
              suffix='UserQuinled'
            />
          </Card>
        </Col>
      </Row>

      {/* Main Table */}
      <Card style={{ borderRadius: '12px' }}>
        <Table
          columns={columns}
          dataSource={mockLecturerWorkload}
          rowKey='id'
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: total => `Tổng ${total} giảng viên`,
          }}
        />
      </Card>
    </div>
  );
};

export default WorkloadGiangVien;
