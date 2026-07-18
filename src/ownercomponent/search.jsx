import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import "../ownercss/search.css";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="search-container">
      <div className="dashboardSearch-box">
        <SearchIcon className="dashboardSearch-icon" />

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          className="dashboardsearch"
        />
      </div>

      <button className="notification-btn">
        <NotificationsNoneIcon />
      </button>
    </div>
  );
}
