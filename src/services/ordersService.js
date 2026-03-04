import { db } from "../firebase/config";
import { collection, doc, runTransaction, serverTimestamp } from "firebase/firestore";

export async function checkoutConTransaccion(cart, buyer = {}) {
  if (!cart || cart.length === 0) throw new Error("Carrito vacío.");

  const orderRef = doc(collection(db, "orders"));

  await runTransaction(db, async (tx) => {
    const updates = [];

    for (const item of cart) {
      const prodRef = doc(db, "products", String(item.id));
      const snap = await tx.get(prodRef);

      if (!snap.exists()) throw new Error(`Producto no existe (id: ${item.id}).`);

      const data = snap.data();
      const currentStock = Number(data.stock);

      if (Number.isNaN(currentStock)) throw new Error(`Stock inválido en producto (id: ${item.id}).`);
      if (currentStock < item.quantity) {
        throw new Error(`Stock insuficiente para "${data.nombre ?? item.nombre}". Disponible: ${currentStock}`);
      }

      updates.push({ prodRef, newStock: currentStock - item.quantity });
    }

    updates.forEach((u) => tx.update(u.prodRef, { stock: u.newStock }));

    const total = cart.reduce((acc, i) => acc + i.precio * i.quantity, 0);

    tx.set(orderRef, {
      buyer,
      items: cart.map((i) => ({
        id: String(i.id),
        nombre: i.nombre,
        precio: i.precio,
        quantity: i.quantity,
      })),
      total,
      createdAt: serverTimestamp(),
      status: "created",
    });
  });

  return orderRef.id;
}