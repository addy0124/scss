import React, { useEffect } from 'react'

import "./ProductList.scss";
import { Product } from '../../store/ProductSlice'
import ProductCard  from '../productcard/ProductCard';

type ProductListProps = {
    products:Product[];
}

const ProductList = ({ products }: ProductListProps) => {

  return (
   
    <div className='product-lists grid bg-whitesmoke my-3'>
      {
        products.map(product => {
          let discountedPrice = (product.price) - (product.price * (product.discountPercentage / 100));
          return (
            <ProductCard key={product.id} product = {product}  discountedPrice={discountedPrice}/>
          )
        })
      }
    </div>
  )
}

export default ProductList