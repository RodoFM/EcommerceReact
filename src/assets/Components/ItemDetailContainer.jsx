import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../../services/productsService"; 
import ItemDetail from "./ItemDetail";

export default function ItemDetailContainer() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getProductById(itemId)
      .then((data) => setItem(data))
      .finally(() => setLoading(false));
  }, [itemId]);

  if (loading) {
    return (
      <main className="container my-4">
        <div className="alert alert-success">Cargando detalle...</div>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="container my-4">
        <div className="alert alert-danger">Producto no encontrado</div>
        <Link className="btn btn-success" to="/">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  return <ItemDetail item={item} />;
}