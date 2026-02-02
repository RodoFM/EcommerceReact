import {Link} from "react-router-dom";

export default function NotFound(){
    return(
        <main className="container my-5 text-center">
            <h2 className="fw-bold text-danger">Error 404</h2>
            <p className="text-secondary">La página que buscas no existe.</p>
            <Link className="btn btn-success" to="/">Vovler al cátalogo</Link>
        </main>
    );
}