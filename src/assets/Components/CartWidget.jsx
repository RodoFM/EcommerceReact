import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function CartWidget() {
  const { totalQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <button type="button" className="btn btn-outline-light position-relative" onClick={() => navigate("/cart")}>
      🧶
      {totalQuantity > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {totalQuantity}
        </span>
      )}
    </button>
  );
}

