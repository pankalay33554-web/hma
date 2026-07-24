import "../ownercss/production.css";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AddIcon from "@mui/icons-material/Add";
import FavIcon from "../../public/favicon.svg";

export default function Production() {
  const products = [
    {
      id: 1,
      name: "Chocolate Cake",
      status: "Formula",
      image: FavIcon,
    },

    {
      id: 2,
      name: "Chocolate Cake",
      status: "Formula",
      image: FavIcon,
    },
  ];

  const ITEMS_PER_PAGE = 12;
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const currentProducts = products.slice(start, end);

  return (
    <div className="main">
      <div className="production-header">
        <div className="header">
          <div className="searchsboxs">
            <SearchIcon className="searchsicons" />

            <input
              type="text"
              placeholder="Search Production..."
              className="productionSearch"
            />
          </div>

          <div className="header-buttons">
            <button
              className="report-btn"
              onClick={() => navigate("viewproduct")}
            >
              <DescriptionOutlinedIcon fontSize="small" />
              View Production Report
            </button>
            <Outlet />
          </div>

          <div>
            <button
              className="add-btn"
              onClick={() => navigate("addproduction")}
            >
              <AddIcon fontSize="small" />
              Add New Production
            </button>
            <Outlet />
          </div>
        </div>
      </div>

      <div className="production-grid">
        {currentProducts.map((item) => (
          <div className="production-card" key={item.id}>
            <div className="card-left">
              <h2 className="cardlefth2">{item.name}</h2>

              <p className="caardleftp">{item.status}</p>

              <button
                onClick={() => navigate("editreciepe")}
                className="cardleftbutton"
              >
                Edit Recipe
              </button>
              <Outlet />
            </div>

            <div className="card-right">
              <img
                src={item.image}
                alt={item.name}
                className="cardrightimage"
              />
            </div>
          </div>
        ))}
      </div>

      {products.length > ITEMS_PER_PAGE && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="paginationbutton"
          >
            <ChevronLeftIcon fontSize="small" />
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={page === index + 1 ? "active" : ""}
              onClick={() => setPage(index + 1)}
              className="paginationbutton"
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="paginationbutton"
          >
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      )}
    </div>
  );
}
