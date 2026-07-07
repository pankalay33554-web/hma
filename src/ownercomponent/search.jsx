import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import "../ownercss/search.css";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);

    // Backend ချိတ်ရင် API ခေါ်မယ့်နေရာ
    // searchProduct(e.target.value)
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <SearchIcon className="search-icon" />

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <button className="notification-btn">
        <NotificationsNoneIcon />
      </button>
    </div>
  );
}
