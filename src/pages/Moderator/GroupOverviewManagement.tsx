import React, { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Select,
  message,
  Input,
} from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { mockGroups, mockLecturers, type Group } from './mockData';

const { Search } = Input;

const GroupOverviewManagement: React.FC = () => {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedLecturer, setSelectedLecturer] = useState<string>('');
  const [searchText, setSearchText] = useState('');

  const handleAssign = (group: Group) => {
    setSelectedGroup(group);
    setSelectedLecturer('');
    setIsAssignModalOpen(true);
  };

  const handleAssignOk = () => {
    if (!selectedLecturer) {
      message.error('Vui lòng chọn giảng viên!');
      return;
    }
    message.success(
      `Đã phân công ${selectedLecturer} cho nhóm ${selectedGroup?.name}!`
    );
    setIsAssignModalOpen(false);
  };

  const handleAssignCancel = () => {
    setIsAssignModalOpen(false);
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: { color: 'orange', text: 'Chờ phân công' },
      active: { color: 'blue', text: 'Đang hoạt động' },
      finished: { color: 'green', text: 'Đã hoàn thành' },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const columns: ColumnsType<Group> = [
    {
      title: 'Tên nhóm',
      dataIndex: 'name',
      key: 'name',
      render: text => <span style={{ fontWeight: 'bold' }}>{text}</span>,
      filteredValue: [searchText],
      onFilter: (value, record) => {
        const search = value.toString().toLowerCase();
        return (
          record.name.toLowerCase().includes(search) ||
          record.leader.toLowerCase().includes(search)
        );
      },
    },
    {
      title: 'Trưởng nhóm',
      dataIndex: 'leader',
      key: 'leader',
    },
    {
      title: 'Thành viên',
      dataIndex: 'members',
      key: 'members',
      align: 'center',
    },
    {
      title: 'Ngành',
      dataIndex: 'majors',
      key: 'majors',
      render: (majors: string[]) => (
        <Space size={4}>
          {majors.map(major => (
            <Tag key={major} color='blue'>
              {major}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const { color, text } = getStatusConfig(status);
        return <Tag color={color}>{text}</Tag>;
      },
      filters: [
        { text: 'Chờ phân công', value: 'pending' },
        { text: 'Đang hoạt động', value: 'active' },
        { text: 'Đã hoàn thành', value: 'finished' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Giảng viên',
      dataIndex: 'lecturer',
      key: 'lecturer',
      render: lecturer =>
        lecturer ? (
          <Tag color='green'>{lecturer}</Tag>
        ) : (
          <Tag color='default'>Chưa phân công</Tag>
        ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='small'>
          <Button type='link' size='small'>
            Chi tiết
          </Button>
          {!record.lecturer && record.status === 'pending' && (
            <Button
              type='primary'
              size='small'
              icon={<UserAddOutlined />}
              onClick={() => handleAssign(record)}
            >
              Phân công
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const filteredData = searchText
    ? mockGroups.filter(
        group =>
          group.name.toLowerCase().includes(searchText.toLowerCase()) ||
          group.leader.toLowerCase().includes(searchText.toLowerCase())
      )
    : mockGroups;

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
          Tổng quan Nhóm
        </h1>
        <p style={{ color: '#666', marginTop: '8px' }}>
          Quản lý và phân công giảng viên cho các nhóm
        </p>
      </div>

      <Card style={{ borderRadius: '12px' }}>
        <div style={{ marginBottom: '16px' }}>
          <Search
            placeholder='Tìm kiếm theo tên nhóm hoặc trưởng nhóm...'
            allowClear
            enterButton={<SearchOutlined />}
            size='large'
            onSearch={setSearchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ maxWidth: '500px' }}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey='id'
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: total => `Tổng ${total} nhóm`,
          }}
        />
      </Card>

      {/* Assign Lecturer Modal */}
      <Modal
        title={`Phân công Giảng viên cho nhóm: ${selectedGroup?.name}`}
        open={isAssignModalOpen}
        onOk={handleAssignOk}
        onCancel={handleAssignCancel}
        okText='Phân công'
        cancelText='Hủy'
        width={500}
      >
        <div style={{ marginTop: '24px' }}>
          <p style={{ marginBottom: '16px', color: '#666' }}>
            Nhóm: <strong>{selectedGroup?.name}</strong>
          </p>
          <p style={{ marginBottom: '16px', color: '#666' }}>
            Trưởng nhóm: <strong>{selectedGroup?.leader}</strong>
          </p>
          <p style={{ marginBottom: '16px', color: '#666' }}>
            Số thành viên: <strong>{selectedGroup?.members}</strong>
          </p>

          <div style={{ marginTop: '24px' }}>
            <div
              style={{
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              Chọn Giảng viên
            </div>
            <Select
              style={{ width: '100%' }}
              placeholder='Chọn giảng viên'
              value={selectedLecturer}
              onChange={setSelectedLecturer}
            >
              {mockLecturers
                .filter(l => l.currentGroups < l.quota)
                .map(lecturer => (
                  <Select.Option key={lecturer.id} value={lecturer.name}>
                    {lecturer.name} ({lecturer.currentGroups}/{lecturer.quota})
                  </Select.Option>
                ))}
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GroupOverviewManagement;
