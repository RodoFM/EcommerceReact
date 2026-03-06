import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";
import { CartContext } from "../context/CartContext.jsx";

export default function ItemDetail({ item }) {
  const [cantidadAgregada, setCantidadAgregada] = useState(0);
  const { addItem } = useContext(CartContext);

  const tipoLabel = item.tipo ?? item.categoria ?? "Sin tipo";

  const onAdd = (cantidad) => {
    const ok = addItem(
      {
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        stock: item.stock,
        tipo: item.tipo ?? item.categoria ?? null,
        descripcion: item.descripcion ?? "",
        imagenUrl: item.imagenUrl ?? "",
      },
      cantidad
    );

    if (ok) setCantidadAgregada(cantidad);
    else alert("No puedes agregar más que el stock disponible.");
  };

  return (
    <div className="card">
      {item.imagenUrl ? (
        <img src={item.imagenUrl} alt={item.nombre} className="product-img-detail" />
      ) : (
        <div className="product-img-placeholder">🧶 Sin imagen</div>
      )}

      <div className="card-body">
        <h3 className="card-title product-detail-title">{item.nombre}</h3>

        <div className="product-meta mb-3">
          <span className="meta-pill">Tipo: {tipoLabel}</span>
          <span className="meta-pill">Stock: {item.stock}</span>
          <span className="meta-pill">
            {Number(item.precio).toLocaleString("es-CL")}
          </span>
        </div>

        {item.descripcion && <p className="text-muted">{item.descripcion}</p>}

        {item.stock === 0 && (
          <div className="alert alert-warning">Producto sin stock</div>
        )}

        {cantidadAgregada === 0 ? (
          <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />
        ) : (
          <div className="alert alert-success">
            Agregaste {cantidadAgregada} producto/s al carrito.
            <div className="mt-3 d-flex gap-2">
              <Link className="btn btn-success" to="/cart">
                Ir al carrito
              </Link>
              <Link className="btn btn-outline-primary" to="/">
                Seguir comprando
              </Link>
            </div>
          </div>
        )}

        <div className="mt-3">
          <Link to="/" className="btn btn-link">
            Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}