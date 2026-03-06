import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export default function Cart() {
  const { cart, totalPrice, totalQuantity, clearCart, removeItem, updateItemQty } =
    useContext(CartContext);

  const [msg, setMsg] = useState("");
  const totalFormateado = useMemo(() => CLP.format(totalPrice), [totalPrice]);

  const handleInc = (item) => {
    if (item.quantity >= item.stock) {
      setMsg(`Stock máximo alcanzado para "${item.nombre}".`);
      return;
    }
    setMsg("");
    updateItemQty(item.id, item.quantity + 1);
  };

  const handleDec = (item) => {
    setMsg("");
    updateItemQty(item.id, item.quantity - 1);
  };

  if (cart.length === 0) {
    return (
      <>
        <h2>Carrito</h2>
        <div className="alert alert-info">
          Tu carrito está vacío.{" "}
          <Link to="/" className="alert-link">
            Ir al catálogo
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <h2>Carrito</h2>
      <p className="text-muted">
        {totalQuantity} producto{totalQuantity === 1 ? "" : "s"}
      </p>

      {msg && <div className="alert alert-warning">{msg}</div>}

      <div className="list-group mb-3">
        {cart.map((item) => (
          <div className="list-group-item" key={item.id}>
            <div className="d-flex justify-content-between gap-3">
              <div className="d-flex align-items-start">
                {item.imagenUrl ? (
                  <img
                    src={item.imagenUrl}
                    alt={item.nombre}
                    className="cart-thumb me-3"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="cart-thumb me-3 product-img-placeholder"
                    style={{ height: 64, width: 64, borderRadius: 14 }}
                  >
                    🧶
                  </div>
                )}

                <div>
                  <h5 className="mb-1">{item.nombre}</h5>

                  <div className="text-muted">
                    {item.tipo ? `Tipo: ${item.tipo} · ` : ""}
                    Stock: {item.stock}
                  </div>

                  <div>Precio: {CLP.format(item.precio)}</div>

                  <button
                    className="btn btn-link text-danger p-0 mt-1"
                    onClick={() => removeItem(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              <div className="text-end">
                <div className="d-flex align-items-center gap-2 justify-content-end">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleDec(item)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleInc(item)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>

                <div className="mt-2">
                  Subtotal: {CLP.format(item.precio * item.quantity)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <div className="text-muted">Ítems: {totalQuantity}</div>
            <h4 className="mb-0">Total: {totalFormateado}</h4>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-outline-danger" onClick={clearCart}>
              Vaciar carrito
            </button>
            <Link className="btn btn-success" to="/checkout">
              Ir a checkout
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <Link to="/" className="btn btn-link">
          Seguir comprando
        </Link>
      </div>
    </>
  );
}