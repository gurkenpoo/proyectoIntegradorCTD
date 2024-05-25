'use client';

import { Product } from '../admin/types';

export type DetalleProductoProps = {
  producto: Product;
};

export function DetalleProducto({ producto }: DetalleProductoProps) {
  return <p>{producto.category}</p>;
}
