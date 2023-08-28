import React, { useState,useEffect,useCallback,useMemo } from 'react'
import HeaderSlider from '../../components/slider/HeaderSlider'
import "./HomePage.scss";
import { BASE_URL } from '../../utils/apiURL';
import { Allproducts, Product, getAllcategories, getAsyncProducts } from '../../store/ProductSlice';
import { type } from 'os';
import { title } from 'process';
import ProductList from '../../components/productlist/ProductList';

const HomePage: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>();
  //const [tempProducts, setTempProducts] = useState<Product[]>([]);

  const fetchProductData = async()=>{
    const allProducts: Allproducts = await getAsyncProducts(20);
    if(allProducts){
      setProducts(allProducts.products);
    }
  }

  const fetchCategoriesData = async()=>{
    const categories: string[] = await getAllcategories();
    if(categories){
      setCategories(categories);
    }
  }

  useEffect(() => {
    fetchProductData();
    fetchCategoriesData();
  }, []);

  console.log("products : ", products);

  const tempProducts:Product[]  = useMemo(()=>{
    const tempProducts : Product[] = [];
    if(products.length > 0){
      for(let i in products){
        let randomIndex = Math.floor(Math.random()*products.length);
        //to avoid same item
        while(tempProducts.includes(products[randomIndex])){
          randomIndex = Math.floor(Math.random()*products.length);
        }
        tempProducts[i] = products[randomIndex];
      }
    }
    return tempProducts
  },[products])

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
        products: any[]; // Update the type as per your requirements
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
    const res: Product[] = products.filter(product => product.category === category);
    if (categorieswithproductslist.hasOwnProperty(category)) {
      categorieswithproductslist[category as keyof Categorieswithproducts].products.push(res);}
  })

  console.log("categorieswithproductslist : ", categorieswithproductslist);


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
              { tempProducts?.length < 0 ? <div>loading</div> : <ProductList products = {tempProducts} />}
            </div>
          </div>
        </div>
      </div>
      
    </main>
  )
}

export default HomePage