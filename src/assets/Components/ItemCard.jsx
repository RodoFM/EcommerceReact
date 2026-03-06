import { Link } from "react-router-dom";

export default function ItemCard({ producto }) {
  if (!producto) return null;

  const tipoLabel = producto.tipo ?? producto.categoria ?? "Sin tipo";

  return (
    <div className="card h-100">
      {producto.imagenUrl ? (
        <img
          src={producto.imagenUrl}
          alt={producto.nombre}
          className="product-img"
          loading="lazy"
        />
      ) : (
        <div className="product-img-placeholder">🧶 Sin imagen</div>
      )}

      <div className="card-body">
        <h5 className="card-title text-center">{producto.nombre}</h5>

        <p className="card-text mb-1">
          <strong>Tipo:</strong> {tipoLabel}
        </p>

        <p className="card-text mb-2">
          <strong>Precio:</strong>{" "}
          {Number(producto.precio).toLocaleString("es-CL")}
        </p>

        {producto.descripcion && (
          <p className="card-text text-muted">
            {producto.descripcion.length > 90
              ? producto.descripcion.slice(0, 90) + "..."
              : producto.descripcion}
          </p>
        )}

        <Link className="btn btn-primary w-100 mt-2" to={`/item/${producto.id}`}>
          Ver detalle
        </Link>
      </div>
    </div>
  );
}