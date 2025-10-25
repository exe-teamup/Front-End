import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
} from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { mockSemesters, type Semester } from './mockData';

const SemesterManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Semester) => {
    setEditingId(record.id);
    form.setFieldsValue({
      name: record.name,
      // startDate and endDate would need moment/dayjs conversion
    });
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(() => {
        // Semester data validated
        if (editingId) {
          message.success('Đã cập nhật kỳ học thành công!');
        } else {
          message.success('Đã thêm kỳ học mới thành công!');
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

  const columns: ColumnsType<Semester> = [
    {
      title: 'Tên Kỳ hạc',
      dataIndex: 'name',
      key: 'name',
      render: text => <span style={{ fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config = {
          upcoming: { color: 'gold', text: 'Tag' },
          active: { color: 'green', text: 'Active' },
          finished: { color: 'default', text: 'Finished' },
        };
        const { color, text } =
          config[status as keyof typeof config] || config.finished;
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Hành bộn',
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
            <h2 style={{ margin: 0, fontSize: '24px' }}>Quanlải Kỳ hạq</h2>
          </div>
        }
        extra={
          <Button type='primary' icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm mới Kỳ hạc
          </Button>
        }
        style={{ borderRadius: '12px' }}
      >
        <Table
          columns={columns}
          dataSource={mockSemesters}
          rowKey='id'
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingId ? 'Sửa Kỳ hạc' : 'Thêm mới Kỳ hạc'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingId ? 'Cập nhật' : 'Tạo'}
        cancelText='Hủy'
        width={500}
      >
        <Form form={form} layout='vertical' style={{ marginTop: '24px' }}>
          <Form.Item
            name='name'
            label='Tên Kỳ học'
            rules={[{ required: true, message: 'Vui lòng nhập tên kỳ học!' }]}
          >
            <Input placeholder='Tinprl Inpot' />
          </Form.Item>

          <Form.Item
            name='startDate'
            label='Ngày bắt dầu'
            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name='endDate'
            label='Ngài bắt hảu'
            rules={[
              { required: true, message: 'Vui lòng chọn ngày kết thúc!' },
            ]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SemesterManagement;
