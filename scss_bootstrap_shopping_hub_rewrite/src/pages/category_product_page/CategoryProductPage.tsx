import React, { useEffect, useMemo, useState } from 'react'

import { useParams } from 'react-router-dom';
import { Allproducts, Product, fetchAsyncProductsOfCategory } from '../../store/ProductSlice';
import Loader from '../../components/loader/Loader';
import ProductList from '../../components/productlist/ProductList';


const CategoryProductPage = () => {

  const { category } = useParams();

  const [categorylist , setCategorylist] = useState<Allproducts>();
  
  useEffect(()=>{category && fetchDatabyCategory(category)},[category])

  const fetchDatabyCategory = async(category:string)=>{
    const categorylist: Allproducts = await fetchAsyncProductsOfCategory(category);
    if(categorylist){
      setCategorylist(categorylist);
    }
  }

  return (
    <div className='cat-products py-5 bg-whitesmoke min-height-100vh'>
      <div className='container'>
        <div className='cat-products-content'>
          <div className='title-md'>
            <h3>See our <span className='text-capitalize'>{category &&category.replace("-", " ")}</span></h3>
          </div>
          {
            categorylist ?  <ProductList products = {categorylist.products} /> : <Loader />
          }
        </div>
      </div>
    </div>
  )
}

export default CategoryProductPage