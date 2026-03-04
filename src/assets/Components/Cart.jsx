import { checkoutConTransaccion } from "../../services/ordersService";

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
    // respeta stock del producto guardado en el carrito
    if (item.quantity >= item.stock) {
      setMsg(`Stock máximo alcanzado para "${item.nombre}".`);
      return;
    }
    setMsg("");
    updateItemQty(item.id, item.quantity + 1);
  };

  const handleDec = (item) => {
    setMsg("");
    updateItemQty(item.id, item.quantity - 1); // si llega a 0, el context lo elimina
  };

  const handleRemove = (id) => {
    setMsg("");
    removeItem(id);
  };

  const handleClear = () => {
    setMsg("");
    clearCart();
  };


  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleCheckout = async () => {
    try {
      setMsg("");
      setOrderId("");

      if (cart.length === 0) {
        setMsg("Tu carrito está vacío.");
        return;
      }

      setLoading(true);

      
      const buyer = {
        nombre: "Cliente",
        telefono: "",
        email: "",
      };

      const id = await checkoutConTransaccion(cart, buyer);

      setOrderId(id);
      clearCart();
      setMsg("Compra realizada con éxito ✅");
    } catch (error) {
      setMsg(error.message || "Error al finalizar compra.");
    } finally {
      setLoading(false);
    }
  };

if (cart.length === 0) {
  return (
    <main className="container my-4">
      <h2 className="text-success fw-bold mb-3">Carrito</h2>

      <div className="alert alert-info">
        Tu carrito está vacío. <Link to="/">Ir al catálogo</Link>
      </div>
    </main>
  );
}

return (
  <main className="container my-4">
    <div className="d-flex align-items-center justify-content-between mb-3">
      <h2 className="text-success fw-bold m-0">Carrito</h2>
      <span className="badge bg-success">
        {totalQuantity} producto{totalQuantity === 1 ? "" : "s"}
      </span>
    </div>

    {msg && <div className="alert alert-warning">{msg}</div>}

    <div className="row g-3">
      {/* LISTA */}
      <section className="col-12 col-lg-8">
        <div className="list-group">
          {cart.map((item) => (
            <div
              key={item.id}
              className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3"
            >
              <div>
                <h5 className="mb-1">{item.nombre}</h5>
                <div className="text-secondary small">
                  {item.categoria ? `Categoría: ${item.categoria} · ` : ""}
                  Stock: {item.stock}
                </div>
                <div className="mt-1 fw-semibold">
                  Precio: {CLP.format(item.precio)}
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-success"
                  onClick={() => handleDec(item)}
                  disabled={item.quantity <= 1}
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>

                <span className="fw-bold fs-5" style={{ minWidth: 32, textAlign: "center" }}>
                  {item.quantity}
                </span>

                <button
                  className="btn btn-outline-success"
                  onClick={() => handleInc(item)}
                  disabled={item.quantity >= item.stock}
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>

              <div className="text-md-end">
                <div className="fw-bold">
                  Subtotal: {CLP.format(item.precio * item.quantity)}
                </div>

                <button
                  className="btn btn-outline-danger btn-sm mt-2"
                  onClick={() => handleRemove(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex gap-2 mt-3">
          <Link to="/" className="btn btn-success">
            Seguir comprando
          </Link>
          <button className="btn btn-outline-danger" onClick={handleClear}>
            Vaciar carrito
          </button>
        </div>
      </section>

      {/* RESUMEN */}
      <aside className="col-12 col-lg-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Resumen</h5>

            <div className="d-flex justify-content-between mt-3">
              <span className="text-secondary">Ítems</span>
              <span className="fw-semibold">{totalQuantity}</span>
            </div>

            <div className="d-flex justify-content-between mt-2">
              <span className="text-secondary">Total</span>
              <span className="fw-bold fs-5">{totalFormateado}</span>
            </div>

            <hr />

            <button
              className="btn btn-success w-100"
              onClick={handleCheckout}
              disabled={loading || cart.length === 0}
            >
              {loading ? "Procesando..." : "Finalizar compra"}
            </button>


            <p className="text-secondary small mt-2 mb-0">
              Luego conectamos el checkout con Firestore (transacción) para descontar stock de forma segura.
            </p>
          </div>
        </div>
      </aside>
    </div>
  </main>
);
}
