import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { getProductById } from "../../services/productsService";

export default function ItemDetailContainer() {
  const { itemId } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let active = true;

    setLoading(true);
    setErr("");

    getProductById(itemId)
      .then((data) => {
        if (active) setItem(data);
      })
      .catch((e) => {
        if (active) setErr(e?.message || "Error cargando detalle");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [itemId]);

  if (loading) return <div className="alert alert-info">Cargando detalle...</div>;

  if (err) return <div className="alert alert-danger">{err}</div>;

  if (!item) {
    return (
      <div className="alert alert-warning">
        Producto no encontrado.{" "}
        <Link to="/" className="alert-link">
          Volver
        </Link>
      </div>
    );
  }

  return <ItemDetail item={item} />;
}