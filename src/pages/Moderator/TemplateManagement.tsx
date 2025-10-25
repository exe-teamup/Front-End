import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  InputNumber,
  Select,
  message,
} from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { mockGroupTemplates, type GroupTemplate } from './mockData';

const TemplateManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: GroupTemplate) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(() => {
        // Template data validated
        if (editingId) {
          message.success('Đã cập nhật template thành công!');
        } else {
          message.success('Đã thêm template mới thành công!');
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

  const columns: ColumnsType<GroupTemplate> = [
    {
      title: 'Kỳ học',
      dataIndex: 'semester',
      key: 'semester',
      render: text => <span style={{ fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: 'Min thành viên',
      dataIndex: 'minMembers',
      key: 'minMembers',
    },
    {
      title: 'Max thành viên',
      dataIndex: 'maxMembers',
      key: 'maxMembers',
    },
    {
      title: 'Min ngành',
      dataIndex: 'minMajors',
      key: 'minMajors',
    },
    {
      title: 'Max GV ưu tiên',
      dataIndex: 'maxLecturers',
      key: 'maxLecturers',
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
              Quản lý Template Nhóm
            </h2>
          </div>
        }
        extra={
          <Button type='primary' icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm mới Template
          </Button>
        }
        style={{ borderRadius: '12px' }}
      >
        <Table
          columns={columns}
          dataSource={mockGroupTemplates}
          rowKey='id'
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingId ? 'Sửa Template' : 'Thêm mới Template'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingId ? 'Cập nhật' : 'Thêm mới'}
        cancelText='Hủy'
        width={500}
      >
        <Form form={form} layout='vertical' style={{ marginTop: '24px' }}>
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
            name='minMembers'
            label='Số thành viên tối thiểu'
            rules={[
              { required: true, message: 'Vui lòng nhập số thành viên!' },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              max={10}
              placeholder='4'
            />
          </Form.Item>

          <Form.Item
            name='maxMembers'
            label='Số thành viên tối đa'
            rules={[
              { required: true, message: 'Vui lòng nhập số thành viên!' },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              max={10}
              placeholder='6'
            />
          </Form.Item>

          <Form.Item
            name='minMajors'
            label='Số ngành tối thiểu'
            rules={[{ required: true, message: 'Vui lòng nhập số ngành!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              max={5}
              placeholder='2'
            />
          </Form.Item>

          <Form.Item
            name='maxLecturers'
            label='Số GV ưu tiên tối đa'
            rules={[{ required: true, message: 'Vui lòng nhập số GV!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              max={10}
              placeholder='3'
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TemplateManagement;
