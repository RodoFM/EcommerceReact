import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import { getProducts } from "../../services/productsService";

export default function ItemListContainer({ mensaje }) {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let active = true;

    setLoading(true);
    setErr("");

    getProducts(categoryId ?? null)
      .then((data) => {
        if (active) setItems(data);
      })
      .catch((e) => {
        if (active) setErr(e?.message || "Error cargando productos");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [categoryId]);

  return (
    <>
      <h2 className="mb-3">{mensaje}</h2>

      <p className="text-muted">
        {categoryId ? `Categoría: ${categoryId}` : "Mostrando todo el catálogo"}
      </p>

      {loading && (
        <div className="loader-soft">
          <span className="me-1">Cargando</span>
          <span className="loader-dot" />
          <span className="loader-dot" />
          <span className="loader-dot" />
          <span className="ms-1">🧶</span>
        </div>
      )}

      {!loading && err && <div className="alert alert-danger">{err}</div>}

      {!loading && !err && items.length === 0 && (
        <div className="alert alert-warning">No hay productos para mostrar.</div>
      )}

      {!loading && !err && <ItemList items={items} />}
    </>
  );
}

