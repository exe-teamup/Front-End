import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Select,
  message,
  Divider,
} from 'antd';
import { PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import {
  mockStudentsWithGroup,
  mockStudentsWithoutGroup,
  mockAvailableGroups,
  type Student,
} from './mockData';

const StudentManagement: React.FC = () => {
  const [isGodModeOpen, setIsGodModeOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>('');

  const handleGodMode = (student: Student) => {
    setSelectedStudent(student);
    setSelectedGroup('');
    setIsGodModeOpen(true);
  };

  const handleGodModeOk = () => {
    if (!selectedGroup) {
      message.error('Vui lòng chọn nhóm!');
      return;
    }
    message.success(
      `Đã ép sinh viên: ${selectedStudent?.name} vào nhóm ${selectedGroup}!`
    );
    setIsGodModeOpen(false);
  };

  const handleGodModeCancel = () => {
    setIsGodModeOpen(false);
  };

  const columnsWithGroup: ColumnsType<Student> = [
    {
      title: 'Tên Sinh viên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'MSSV',
      dataIndex: 'mssv',
      key: 'mssv',
    },
    {
      title: 'Lớp',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Nhóm',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: () => (
        <Space size='small'>
          <Button type='link'>Xem chiết</Button>
        </Space>
      ),
    },
  ];

  const columnsWithoutGroup: ColumnsType<Student> = [
    {
      title: 'Tên Sinh viên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'MSSV',
      dataIndex: 'mssv',
      key: 'mssv',
    },
    {
      title: 'Lớp',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Nhóm',
      key: 'group',
      render: () => <span style={{ color: '#999' }}>Chưa có nhóm</span>,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='small'>
          <Button type='link'>Xem chiết</Button>
          <Button
            type='primary'
            danger
            size='small'
            icon={<ThunderboltOutlined />}
            onClick={() => handleGodMode(record)}
          >
            Ép vào nhóm
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#fff', minHeight: '100vh' }}>
      <Card
        title={
          <div>
            <h2 style={{ margin: 0, fontSize: '24px' }}>Quản lý Sinh vuên</h2>
          </div>
        }
        extra={
          <Button type='primary' icon={<PlusOutlined />}>
            Import Sinh viên (Excel)
          </Button>
        }
        style={{ borderRadius: '12px', marginBottom: '24px' }}
      >
        <h3 style={{ marginBottom: '16px' }}>
          Danh sách Sinh viên (Đã có nhóm)
        </h3>
        <Table
          columns={columnsWithGroup}
          dataSource={mockStudentsWithGroup}
          rowKey='id'
          pagination={false}
          size='small'
        />

        <Divider />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <h3 style={{ margin: 0 }}>
            Sinh suẫn chưa có nhóm &quot;Thằng lẻ&quot;)
          </h3>
          <div
            style={{
              background: '#fff1f0',
              border: '1px solid #ffccc7',
              borderRadius: '8px',
              padding: '8px 16px',
            }}
          >
            <span style={{ fontWeight: 'bold', color: '#cf1322' }}>
              Hànẵn (God Mode)
            </span>
          </div>
        </div>

        <Table
          columns={columnsWithoutGroup}
          dataSource={mockStudentsWithoutGroup}
          rowKey='id'
          pagination={false}
          size='small'
        />
      </Card>

      {/* God Mode Modal */}
      <Modal
        title='Ép sinh vuiẽn: Phạm Thị Đ'
        open={isGodModeOpen}
        onOk={handleGodModeOk}
        onCancel={handleGodModeCancel}
        okText='Xác xhấn Ép'
        cancelText='Hủy'
        okButtonProps={{ danger: true }}
        width={500}
      >
        <div style={{ marginTop: '24px' }}>
          <p style={{ marginBottom: '16px', color: '#666' }}>
            Đã vaịnh viên địa e:meo8 tỉng chưa lơ cứmh tiết tô guiêm tram tiếu.
          </p>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
              Chọn nhóm (vividu: nhóm dằng 4/6)
            </div>
            <Select
              style={{ width: '100%' }}
              placeholder='AI Healthcare (4/6)'
              value={selectedGroup}
              onChange={setSelectedGroup}
            >
              {mockAvailableGroups.map(group => (
                <Select.Option key={group.id} value={group.name}>
                  {group.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentManagement;
