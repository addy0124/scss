import React, {useContext, useState} from 'react';

import "./Navbar.scss";
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import CartModal from '../cartmodal/CartModal';
import { ProductlistContext } from '../../context/Productlist_Provider';
import { CartContext } from '../../context/CartContext_Provider';


const Navbar = () => {

  const { categories } = useContext(ProductlistContext);
  const { cartItems } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const toggleSidebar = (isShow:boolean) =>{
    setShowSidebar(isShow)
  }

  const handleSearchTerm = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  return (
    <div className='row navbar'>
      
      {/* left */}
      <div className="col-md-3 col-lg-2">
        <div className='brand-and-toggler flex align-center'>
          <button type = "button" className='text-white sidebar-show-btn' onClick={() => toggleSidebar(true)}>
            <i className='fas fa-bars'></i>
          </button>
          <Link to = "/" className='navbar-brand flex align-center'>
              <span className='navbar-brand-ico'>
                <i className='fa-solid fa-bag-shopping'></i>
              </span>
              <span className='navbar-brand-txt mx-2'>
                <span className='fw-7'>Snap</span>Up.
              </span>
          </Link>
        </div>
      </div>

      {/* middle */}
      <div className="col-md-8 col-lg-9">
        <div className='navbar-collapse w-100'>

          {/* search */}
          <div className='navbar-search bg-white mx-md-0' >
            <div className='flex align-center'>
              <input type = "text" className='form-control-input fs-14' placeholder='Search your preferred items here' onChange={(e) => handleSearchTerm(e)}/>
              <Link to = {`search/${searchTerm}`} className='text-white search-btn flex align-center justify-center'>
                <i className='fa-solid fa-magnifying-glass'></i>
              </Link>
            </div>
          </div>

          {/* category */}
          
          <ul className='navbar-nav flex-row align-center fs-12 fw-4 font-manrope d-md-none'>
            {
              // taking only first 8 categories
              categories.slice(0, 8).map((category, idx) => (
                <li className='nav-item no-wrap' key = {idx}>
                  <Link to = {`category/${category}`} className='nav-link text-capitalize text-white'>{category.replace("-", " ")}</Link>
                </li>
              ))
            }
          </ul>

          
          
        </div>
      </div>


      {/* right */}
      <div className="col-md-1 col-lg-1">
        <div className='navbar-cart flex align-center justify-content-end'>
          <Link to = "/cart" className='cart-btn'>
              <i className='fa-solid fa-cart-shopping'></i>
              <div className='cart-items-value'>{cartQuantity}</div>
          </Link>
        </div>
      </div>

      {/* siderbar ---- it will show when the showSidebar === true*/}
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} categories={categories}/>

    
    </div>
  )
}

export default Navbar