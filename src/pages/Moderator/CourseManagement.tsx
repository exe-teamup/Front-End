import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  message,
} from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { mockCourses, type Course } from './mockData';

const CourseManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Course) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(() => {
        // Course data validated
        if (editingId) {
          message.success('Đã cập nhật lớp học thành công!');
        } else {
          message.success('Đã thêm lớp học mới thành công!');
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

  const columns: ColumnsType<Course> = [
    {
      title: 'Tên Lớp học',
      dataIndex: 'name',
      key: 'name',
      render: text => <span style={{ fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: 'Kỳ học',
      dataIndex: 'semester',
      key: 'semester',
    },
    {
      title: 'Giảng viên Phụ trách',
      dataIndex: 'lecturer',
      key: 'lecturer',
    },
    {
      title: 'Sĩ số',
      dataIndex: 'studentCount',
      key: 'studentCount',
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
              Quản lý Lớp học (CRUD)
            </h2>
          </div>
        }
        extra={
          <Button type='primary' icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm mới Lớp học
          </Button>
        }
        style={{ borderRadius: '12px' }}
      >
        <Table
          columns={columns}
          dataSource={mockCourses}
          rowKey='id'
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingId ? 'Sửa Lớp học' : 'Thêm mới Lớp học'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingId ? 'Cập nhật' : 'Thêm mới'}
        cancelText='Hủy'
        width={500}
      >
        <Form form={form} layout='vertical' style={{ marginTop: '24px' }}>
          <Form.Item
            name='name'
            label='Tên Lớp học'
            rules={[{ required: true, message: 'Vui lòng nhập tên lớp học!' }]}
          >
            <Input placeholder='EXE101_Fall2025_C1' />
          </Form.Item>

          <Form.Item
            name='semester'
            label='Kỳ học'
            rules={[{ required: true, message: 'Vui lòng chọn kỳ học!' }]}
          >
            <Select placeholder='Fall 2025'>
              <Select.Option value='Fall 2025'>Fall 2025</Select.Option>
              <Select.Option value='Summer 2025'>Summer 2025</Select.Option>
              <Select.Option value='Spring 2025'>Spring 2025</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name='lecturer'
            label='Giảng viên'
            rules={[
              { required: true, message: 'Vui lòng nhập tên giảng viên!' },
            ]}
          >
            <Input placeholder='GV Nguyễn Văn A' />
          </Form.Item>

          <Form.Item name='studentCount' label='Sĩ số'>
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              max={100}
              placeholder='30'
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CourseManagement;
