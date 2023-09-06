import React from 'react';
import {loader} from "../../utils/images";


const Loader =() =>{
    return (
        <div className='container'>
          <div className='loader flex justify-center align-center'>
            <img src = {loader} alt = "" className='w-80'/>
          </div>
        </div>
      )
}

export default Loader;