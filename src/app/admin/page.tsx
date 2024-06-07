'use client';
import React, { useState, useEffect } from 'react';
import AdminPanel from './components/AdminPanel';
import Header from "@/components/Header";
import EditProduct from './components/EditProduct';
import NoMobile from './components/NoMobile'; 
import EditUser from './components/EditUser';

function AdminPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isMobile && <NoMobile />} 
      {!isMobile && (
        <div>
          <Header />
          <AdminPanel />
          <EditProduct />
          <EditUser />
        </div>
      )}
    </div>
  );
}

export default AdminPage;