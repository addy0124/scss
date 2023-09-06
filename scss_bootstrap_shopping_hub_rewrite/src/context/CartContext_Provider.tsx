import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Allproducts, Product, getAllcategories, getAsyncProducts } from '../store/ProductSlice';
import { useLocalStorage } from '../components/hook/useLocalStorage';
import { ProductlistContext } from './Productlist_Provider';

type CartContextProps = {
    children: ReactNode;
}

type CartItem ={
    product: Product,
    quantity: number,
    discountedPrice:number,
}

type CartContext ={
    //getItemQuantity:(id:number) => number;
    increaseCartQuantity:(id:number) => void;
    decreaseCartQuantity:(id:number) => void;
    removeFromCart:(id:number) => void;
    clearallitem:()=>void;
    addToCart:(id:number,quantity: number, discountedPrice:number) => void;
    cartItems: CartItem[];
    carttotalPrice: number;
}

export const CartContext = React.createContext<CartContext>({} as CartContext);


const CartContext_Provider = ({children} : CartContextProps) =>{
    const { productlist } = useContext(ProductlistContext);

    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[]);
    
    /* add the item in cart */
    const addToCart = (id: number, quantity: number,discountedPrice:number) => {
        const isselectedItem = productlist.find((item) => item.id === id);
        const isalreadyinCart = cartItems.find((item)=> item.product.id === id);
        console.log("isalreadyinCart : ", isalreadyinCart)

        if (isselectedItem && !isalreadyinCart) {
            const selectedItem = productlist.find((item) => item.id === id);
            if (selectedItem) {
                setCartItems([...cartItems, { product: selectedItem, quantity: quantity,discountedPrice:discountedPrice }]);
              } 
        }else if(isselectedItem && isalreadyinCart){
            let tempQty = isalreadyinCart.quantity + quantity;
            isalreadyinCart.quantity = tempQty;
            setCartItems([...cartItems]);
        }
    }

    console.log("cartItems : ", cartItems);

    const increaseCartQuantity = (id: number) => {
        setCartItems((currItems: CartItem[]) => {
          return currItems.map((item) => {
            if (item.product.id === id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
        });
    };

    const decreaseCartQuantity = (id: number) => {
        setCartItems((currItems: CartItem[]) => {
          if(currItems.find(item => item.product.id === id)?.quantity === 1){
            return currItems.filter(item=> item.product.id !== id);
          }
          return currItems.map((item) => {
            if (item.product.id === id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
        });
    };

    const removeFromCart =(id:number) =>{
        setCartItems(currItems => {
            return currItems.filter(item => item.product.id !== id)
          })
    }

    const clearallitem = () =>{
        setCartItems([]);
    }

    const carttotalPrice = cartItems.reduce(
        (price, item) => (item.discountedPrice*item.quantity) + price,
        0
    )




    return(
        <CartContext.Provider value={{increaseCartQuantity,decreaseCartQuantity,cartItems,addToCart,removeFromCart,carttotalPrice,clearallitem}}>
            {children}
        </CartContext.Provider>
    )

}

export default CartContext_Provider;





