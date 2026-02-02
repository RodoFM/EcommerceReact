import {products} from "./products";
/*arreglar esto*/
const delay = (ms)=> new Promise((res) => setTimeout(res, ms));

export async function getProducts(categoryId) {
await delay(600);

if (!categoryId) return products;

return products.filter((p)=> p.categoria === categoryId);
}


export async function getProductById(itemId) {
    await delay(600);

    return products.find((p)=> p.id === itemId);
}

