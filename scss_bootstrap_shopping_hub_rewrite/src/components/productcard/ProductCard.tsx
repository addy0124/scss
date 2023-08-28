import React from 'react'
import { Product } from '../../store/ProductSlice'

type discountedPricetype = {
  discountedPrice: number
}

type newProduct = Product & discountedPricetype;

type ProductProps = {
    product: newProduct
}

const ProductCard = ({product}: ProductProps) => {
  return (
    <div className='product-item bg-white'>
      <h2>{product.id}</h2>

    </div>
  )
}

export default ProductCard