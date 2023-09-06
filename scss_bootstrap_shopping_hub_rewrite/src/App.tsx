import React from 'react';

//react router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//pages
import { Home,CategoryProduct,ProductSingle,Cart,Search } from './pages/index';
//components
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import Productlist_Provider from './context/Productlist_Provider';
import CartContext_Provider from './context/CartContext_Provider';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Productlist_Provider>
          <CartContext_Provider>
            {/* Top */}
            <Header />
            
            {/* main 
            //home 
            ///product/:id  => http://localhost:3000/product/6 => <ProductSingle />
            //category/:category => http://localhost:3000/category/laptops => <CategoryProduct />
            //cart => <Cart />
            ///search/:searchTerm =>
            */}
            <Routes>
              {/* home page route */}
              <Route path = "/" element = {<Home />} />
              {/* single product route */}
              <Route path = "/product/:id" element = {<ProductSingle />} />
              {/* category wise product listing route */}
              <Route path = "/category/:category" element = {<CategoryProduct />} />
              {/* cart */}
              <Route path = "/cart" element = {<Cart />} />
              {/* searched products */}
              <Route path = "/search/:searchTerm" element = {<Search />} />
            </Routes>

            {/* bottom */}
            <Footer />
          </CartContext_Provider>
        </Productlist_Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
