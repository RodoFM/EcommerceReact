import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { checkoutConTransaccion } from "../../services/ordersService";

const CLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useContext(CartContext);

  const [buyer, setBuyer] = useState({ nombre: "", telefono: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [orderId, setOrderId] = useState("");

  const totalFormateado = useMemo(() => CLP.format(totalPrice), [totalPrice]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setBuyer((b) => ({ ...b, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setOrderId("");

    if (cart.length === 0) {
      setMsg("Tu carrito está vacío.");
      return;
    }

    if (!buyer.nombre || !buyer.email) {
      setMsg("Completa al menos Nombre y Email.");
      return;
    }

    try {
      setLoading(true);
      const id = await checkoutConTransaccion(cart, buyer);
      setOrderId(id);
      clearCart();
      setMsg("Compra realizada con éxito");
    } catch (error) {
      setMsg(error?.message || "Error al finalizar compra.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <>
        <h2>Checkout</h2>
        <div className="alert alert-success">
          {msg}
          <div className="mt-2">
            <strong>ID de tu orden:</strong> <code>{orderId}</code>
          </div>
        </div>

        <Link to="/" className="btn btn-primary">
          Volver al catálogo
        </Link>
      </>
    );
  }

  return (
    <>
      <h2>Checkout</h2>

      {msg && <div className="alert alert-warning">{msg}</div>}

      <div className="mb-3">
        <strong>Total:</strong> {totalFormateado}
      </div>

      <form className="card card-body" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            className="form-control"
            name="nombre"
            value={buyer.nombre}
            onChange={onChange}
            placeholder="Tu nombre"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            name="email"
            value={buyer.email}
            onChange={onChange}
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            className="form-control"
            name="telefono"
            value={buyer.telefono}
            onChange={onChange}
            placeholder="+56..."
          />
        </div>

        <div className="d-flex gap-2">
          <Link className="btn btn-outline-secondary" to="/cart">
            Volver al carrito
          </Link>

          <button className="btn btn-success" type="submit" disabled={loading}>
            {loading ? "Procesando..." : "Confirmar compra"}
          </button>
        </div>
      </form>
    </>
  );
}