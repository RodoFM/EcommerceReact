import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "../firebase/config";

const productos = [
  { id: 1, nombre: "Chal tejido a mano", precio: 15990, stock: 6, categoria: "Chales" },
  { id: 2, nombre: "Gorro de lana suave", precio: 8990, stock: 10, categoria: "Gorros" },
  { id: 3, nombre: "Bufanda primaveral", precio: 12990, stock: 8, categoria: "Bufandas" },
  { id: 4, nombre: "Cojín tejido decorativo", precio: 19990, stock: 4, categoria: "Hogar" },
];

export async function seedProducts() {
  const batch = writeBatch(db);
  const colRef = collection(db, "products");

  productos.forEach((p) => {
    
    const docRef = doc(colRef, String(p.id));
    batch.set(docRef, {
      nombre: p.nombre,
      precio: p.precio,
      stock: p.stock,
      categoria: p.categoria,
    });
  });

  await batch.commit();
}
