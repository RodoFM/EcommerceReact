import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="alert alert-danger">
      <h2>Error 404</h2>
      <p>La página que buscas no existe.</p>
      <Link to="/" className="btn btn-primary">
        Volver al catálogo
      </Link>
    </div>
  );
}