import React from 'react'

import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../utils/apiURL';


export type Product = {
    id:                 number;
    title:              string;
    description:        string;
    price:              number;
    discountPercentage: number;
    rating:             number;
    stock:              number;
    brand:              string;
    category:           string;
    thumbnail:          string;
    images:             string[];
}

export type Allproducts = {
    products: Product[];
    total:    number;
    skip:     number;
    limit:    number;
}


const initialCategorieswithproducts =
{
  smartphones:{
      name:"smartphones",
      products: []
  },
  laptops:{
      name:"laptops",
      products: []
  },
  fragrances:{
      name:"fragrances",
      products: []
  },
  skincare:{
      name:"skincare",
      products: []
  },
  groceries:{
    name:"groceries",
    products: []
  },
  home_decoration:{
    name:"home-decoration",
    products: []
  },
  furniture:{
    name:"furniture",
    products: []
  },
  tops:{
    name:"tops",
    products: []
  },
  womens_dresses:{
    name:"womens-dresses",
    products: []
  },
  womens_shoes:{
    name:"womens-shoes",
    products: []
  },
  mens_shirts:{
    name:"mens-shirts",
    products: []
  },
  mens_shoes:{
    name:"mens-shoes",
    products: []
  },
  mens_watches:{
    name:"mens-watches",
    products: []
  },
  womens_watches:{
    name:"womens-watches",
    products: []
  },
  womens_bags:{
    name:"womens-bags",
    products: []
  },
  womens_jewellery:{
    name:"womens-jewellery",
    products: []
  },
  sunglasses:{
    name:"sunglasses",
    products: []
  },
  automotive:{
    name:"automotive",
    products: []
  },
  motorcycle:{
    name:"motorcycle",
    products: []
  },
  lighting:{
    name:"lighting",
    products: []
  },
}



//URL : https://dummyjson.com/products?limit=3
export const getAsyncProducts = async(limit: number) : Promise<Allproducts|any> => {
    try{
        const response = 
        await axios.get<Allproducts>(`${BASE_URL}products?limit=${limit}`)
        const allproducts: Allproducts = response.data;
        return allproducts;
    } 
    catch(error: any){
        console.error('Error:', error);
    }
}

//URL : https://dummyjson.com/products/categories
export const getAllcategories = async() : Promise<string[] | any> =>{
    try{
        const response = 
        await axios.get<string[]>(`${BASE_URL}products/categories`)
        const allcategories: string[] = response.data;
        return allcategories;
    } 
    catch(error:any){
        console.error('Error:', error);
    }

} 

console.log("`${BASE_URL}products/categories`: ", `${BASE_URL}products/categories`);


const ProductSlice = () => {
  return (
    <div>ProductSlice</div>
  )
}

export default ProductSlice