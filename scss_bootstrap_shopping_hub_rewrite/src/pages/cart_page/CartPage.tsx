import React, { useContext } from 'react'

import './CartPage.scss';
import { CartContext } from '../../context/CartContext_Provider';
import { formatPrice } from '../../utils/helpers';
import { shopping_cart } from '../../utils/images';
import { Link } from 'react-router-dom';

const CartPage = () => {

  const { increaseCartQuantity,decreaseCartQuantity,cartItems,removeFromCart,carttotalPrice,clearallitem } = useContext(CartContext);

  const columnname = ['S.N.', 'Product', 'Unit Price', 'Quantity', 'Total Price', 'Actions'];

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  if(cartItems.length === 0){
    return (
      <div className='container my-5'>
        <div className='empty-cart flex justify-center align-center flex-column font-manrope'>
          <img src = {shopping_cart} alt = "" />
          <span className='fw-6 fs-15 text-gray'>Your shopping cart is empty.</span>
          <Link to = "/" className='shopping-btn bg-orange text-white fw-5'>Go shopping Now</Link>
        </div>
      </div>
    )
  }
  

  return (
    <div className='cart bg-whitesmoke'>
      <div className='container'>
        <div className='cart-ctable'>

          {/* table column */}
          <div className='cart-chead bg-white'>
            <div className='cart-ctr fw-6 font-manrope fs-15 row'>
                {columnname.map((name, index)=>(
                  <div key={index} className={`cart-cth w-100 ${name === 'Product' ? 'col-3' : name === 'S.N.'? 'col-1' :'col-2'}`}>
                    <span className='cart-ctxt'>{name}</span>
                  </div>
                ))}
            </div>
          </div> 
          
          {/* table body */}
          <div className='cart-cbody bg-white'>
            {cartItems.map((item, index)=>(
              <div className='cart-ctr row py-4' key = {item?.product.id}>
                <div className='cart-ctd col-1 w-100'>
                    <span className='cart-ctxt'>{index + 1}</span>
                </div>
                <div className='cart-ctd col-3 w-100'>
                    <span className='cart-ctxt'>{item?.product.title}</span>
                </div>
                <div className='cart-ctd col-2 w-100'>
                    <span className='cart-ctxt'>{formatPrice(item?.discountedPrice)}</span>
                </div>

                <div className='cart-ctd col-2 w-100'>
                    <div className='qty-change flex align-center'>
                      <button type = "button" className='qty-decrease flex align-center justify-center' onClick={() => decreaseCartQuantity(item.product.id)}>
                        <i className='fas fa-minus'></i>
                      </button>

                      <div className='qty-value flex align-center justify-center'>
                        {item?.quantity}
                      </div>

                      <button type = "button" className='qty-increase flex align-center justify-center' onClick={() => increaseCartQuantity(item.product.id)}>
                        <i className='fas fa-plus'></i>
                      </button>
                    </div>
                </div>

                <div className='cart-ctd col-2 w-100'>
                  <span className='cart-ctxt text-orange fw-5'>{formatPrice(item.quantity * item.discountedPrice)}</span>
                </div>

                <div className='cart-ctd col-2 w-100'>
                  <button type = "button" className='delete-btn text-dark' onClick={() => removeFromCart(item.product.id)}>Delete</button>
                </div>

              </div>

              ))}
          </div>

          <div className='cart-cfoot flex align-start justify-between py-3 bg-white'>
            <div className='cart-cfoot-l'>
              <button type='button' className='clear-cart-btn text-danger fs-15 text-uppercase fw-4' onClick={() => clearallitem()}>
                <i className='fas fa-trash'></i>
                <span className='mx-1'>Clear Cart</span>
              </button>
            </div>

            <div className='cart-cfoot-r flex flex-column justify-end'>
              <div className='total-txt flex align-center justify-end'>
                <div className='font-manrope fw-5'>Total ({cartQuantity}) items: </div>
                <span className='text-orange fs-22 mx-2 fw-6'>{formatPrice(carttotalPrice)}</span>
              </div>

              <button type = "button" className='checkout-btn text-white bg-orange fs-16'>Check Out</button>
            </div>
          </div>



        </div>
      </div>
    </div>
  )
}

export default CartPage