import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "../ownercss/menucard.css";
import FavIcon from "../../public/favicon.svg";

const products = [
  {
    id: 1,
    name: "Beef Burger",
    price: 6500,
    image: "/images/burger.jpg",
    stock: true,
  },
  {
    id: 2,
    name: "Honey Cake",
    price: 8000,
    image: "/images/cake.jpg",
    stock: true,
  },
  {
    id: 2,
    name: "Honey Cake",
    price: 8000,
    image: "/images/cake.jpg",
    stock: true,
  },
  {
    id: 2,
    name: "Honey Cake",
    price: 8000,
    image: "/images/cake.jpg",
    stock: true,
  },
];

const ITEMS_PER_PAGE = 20;

export default function ProductCard() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const currentProducts = products.slice(start, end);

  return (
    <>
      <div className="productGrid">
        {currentProducts.map((item) => (
          <div className="card" key={item.id}>
            <div className="imageBox">
              <span className="badge">
                ● {item.stock ? "IN STOCK" : "OUT OF STOCK"}
              </span>

              <img src={FavIcon} alt={item.name} className="images" />
            </div>

            <div className="cardFooter">
              <h4 className="cardFootertext">{item.name}</h4>

              <span className="price">{item.price} Ks</span>
            </div>
          </div>
        ))}
      </div>

      {products.length > ITEMS_PER_PAGE && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            <ChevronLeftIcon fontSize="small" />
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={page === index + 1 ? "active" : ""}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      )}
    </>
  );
}
