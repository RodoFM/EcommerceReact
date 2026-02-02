import NavBar from "./assets/Components/NavBar"
import ItemListContainer from "./assets/Components/ItemListContainer";
import ItemDetailContainer from "./assets/Components/ItemDetailContainer";

import NotFound from "./assets/Components/NotFound";

import {Routes, Route} from "react-router-dom";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/*Catalogo ppal*/}
      <Route path="/" element={<ItemListContainer mensaje="Bienvenido/a a tu tienda de tejidos" />}/>
      
      {/*catalogo por categoria*/}
      <Route path="/category/:categoryId" element={<ItemListContainer mensaje="Bienvenido/a a tu tienda de tejidos" />}/>


      {/*categoria del producto*/}
      <Route path="/item/:itemId" element={<ItemDetailContainer mensaje="Bienvenido/a a tu tienda de tejidos" />}/>

      {/*404 Error*/}
      <Route path="*" element={<NotFound />}/>


      </Routes>
    </>
  );
}
