'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Product } from '../admin/types';
import { DetalleProducto } from './DetalleProducto';

const url = '/api/products';
export default function Productos() {
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState<Product[]>();
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setProductos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>cargando..</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {productos?.map((p) => (
        <DetalleProducto key={p.name} producto={p} />
      ))}
    </ul>
  );
}
