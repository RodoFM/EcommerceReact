import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "./Data/productsService";
import ItemList from "./ItemList";



export default function ItemListContainer({ mensaje }) {

  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getProducts(categoryId)
      .then((data) => setItems(data))
      .finally(() => setLoading(false));
  }, [categoryId]);


  return (
    <main className="container my-4">
      <div className="p-4 p-md-5 rounded-4 bg-light border mb-4">
        <h2 className="fw-bold text-success mb-2">{mensaje}</h2>
        <p className="text-secondary mb-0">
          {categoryId ? `Categoría seleccionada: ${categoryId}` : "Mostrando todo el cátalogo"}

        </p>
      </div>

      {loading ? (
        <div className="alert alert-success">Cargando productos</div>
      ) : (
        <ItemList items={items} />
      )}

    </main>
  );
}
