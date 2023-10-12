import { Link } from "react-router-dom";
import mjpro from "../assets/mjpro_image.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavBar2() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-0">
      <div className="container-fluid p-2" style={{ backgroundColor: "#053B50" }}>
        <div>
          <a className="navbar-brand ms-4" href="#">
            <img src={mjpro} alt="mjprolite" width="50" height="50" style={{ borderRadius: "50%" }} />
          </a>
        </div>
        <div>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation" style={{backgroundColor: "white"}}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end w-50 p-3" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{backgroundColor: "#053B50"}}>
            <div className="offcanvas-header" >
              <div><img src={mjpro} alt="mjprolite" width="50" height="50" style={{ borderRadius: "50%" }}/></div>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
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
      </div>
    </nav>
  )
}