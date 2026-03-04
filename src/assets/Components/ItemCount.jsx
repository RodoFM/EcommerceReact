import { useState, useEffect } from "react";

export default function ItemCount({ stock, initial = 1, onAdd }) {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    if (stock === 0) {
      setCount(0);
    } else if (count > stock) {
      setCount(stock);
    }
  }, [stock]);

  const sumar = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const restar = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="border rounded p-3 bg-light">
      <p className="fw-semibold mb-2">Cantidad</p>

      <div className="d-flex align-items-center gap-2 mb-3">
        <button
          className="btn btn-outline-success"
          onClick={restar}
          disabled={count <= 1}
        >
          -
        </button>

        <span className="fw-bold fs-5">{count}</span>

        <button
          className="btn btn-outline-success"
          onClick={sumar}
          disabled={count >= stock}
        >
          +
        </button>
      </div>

      <button
        className="btn btn-success w-100"
        onClick={() => onAdd(count)}
        disabled={stock === 0}
      >
        Agregar al carrito
      </button>

      {stock === 0 && (
        <p className="text-danger mt-2 mb-0">
          Sin stock disponible
        </p>
      )}
    </div>
  );
}
