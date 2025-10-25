import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
} from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { mockLecturers, type Lecturer } from './mockData';

const LecturerManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Lecturer) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(() => {
        // Lecturer data validated
        if (editingId) {
          message.success('Đã cập nhật giảng viên thành công!');
        } else {
          message.success('Đã thêm giảng viên mới thành công!');
        }
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

  const columns: ColumnsType<Lecturer> = [
    {
      title: 'Tên Giảng viên',
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
      render: (_quota, record) => <span>{record.currentGroups} nhóm</span>,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='small'>
          <Button
            type='link'
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
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
            <h2 style={{ margin: 0, fontSize: '24px' }}>
              Qual lalý Giảng viên (CRUD)
            </h2>
          </div>
        }
        extra={
          <Button type='primary' icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm mới Giảng viên
          </Button>
        }
        style={{ borderRadius: '12px' }}
      >
        <Table
          columns={columns}
          dataSource={mockLecturers}
          rowKey='id'
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingId ? 'Sửa Giảng viên' : 'Thêm mới Giảng viên'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingId ? 'Cập nhật' : 'Thêm mới'}
        cancelText='Hủy'
        width={500}
      >
        <Form form={form} layout='vertical' style={{ marginTop: '24px' }}>
          <Form.Item
            name='email'
            label='Email'
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item name='quota' label='Quota (Hạn ngạh)'>
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={20}
              placeholder='Slider'
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LecturerManagement;
