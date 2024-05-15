
import React from 'react';
import { Form, Input, Button, Select } from 'antd';


import './AddProductForm.css';

const AddProductForm = ({ onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const newProduct = {
      category: values.category,
      name: values.name,
      description: values.description,
      price: values.price,
    };
    onSubmit(newProduct);
    form.resetFields();
  };

  return (
    <div className="add-product-form-container">
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select>
            <Select.Option value="Electronics">Electronics</Select.Option>
            <Select.Option value="Clothing">Clothing</Select.Option>
            <Select.Option value="Books">Books</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: 'Please enter a name' },
            { min: 3, message: 'Name must be at least 3 characters' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: 'Please enter a description' },
            { min: 10, message: 'Description must be at least 10 characters' },
          ]}
        >
          <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: 'Please enter a price' },
              
            ]}
          >
            <Input type="number" min={0.01} step={0.01} />
          </Form.Item>


          <div className="button-container">
            <Button onClick={onCancel} className="cancel-button">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="save-button">
              Save
            </Button>
          </div>
      </Form>
    </div>
  );
};

export default AddProductForm;