import { Routes, Route } from "react-router-dom";

import NavBar from "./assets/Components/NavBar";
import ItemListContainer from "./assets/Components/ItemListContainer";
import ItemDetailContainer from "./assets/Components/ItemDetailContainer";
import Cart from "./assets/Components/Cart";
import Checkout from "./assets/Components/Checkout";
import NotFound from "./assets/Components/NotFound";

export default function App() {
  return (
    <>
      <NavBar />
      <main className="container py-4">
        <Routes>
          <Route
            path="/"
            element={<ItemListContainer mensaje="Bienvenido/a a tu tienda de tejidos" />}
          />

          <Route
            path="/category/:categoryId"
            element={<ItemListContainer mensaje="Catálogo por categoría" />}
          />

          <Route path="/item/:itemId" element={<ItemDetailContainer />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}