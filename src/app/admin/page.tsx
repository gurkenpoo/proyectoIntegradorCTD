'use client';
import React from 'react';
import AdminPanel from './components/AdminPanel';

function AdminPage() {
  const handleAddProduct = (newProduct: any) => {
    console.log('Nuevo producto:', newProduct);
  };

  return (
    <div>
      <AdminPanel onAddProduct={handleAddProduct} />
    </div>
  );
}

export default AdminPage;
