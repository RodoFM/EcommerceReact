import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";


function normalizeProduct(docSnap) {
  const data = docSnap.data();

  return {
    id: docSnap.id,
    ...data,
    imagenUrl: data.imagenUrl ?? data.img ?? data.imageUrl ?? "",
    tipo: data.tipo ?? data.categoria ?? null,
    
    descripcion: data.descripcion ?? "",
  };
}

export async function getProducts(categoryId = null) {
  const colRef = collection(db, "products");

  
  if (categoryId) {
    const qTipo = query(colRef, where("tipo", "==", categoryId));
    const snapTipo = await getDocs(qTipo);

    if (!snapTipo.empty) {
      return snapTipo.docs.map(normalizeProduct);
    }

    
    const qCat = query(colRef, where("categoria", "==", categoryId));
    const snapCat = await getDocs(qCat);

    return snapCat.docs.map(normalizeProduct);
  }

  // Sin filtro: trae todo
  const snap = await getDocs(colRef);
  return snap.docs.map(normalizeProduct);
}

export async function getProductById(id) {
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return normalizeProduct(snap);
}