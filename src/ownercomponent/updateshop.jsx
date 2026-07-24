import { useState } from "react";
import "../ownercss/addnewshop.css";
import { useNavigate, Outlet } from "react-router";

export default function UpdateShop() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  return (
    <div className="addnewshop">
      <div className="addnewshopmain">
        <h2 className="addshoptitle"> Add New Shop</h2>
        <div className="addnewshopcontainer">
          <div className="LEFT">
            <div className="addnewshopbody">
              <label className="addnewshoplabel">Shop Name</label>
              <input type="text" className="addnewshopinput" />
            </div>

            <div className="addnewshopbody">
              <label className="addnewshoplabel">Address</label>
              <input type="text" className="addnewshopinput" />
            </div>

            <div className="addnewshopbody">
              <label className="addnewshoplabel">Phone No.</label>
              <input type="text" className="addnewshopinput" />
            </div>
          </div>

          <div className="Rightes">
            <div className="addnewshopbody">
              <div className="addnewshopbody">
                <label className="addnewshoplabel">Photo</label>
                <div>
                  <label htmlFor="photo" className="UploadInput">
                    Choose file
                  </label>
                  <input
                    type="file"
                    id="photo"
                    className="addnewshopinputupload"
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                  />
                  <span>{fileName}</span>
                </div>
              </div>
              <div className="addnewshopbody">
                <label className="addnewshoplabel">Manager Name</label>
                <input type="text" className="addnewshopinput" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footergroup-btn">
        <button className="footergroup-cancel" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <Outlet />
        <button className="footergroup-save">Update</button>
      </div>
    </div>
  );
}
