import FilterBar from "../ownercomponent/menusbar";
import ProductCard from "../ownercomponent/menuscard";
import "../ownercss/menu.css";
export default function Menus() {
  return (
    <div className="menu-container">
      <FilterBar />
      <ProductCard />
    </div>
  );
}
