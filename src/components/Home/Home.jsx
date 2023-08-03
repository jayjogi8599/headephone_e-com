import React, { useEffect, useContext } from "react";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";

const Home = () => {
  const {  products, setProducts } =
    useContext(Context);

  useEffect(() => {
    getProducts();
  }, []);


  const getProducts = () => {
    fetchDataFromApi('product').then((res) => {
      console.log(res);
      setProducts(res);
    });
  };
  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <Category />
          <Products products={products} headingText="Populer Products" />
        </div>
      </div>
    </div>
  );
};

export default Home;
