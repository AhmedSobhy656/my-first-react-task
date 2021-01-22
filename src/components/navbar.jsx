
import React from "react";
import {Link,NavLink} from "react-router-dom";

   // stateless function component 
    const NavBar= props => {
        return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">     
         <div className="collapse navbar-collapse" id="navbarNav"> 
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link"  href="/">
                        Home
                    </a>
                 </li>
                 <li className="nav-item">
                     <a className="nav-link" href="/contact">
                         Contact
                      </a>
                 </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/about">
                        About
                      </a>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                        Log in
                      </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/menu">
                       Menu
                      </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/cart">
                        Shopping Cart
                      </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin">
                       Admin
                      </NavLink>
                  </li>
                </ul>
               </div>  
             <Link to="/cart"> 
                 <span className="badge badge-primary"> 
                    <i style={{color:"white"}} class="fas fa-cart-plus"> </i>
                    {props.productsCount} 
                 </span>
             </Link>   
         </nav>  
     );
     };
         
 export default NavBar;