import React from 'react'
import { Product } from '../../store/ProductSlice'
import { formatPrice } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import './ProductCard.scss';

type ProductProps = {
    product: Product,
    discountedPrice?:number
}

const ProductCard= ({product, discountedPrice}: ProductProps) => {

  return (

    
    <Link to = {`/product/${product?.id}`} key = {product?.id}>
      <div className='product-item bg-white'>
        <div className='category'>{product?.category}</div>
        <div className='product-item-img'>
          <img className='img-cover' src = {product?.images[0]} alt = {product.title} />
        </div>
        <div className='product-item-info fs-14'>
          <div className='brand'>
            <span>Brand:</span>
            <span className='fw-7'>{product?.brand}</span>
          </div>
          <div className='title py-2'>
            <span>{product?.title}</span>
          </div>
          <div className='price flex align-center justify-center'>
            <span className='old-price'>
              {formatPrice(product?.price)}
            </span>
            <span className='new-price'>
              {discountedPrice && formatPrice(discountedPrice)}
            </span>
            <span className='discount fw-6'>
              (% Off)
            </span>
          </div>
        </div>
      </div>
    </Link>
     

  )
}

export default ProductCard