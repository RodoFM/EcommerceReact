import { Link } from "react-router-dom";

export default function ItemCard({ producto }) {
    if (!producto) return null;

    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
                <div className="card-body">
                    <h5 className="card-little text-success fw-bold">{producto.nombre}</h5>
                    <p className="card-text mb-1">
                        <span className="fw-semibold">Categoría: </span> {producto.categoroa}</p>
                    <p className="card-text mb-1">
                        <span className="fw-semibold">Precio: </span> {" "}${Number(producto.precio).toLocaleString("es-CL")}
                    </p>
                </div>

                <div className="card-footer bg-transparent border-0 p-3 pt-0">
                    <Link className="btn btn-success w-100" to={`/item/${producto.id}`}>Ver detalle</Link>
                </div>
            </div >
        </div>



    );
}