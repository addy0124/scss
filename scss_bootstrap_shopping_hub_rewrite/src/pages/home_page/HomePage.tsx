import React, { useState,useEffect,useCallback,useMemo,useContext } from 'react'
import HeaderSlider from '../../components/slider/HeaderSlider'
import "./HomePage.scss";
import { BASE_URL } from '../../utils/apiURL';
import { Allproducts, Product, getAllcategories, getAsyncProducts } from '../../store/ProductSlice';
import { type } from 'os';
import { title } from 'process';
import ProductList from '../../components/productlist/ProductList';
import Loader from '../../components/loader/Loader';
import { ProductlistContext } from '../../context/Productlist_Provider';

const HomePage: React.FC = () => {

  const { productlist,categories } = useContext(ProductlistContext);

  const slicecategories =  categories?.slice(0,4)
  //const [tempProducts, setTempProducts] = useState<Product[]>([]);


  const tempProducts:Product[]  = useMemo(()=>{
    const tempProducts : Product[] = [];
    if(productlist.length > 0){
      for(let i in productlist){
        let randomIndex = Math.floor(Math.random()*productlist.length);
        //to avoid same item
        while(tempProducts.includes(productlist[randomIndex])){
          randomIndex = Math.floor(Math.random()*productlist.length);
        }
        tempProducts[i] = productlist[randomIndex];
      }
    }
    return tempProducts
  },[productlist])

  /* 
  create the Categorieswithproducts
  smartphones:{
      name:"smartphones",
      products: []
  }
   */
  interface Categorieswithproducts {
    [key: string]: {
        name: string;
        products: Product[]; // Update the type as per your requirements
    };
  }

  const initialCategorieswithproducts: Categorieswithproducts = {};

  categories?.forEach((value)=>{
    initialCategorieswithproducts[value] ={
      name: value,
      products: []
  };
  })

  const categorieswithproductslist : Categorieswithproducts = initialCategorieswithproducts;
  categories?.forEach((category, index)=>{
    const res: Product[] = productlist.filter(product => product.category === category);
    if (categorieswithproductslist.hasOwnProperty(category)) {
      categorieswithproductslist[category as keyof Categorieswithproducts].products.push(...res);}
  })

  return (
    <main>
      <div className='slider-wrapper'>
        <HeaderSlider />
      </div>
      <div className='main-content bg-whitesmoke'>
        <div className='container'>
          <div className='categories py-5'>
            <div className='categories-item'>
              <div className='title-md'>
                <h3>See our products</h3>
              </div>
              { tempProducts?.length < 0 ? <Loader /> : <ProductList products = {tempProducts} />}
            </div>


            {slicecategories?.map((category, index)=>(
              <div className='categories-item' key={index}>
                   <div className='title-md'>
                   <h3>{category}</h3>
              </div>
              { !categorieswithproductslist ? <Loader /> : <ProductList products = {categorieswithproductslist[category].products} />}
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </main>
  )
}

export default HomePage