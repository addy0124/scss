import React, { useState,useEffect,useContext } from 'react'
import { Product, fetchAsyncProductSingle } from '../../store/ProductSlice';
import {useParams} from "react-router-dom";
import './ProductSinglePage.scss';
import { formatPrice } from '../../utils/helpers';
import CartMessage from '../../components/cartmessage/CartMessage';
import { CartContext } from '../../context/CartContext_Provider';


const ProductSinglePage = () => {

    const { addToCart } = useContext(CartContext);

    const {id} = useParams();
    const [product, setProduct] = useState<Product>();
    const [discountedPrice, setDiscountedPrice] = useState<number>();
    const [selectindex, setSelectindex] = useState<number>();
    const [quantity, setQuantity] = useState<number>(1);
    const [cartMessageStatus, setCartMessageStatus] = useState(false);

    useEffect(() => {
      id&&fetchCategoriesData(id);
    }, [id])

    useEffect(()=>{
      if(cartMessageStatus){
        setTimeout(()=>{
          setCartMessageStatus(false);
        },2000)
      }
    },[cartMessageStatus])

    const addToCartHandler = (product:Product) =>{
      let discountedPrice = (product?.price) - (product?.price * (product?.discountPercentage / 100));
      addToCart(product.id,quantity, discountedPrice);
      setCartMessageStatus(true);
      
    }
    

    const fetchCategoriesData = async(id:string)=>{
        const product: Product = await fetchAsyncProductSingle(id);
        if(product){
            setProduct(product);
            let discountedPrice = (product?.price) - (product?.price * (product?.discountPercentage / 100));
            setDiscountedPrice(discountedPrice);
        }
    }

    const hoverbox = (e:React.MouseEvent<HTMLDivElement>,index:number) =>{
      setSelectindex(index);
    }

    const decreaseQty = () =>{
      setQuantity((prevQty)=>{
        let tempQty = prevQty -1;
        if(tempQty < 1){
          tempQty = 1;
        }
        return tempQty;
      })
    }

    const increaseQty = () => {
      setQuantity((prevQty) => {
        let tempQty = prevQty + 1;
        if (product && tempQty > product?.stock){
          tempQty = product?.stock;
        } 
        return tempQty;
      })
    }

  return (
    <main className='py-5 bg-whitesmoke'>
      <div className='product-single'>
        <div className='container'>
          <div className='product-single-content bg-white row'>

            {/* left */}
            <div className="col-md-12 col-lg-6 product-single-l">
              {/* img-1 */}
              <div className='row'>
                <div className="col-md-12 col-lg-12 product-img-zoom">
                  <img src = {product?(product.images ? product.images[0] : "") : ""} alt = "" className='img-cover' />
                </div>

                {/* img-2 */}
                <div className="col-md-12 col-lg-12 product-img-thumbs flex align-center my-2">
                  {product?(product.images.slice(1,product.images.length).map(
                    (image,index)=>(
                      <div key={index} className={`thumb-item ${index === selectindex ? 'hover':''}`} 
                      onMouseOver={(e)=>hoverbox(e,index)}
                      onMouseLeave={(e)=>hoverbox(e,-1)}
                      >
                        <img src={image} className='img-cover '/>
                      </div>
                    ))):<div></div>}
                </div>
              </div>

            </div>

            {/* right */}
            <div className="col-md-12 col-lg-6 product-single-r">
              <div className='product-details font-manrope'>
                <div className='title fs-20 fw-5'>{product?.title}</div>
                <div>
                  <p className='para fw-3 fs-15'>{product?.description}</p>
                </div>

                <div className='info flex align-center flex-wrap fs-14'>
                  <div className='rating'>
                    <span className='text-orange fw-5'>Rating:</span>
                    <span className='mx-1'>
                      {product?.rating}
                    </span>
                  </div>
                  <div className='vert-line'></div>
                  <div className='brand'>
                    <span className='text-orange fw-5'>Brand:</span>
                    <span className='mx-1'>{product?.brand}</span>
                  </div>
                  <div className='vert-line'></div>
                  <div className='brand'>
                    <span className='text-orange fw-5'>Category:</span>
                    <span className='mx-1 text-capitalize'>
                      {product?.category ? product.category.replace("-", " ") : ""}
                    </span>
                  </div>
                </div>

                <div className = "price">
                  <div className='flex align-center'>
                    <div className='old-price text-gray'>
                      {product && formatPrice(product?.price)}
                    </div>
                    <span className='fs-14 mx-2 text-dark'>
                      Inclusive of all taxes
                    </span>
                  </div>

                  <div className='flex align-center my-1'>
                    <div className='new-price fw-5 font-poppins fs-24 text-orange'>
                      {discountedPrice && formatPrice(discountedPrice)}
                    </div>
                    <div className='discount bg-orange fs-13 text-white fw-6 font-poppins'>
                      {product?.discountPercentage}% OFF
                    </div>
                  </div>                  
                </div>

                <div className='qty flex align-center my-4'>
                  <div className='qty-text'>Quantity:</div>
                  <div className='qty-change flex align-center mx-3'>
                    <button type = "button" className='qty-decrease flex align-center justify-center' onClick={() => decreaseQty()}>
                      <i className='fas fa-minus'></i>
                    </button>
                    <div className = "qty-value flex align-center justify-center">{quantity}</div>
                    <button type = "button" className='qty-increase flex align-center justify-center' onClick={() => increaseQty()}>
                      <i className='fas fa-plus'></i>
                    </button>
                  </div>
                  {
                    (product?.stock === 0) ? <div className ='qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw-5'>out of stock</div> : ""
                  }
                </div>

                
                <div className='btns'>
                  <button type = "button" className='add-to-cart-btn btn'>
                    <i className='fas fa-shopping-cart'></i>
                    {product &&　<span className='btn-text mx-2' onClick={() => { addToCartHandler(product)}}>add to cart</span>}
                  </button>
                  <button type = "button" className='buy-now btn mx-3'>
                    <span className='btn-text'>buy now</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {cartMessageStatus && <CartMessage />}

      
    </main>
  )
}

export default ProductSinglePage