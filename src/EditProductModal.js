
import React, { useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';


import './EditProductModal.css';

const EditProductModal = ({ product, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        category: product.category,
        name: product.name,
        description: product.description,
        price: product.price,
      });
    }
  }, [product, form]);

  const handleSubmit = (values) => {
    if (product) {
      const updatedProduct = {
        ...product,
        category: values.category,
        name: values.name,
        description: values.description,
        price: values.price,
      };
      onSubmit(updatedProduct);
    }
  };

  return (
    <div className="edit-product-modal-container">
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
          rules={[{ required: true, message: 'Please enter a name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please enter a price' }]}
        >
          <Input type="number" min={0} step={0.01} />
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

export default EditProductModal;