import ItemCard from "./ItemCard";

export default function ItemList({items}){
    return (
        <div className="row g-3">
            {items.map((p)=>(
                <ItemCard key={p.id} producto={p}/>
            )
        )}
        </div>
    );
}