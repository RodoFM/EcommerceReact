import ItemCard from "./ItemCard";

export default function ItemList({ items }) {
  return (
    <div className="row g-3">
      {items.map((p) => (
        <div className="col-12 col-md-6 col-lg-4" key={p.id}>
          <ItemCard producto={p} />
        </div>
      ))}
    </div>
  );
}