import React from 'react';
import "./Header.scss";
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';


type Props = {}

const Header = (props: Props) => {
  return (
    <header className='header text-white w-100'>

    <div className="container">
      <div className="row">

        {/* left */}
        <div className="col-md-12 col-lg-6 fs-13">
          <ul className='flex align-center justify-content-lg-start justify-content-md-center p-0 pt-3'>
            <li><Link to = "/seller">Seller Center</Link></li>
            <li className='vert-line'></li>
            <li><Link to = "/download">Download</Link></li>
            <li className='vert-line'></li>
            <li className='flex align-center'>
                  <span className='fs-13'>Follow us on</span>
                  <ul className='social-links flex align-center'>
                    <li className='mx-2'>
                      <a href = "www.facebook.com" className='fs-15'>
                        <i className='fab fa-facebook'></i>
                      </a>
                    </li>
                    <li className='mx-2'>
                      <a href = "www.instagram.com" className='fs-15'>
                        <i className='fab fa-instagram'></i>
                      </a>
                    </li>
                  </ul>
                </li>
          </ul>
        </div>

        <div className="col-md-12 col-lg-6 fs-13">
          <ul className='flex align-center justify-content-lg-end justify-content-md-center p-0 pt-lg-3 pt-md-0'>
            <li>
              <Link to = "/" className='top-link-itm'>
                  <span className='mx-2'>
                    <i className='fa-solid fa-circle-question'></i>
                  </span>
                  <span className='top-link-itm-txt'>Support</span>
              </Link>
            </li>
            <li className='vert-line'></li>
            <li>
              <Link to = "/">
                <span className='top-link-itm-txt'>Register</span>
              </Link>
            </li>
            <li className='vert-line'></li>
            <li>
              <Link to = "/">
                <span className='top-link-itm-txt'>Log in</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-sm-12">
          <Navbar />
        </div>
      </div>
    </div>

      
    </header>
  )
}

export default Header