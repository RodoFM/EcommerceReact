import NavBar from "./assets/Components/NavBar";
import ItemListContainer from "./assets/Components/ItemListContainer";
import ItemDetailContainer from "./assets/Components/ItemDetailContainer";
import NotFound from "./assets/Components/NotFound";
import Cart from "./assets/Components/Cart";


import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/*Catalogo ppal*/}
      <Route path="/" element={<ItemListContainer mensaje="Bienvenido/a a tu tienda de tejidos" />}/>
      
      {/*catalogo por categoria*/}
      <Route path="/category/:categoryId" element={<ItemListContainer mensaje="Catálogo por categoría" />}/>

      {/*categoria del producto*/}
      <Route path="/item/:itemId" element={<ItemDetailContainer />}/>

      {/*Carrito*/}
      <Route path="/cart" element={<Cart />} />

      {/*404 Error*/}
      <Route path="*" element={<NotFound />}/>

      


      </Routes>
    </>
  );
}
