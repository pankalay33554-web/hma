import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "../ownercss/menufilterbar.css";

export default function FilterBar() {
  return (
    <div className="filterBar">
      <div className="selectBox">
        <select className="selectchoice">
          <option>Shop 1</option>
          <option>Shop 2</option>
          <option>Shop 3</option>
        </select>
        <KeyboardArrowDownIcon className="arrow" />
      </div>

      <div className="selectBox">
        <select className="selectchoice">
          <option>All Categories</option>
          <option>Burger</option>
          <option>Cake</option>
          <option>Cookies</option>
        </select>
        <KeyboardArrowDownIcon className="arrow" />
      </div>

      <div className="searchBoxs">
        <SearchIcon className="searchBoxIcons" />

        <input type="text" placeholder="Search..." className="search" />
      </div>
    </div>
  );
}
