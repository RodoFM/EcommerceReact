import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase/config";

export default function ItemListContainer({ mensaje }) {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isMounted = true;

    const cargar = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        const colRef = collection(db, "products");
        const q = categoryId ? query(colRef, where("categoria", "==", categoryId)) : colRef;

        const snap = await getDocs(q);

        const data = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        console.log("Firestore docs:", snap.size, data); 

        if (isMounted) setItems(data);
      } catch (err) {
        console.error("Error Firestore:", err); 
        if (isMounted) setErrorMsg(err?.message || "Error cargando productos.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    cargar();

    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  return (
    <main className="container my-4">
      <h2 className="text-success fw-bold">{mensaje}</h2>

      {loading && <div className="alert alert-success mt-3">Cargando...</div>}

      {!loading && errorMsg && (
        <div className="alert alert-danger mt-3">
          <div className="fw-bold">No se pudo cargar Firestore</div>
          <div className="small">{errorMsg}</div>
        </div>
      )}

      {!loading && !errorMsg && items.length === 0 && (
        <div className="alert alert-warning mt-3">
          No hay productos para mostrar (colección vacía o filtro sin coincidencias).
          {categoryId && (
            <>
              {" "}
              <Link to="/" className="alert-link">
                Ver todos los productos
              </Link>
            </>
          )}
        </div>
      )}

      {!loading && !errorMsg && items.length > 0 && (
        <div className="list-group mt-3">
          {items.map((p) => (
            <div
              key={p.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <div className="fw-bold">{p.nombre}</div>
                <div className="text-secondary small">
                  Categoría: {p.categoria} · Stock: {p.stock}
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span className="fw-bold">
                  ${Number(p.precio).toLocaleString("es-CL")}
                </span>
                <Link className="btn btn-outline-success btn-sm" to={`/item/${p.id}`}>
                  Ver
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}