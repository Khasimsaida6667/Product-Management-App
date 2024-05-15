import React, { useState } from 'react';
import { Table, Input, Select, Button, Modal } from 'antd';
import { products } from './products';

import AddProductForm from './AddProductForm';
import EditProductModal from './EditProductModal';

import './ProductList.css';

const { Search } = Input;
const { Option } = Select;

const ProductList = () => {
  const [productList, setProductList] = useState(products);
  const [searchName, setSearchName] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);


  const getUniqueCategories = (products) => {
    const categories = {};
    products.forEach((product) => {
      if (categories[product.category]) {
        categories[product.category]++;
      } else {
        categories[product.category] = 1;
      }
    });

    return Object.keys(categories).map((category) => ({
      name: category,
      count: categories[category],
    }));
  };

  const categories = getUniqueCategories(productList);

  const filteredProducts = productList.filter(
    (product) =>
      product.name.toLowerCase().includes(searchName.toLowerCase()) &&
      product.description.toLowerCase().includes(searchDescription.toLowerCase()) &&
      (filterCategory === '' || product.category === filterCategory)
  );

  const handleAddProduct = (newProduct) => {
    const updatedProductList = [...productList, { ...newProduct, id: productList.length + 1 }];
  setProductList(updatedProductList);
    setIsAddModalVisible(false);
  };

  const handleEditProduct = (updatedProduct) => {
    const updatedProductList = productList.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProductList(updatedProductList);
    setIsEditModalVisible(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    setProductList(productList.filter((product) => product.id !== productId));
  };

  const renderProductTable = () => {
    const columns = [
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (category) => (
          <span style={{ color: getCategoryColor(category) }}>{category}</span>
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => a.description.localeCompare(b.description),
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price - b.price,
        render: (price) => <span>${parseFloat(price).toFixed(2)}</span>,
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <div>
            <Button
              type="primary"
              onClick={() => {
                setEditingProduct(record);
                setIsEditModalVisible(true);
              }}
            >
              Edit
            </Button>
            <Button
              type="danger"
              onClick={() => handleDeleteProduct(record.id)}
              
            >
              Delete
            </Button>
          </div>
        ),
      },
    ];

    return (
      <Table
        dataSource={filteredProducts}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    );
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Electronics':
        return '#1890ff';
      case 'Clothing':
        return '#52c41a';
      case 'Books':
        return '#faad14';
      default:
        return '#000';
    }
  };

  

  return (
    <div className="product-list-container">
      <div className="header">
        <div>
          <span className="total-products">Total Products: {productList.length}</span>
          <span className="unique-categories">Unique Categories: {categories.length}</span>
        </div>
        <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
          Add Product
        </Button>
      </div>

      <div className="filters">
        <Search
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ width: 200, marginRight: 16 }}
        />
        <Search
          placeholder="Search by description"
          value={searchDescription}
          onChange={(e) => setSearchDescription(e.target.value)}
          style={{ width: 200, marginRight: 16 }}
        />
        <Select
          value={filterCategory}
          onChange={(value) => setFilterCategory(value)}
          style={{ width: 200 }}
        >
          <Option value="">All Categories</Option>
          {categories.map((category) => (
            <Option key={category.name} value={category.name}>
              {category.name} ({category.count})
            </Option>
          ))}
        </Select>
      </div>

      {renderProductTable()}

      <Modal
        visible={isAddModalVisible}
        title="Add Product"
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <AddProductForm
          onSubmit={handleAddProduct}
          onCancel={() => setIsAddModalVisible(false)}
        />
      </Modal>

      <Modal
        visible={isEditModalVisible}
        title="Edit Product"
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <EditProductModal
          product={editingProduct}
          onSubmit={handleEditProduct}
          onCancel={() => setIsEditModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default ProductList;