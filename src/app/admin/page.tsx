'use client';
import React, { useState, useEffect } from 'react';
import AdminPanel from './components/AdminPanel';
import Header from "@/components/Header";
import EditProduct from './components/EditProduct';
import NoMobile from './components/NoMobile'; // Import the NoMobile component

function AdminPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check on load

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
        </div>
      )}
    </div>
  );
}

export default AdminPage;