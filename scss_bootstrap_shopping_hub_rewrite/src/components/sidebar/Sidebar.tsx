import React from 'react'

import "./Sidebar.scss";
import { Link } from 'react-router-dom';

type SidebarProps = {
  showSidebar:boolean
  toggleSidebar: (isShow:boolean) => void;
  categories:string[]
  
}

const Sidebar = ({showSidebar, toggleSidebar, categories}: SidebarProps) => {

  console.log("showSidebar : ", showSidebar);


  return (
    <aside className={`sidebar ${showSidebar ? 'open-sidebar': ''}`}>
      {/* close button */}
      <button type = "button" className='sidebar-hide-btn' onClick={()=>toggleSidebar(false)}>
        <i className='fas fa-times'></i>
      </button>
      {/* title */}
      <div>
        <div className='cat-title fs-17 text-uppercase fw-6 ls-1h text-black'>All Categories</div>
        <ul className='cat-list'>
          {
              categories.map((category, idx) => {
                return (
                  <li key = {idx}>
                    <Link to = {`category/${category}`} className='cat-list-link text-capitalize'>{category.replace("-", " ")}</Link>
                  </li>
                )
              })
            }
        </ul>
      </div>

    </aside>
  )
}

export default Sidebar