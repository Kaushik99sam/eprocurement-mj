import { Link } from "react-router-dom";
import mjpro from "../assets/mjpro_image.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
import React, { useState } from 'react';

// export function NavBar() {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(true);
//   const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
//   return <nav className="navbar navbar-expand-lg nav">
//     <h1 className="navbar-brand"><Link to="ListOfRfps"><img className="logo" src={mjpro} alt="logo"></img></Link></h1>
//     <button
//       className="navbar-toggler"
//       type="button"
//       data-toggle="collapse"
//       data-target="#navbarNav"
//       aria-controls="navbarNav"
//       aria-expanded={!isNavCollapsed ? true : false}
//       aria-label="Toggle navigation"
//       onClick={handleNavCollapse}
//     >
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
//       <ul>
//         <li><Link to="/suppliers">Supplier</Link></li>
//         <li><Link to="/tenders">Tenders</Link></li>
//         <li><Link to="/contact">Contact</Link></li>
//         <li><Link to="/about">About</Link></li>
//         <li><Link to="/login">Login</Link></li>
//       </ul>
//     </div>
//   </nav>
// }

export default function NavBar2() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-0">
      <div className="container-fluid p-2" style={{backgroundColor: "#053B50"}}>
          <div>
            <a className="navbar-brand ms-4" href="#">
              <img src={mjpro} alt="mjprolite" width="50" height="50" style={{borderRadius: "50%"}}/>
            </a>
          </div>
          <div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{backgroundColor: "white"}}>
              <span className="navbar-toggler-icon" ></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item ">
                  <Link to="/suppliers" className="nav-link active text-light" aria-current="page" >Suppliers</Link>
                </li>
                <li className="nav-item">
                  <Link to="/tenders" className="nav-link active text-light" aria-current="page" >Tenders</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link active text-light" aria-current="page" >Contact</Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link active text-light" aria-current="page" >About</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link active text-light" aria-current="page" >Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </nav>
  )
}