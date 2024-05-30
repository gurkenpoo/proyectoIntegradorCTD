'use client';
import React from 'react';
import AdminPanel from './components/AdminPanel';
import Header from "@/components/Header";

function AdminPage() {
  const handleAddProduct = (newProduct: any) => {
    console.log('Nuevo producto:', newProduct);
  };

  return (
    <div>
        <Header />
      <AdminPanel/>
    </div>
  );
}

export default AdminPage;
