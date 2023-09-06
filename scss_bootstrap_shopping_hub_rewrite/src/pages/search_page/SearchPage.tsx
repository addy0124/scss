import React, {useState, useEffect} from 'react'

import { useParams } from 'react-router-dom';
import { Allproducts, Product, fetchAsyncSearchProduct } from '../../store/ProductSlice';
import Loader from '../../components/loader/Loader';
import ProductList from '../../components/productlist/ProductList';




const SearchPage = () => {
  const {searchTerm } = useParams();
  const [searchProducts, setSearchProducts] = useState<Allproducts>();

  useEffect(()=>{
    searchTerm && fetchDatabySearchTerm(searchTerm);    
  }
  ,[searchTerm])

  const fetchDatabySearchTerm = async(searchTerm:string)=>{
    const categorylist: Allproducts = await fetchAsyncSearchProduct(searchTerm);
    if(categorylist){
      setSearchProducts(categorylist);
    }
  }

  return (
    <main>
      <div className='border border-2 border-danger bg-whitesmoke'>
        <div className='container'>
          <div className='py-5'>
            <div className='title-md'>
              <h3>Search results: </h3>
            </div>
            <br />
            {
              searchProducts ?  <ProductList products = {searchProducts.products} /> : <Loader /> 
            }
            {searchProducts?.products.length === 0 && 
            <div className='container min-vh-70'>
              <div className='fw-5 text-danger py-5'>
              <h3>No Products found.</h3>
              </div>
            </div>}

            

          </div>
        </div>
      </div>
    </main>
  )
}

export default SearchPage