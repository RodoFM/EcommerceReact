import { useEffect, useState } from "react";

export default function ItemCount({ stock, initial = 1, onAdd }) {
  const safeInitial = stock > 0 ? Math.min(Math.max(initial, 1), stock) : 0;
  const [count, setCount] = useState(safeInitial);

  useEffect(() => {
    if (stock === 0) setCount(0);
    else if (count < 1) setCount(1);
    else if (count > stock) setCount(stock);
    
  }, [stock]);

  const sumar = () => setCount((c) => (c < stock ? c + 1 : c));
  const restar = () => setCount((c) => (c > 1 ? c - 1 : c));

  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex align-items-center gap-2">
        <span className="fw-bold">Cantidad:</span>

        <button className="btn btn-outline-secondary" onClick={restar} disabled={count <= 1}>
          -
        </button>

        <span className="px-2">{count}</span>

        <button className="btn btn-outline-secondary" onClick={sumar} disabled={count >= stock}>
          +
        </button>

        <span className="text-muted ms-2">(stock: {stock})</span>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => onAdd(count)}
        disabled={stock === 0 || count < 1}
      >
        Agregar al carrito
      </button>

      {stock === 0 && <div className="text-danger">Sin stock disponible</div>}
    </div>
  );
}