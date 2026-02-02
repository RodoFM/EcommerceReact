import CartWidget from "./CartWidget";
import { NavLink, Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-success navbar-dark">
      <div className="container">

        {/* Logo / Marca */}
        <Link className="navbar-brand fw-bold" to="/">  Hasu Creando Con Amor</Link>

        {/* Botón hamburguesa*/}
        <button  className="navbar-toggler"  type="button" data-bs-toggle="collapse" data-bs-target="#menu"  aria-controls="menu" aria-expanded="false" aria-label="Abrir menú">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Carro*/}
        <div className="d-flex align-items-center ms-2 order-lg-3">
          <CartWidget />
        </div>

        {/* Menu */}
        <div className="collapse navbar-collapse order-lg-2" id="menu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* Inicioo */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/"> Inicio </NavLink>
            </li>

            {/* Dropdown Catalogo */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Catálogo
              </span>

              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/">Todos los productos</NavLink>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <NavLink className="dropdown-item" to="/category/chales">Chales</NavLink>
                </li>

                <li>
                  <NavLink className="dropdown-item" to="/category/gorros"> Gorros</NavLink>
                </li>

                <li>
                  <NavLink className="dropdown-item" to="/category/bufandas">Bufandas</NavLink>
                </li>

                <li>
                  <NavLink className="dropdown-item" to="/category/hogar"> Hogar </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
