import { NavLink, Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import logo from "../logo.jpg";

const linkClass = ({ isActive }) =>
  `nav-link ${isActive ? "active fw-bold" : ""}`;

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
  <img src={logo} alt="Hasu logo" className="navbar-logo" />
  Hasu Creando Con Amor
</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={linkClass} to="/">
                Inicio
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Catálogo
              </span>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/">
                    Todos los productos
                  </NavLink>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li><NavLink className="dropdown-item" to="/category/vestuario">Vestuario</NavLink></li>
                <li><NavLink className="dropdown-item" to="/category/accesorio">Accesorios</NavLink></li>
                <li><NavLink className="dropdown-item" to="/category/mascotas">Mascotas</NavLink></li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink className={linkClass} to="/checkout">
                Checkout
              </NavLink>
            </li>
          </ul>

          <CartWidget />
        </div>
      </div>
    </nav>
  );
}