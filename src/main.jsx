import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import OfflineSidebar from "../OFFLINE/offlinesidebar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <OfflineSidebar />
  </BrowserRouter>,
);
