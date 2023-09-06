import React, { ReactNode, useEffect, useState } from 'react'
import { Allproducts, Product, getAllcategories, getAsyncProducts } from '../store/ProductSlice';

type ProductlistProps = {
    children: ReactNode;
}

type ProductlistContext ={
    productlist: Product[];
    categories: string[];
}

export const ProductlistContext = React.createContext<ProductlistContext>({} as ProductlistContext);


const Productlist_Provider = ({children} : ProductlistProps) =>{

    const [productlist, setProductlist] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetchProductData();
        fetchCategoriesData();
    }, []);
    
    const fetchProductData = async()=>{
        const allProducts: Allproducts = await getAsyncProducts(20);
        if(allProducts){
        setProductlist(allProducts.products);
        }
    }

    const fetchCategoriesData = async()=>{
        const categories: string[] = await getAllcategories();
        if(categories){
          setCategories(categories);
        }
    }



    return(
        <ProductlistContext.Provider value={{productlist,categories}}>
            {children}
        </ProductlistContext.Provider>
    )

}

export default Productlist_Provider;





