import axios from "axios";
import { useState } from "react";
import "./Header.css";
const Header = (props: any) => {
  const [search, setsearch] = useState("");
  const getSearchInput = (e: any) => {
    e.preventDefault();
    {
      props.func(search);
    }
  };
  const handleChange = (e: any) => {
    setsearch(e.target.value);
  };

  return (
    <div className="header">
      <img
        src={require("../assets/images/logo.png")}
        alt=""
        className="imgLogo"
      />
      <div className="searchBar">
        <i className="fa-solid fa-magnifying-glass searchIcon"></i>
        <form action="" onSubmit={getSearchInput} className="formdiv">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
  );
};

export default Header;
