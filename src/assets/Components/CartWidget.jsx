export default function CartWidget() {
  return (
    <button
      type="button"
      className="btn btn-outline-light position-relative"
      aria-label="Carrito de compras"
    >
      {/* Con Bootstrap Icons */}
      <i className="bi bi-bag-heart-fill me-2" aria-hidden="true"></i>
        Carrito
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        0
      </span>
    </button>
  );
}
