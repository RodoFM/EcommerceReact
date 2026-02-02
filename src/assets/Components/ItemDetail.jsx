import {useState} from "react";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";

export default function ItemDetail({item}){
const [cantidadAgregada, setCantidadAgregada] = useState(0);

const onAdd = (cantidad) =>{
    setCantidadAgregada(cantidad);
}

    return(
        <main className="container my-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="text-success fw-bold">{item.nombre}</h2>

                    <p className="mb-1">
                        <span className="fw-semibold">Categoría</span> {item.categoria}
                    </p>
                    <p className="mb-1">
                        <span className="fw-semibold">Precio: </span> {item.precio.toLocaleString("es-CL")}
                    </p>
                    <p className="mb-1">
                        <span className="fw-semibold">Stock: </span> {item.stock}
                    </p>
                    
                    <hr/>

                    <p className="text-secondary">{item.descripcion}</p>

                    <div className="mt-4"> {cantidadAgregada === 0?(
                        <ItemCount stock={item.stock} initial={1} onAdd={onAdd}/>

                    ):(
                        <div className="alert alert-success">Agregaste {cantidadAgregada} producto/s al carrito</div>
                    )}

                    </div>

                    <div className="mt-3">
                        <Link to="/" className="btn btn-success">Volver al cátalogo</Link>

                    </div>
                    
                </div>
            </div>
        </main>
    );
}