'use client';
import React from 'react';
import AdminPanel from './components/AdminPanel';
import Header from "@/components/Header";
import EditProduct from './components/EditProduct';

function AdminPage() {

  return (
    <div>
        <Header />
      <AdminPanel/>
      <EditProduct/>
    </div>
  );
}

export default AdminPage;
