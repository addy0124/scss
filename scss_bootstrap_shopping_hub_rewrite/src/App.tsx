import React from 'react';

//react router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//pages
import { Home,CategoryProduct,ProductSingle,Cart,Search } from './pages/index';
//components
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
        </Routes>

        

        {/* bottom */}
        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
