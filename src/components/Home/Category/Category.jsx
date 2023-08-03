import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Category.scss";
import { fetchDataFromApi } from "../../../utils/api";
import cat1 from "../../../assets/category/cat-1.jpg";
import cat2 from "../../../assets/category/cat-2.jpg";
import cat3 from "../../../assets/category/cat-3.jpg";
import cat4 from "../../../assets/category/cat-4.jpg";

const Category = () => {
  const navigate = useNavigate();
  const getCat = () => {
    return fetchDataFromApi("product").then((res) => {
      return res; 
    });
  };
  const [getData, setGetData] = useState([]);
  useEffect(() => {
    getCat().then((data) => {
      setGetData(data);
    });
  }, []);
  const filterResult = (catItem) => {
    const result = getData.filter((curData) => {
      return curData.categories === catItem;
    });
    console.log(result);
    navigate("/category/:id", { state: { filteredData: result } });
  };
  return (
    <div className="shop-by-category">
      <div className="categories">
        <div className="category" onClick={() => filterResult("headephone")}>
          <img src={cat1} alt="headephone" />
        </div>
        <div className="category">
          <img
            src={cat2}
            alt="Wirelessspeakers"
            onClick={() => filterResult("Wirelessspeakers")}
          />
        </div>
        <div className="category">
          <img
            src={cat3}
            alt="smartwatches"
            onClick={() => filterResult("smartwatches")}
          />
        </div>
        <div className="category">
          <img
            src={cat4}
            alt="wirelessearbuds"
            onClick={() => filterResult("wirelessearbuds")}
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
