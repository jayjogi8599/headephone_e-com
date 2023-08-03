import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import "./SingleProduct.scss";
import { fetchDataFromApi } from "../../utils/api";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { Context } from "../../utils/context";

function SingleProduct() {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const { handleAddToCart } = useContext(Context);
  const increment = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const decrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };
  const getProductDetails = async () => {
    try {
      const products = await fetchDataFromApi("product").then((res) => {
        return res;
      });

      const product = products?.find((product) => product._id === id);
      setProductDetails(product);
      console.log("Product:", product);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img src={productDetails.img} alt="image" />
          </div>
          <div className="right">
            <span className="name">{productDetails.title}</span>
            <span className="price">₹{productDetails.price}</span>
            <span className="desc">{productDetails.desc}</span>
            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={decrement}>-</span>
                <span>{quantity}</span>
                <span onClick={increment}>+</span>
              </div>
              <button
                className="add-to-cart-button"
                onClick={() => {
                  handleAddToCart(productDetails, quantity);
                  setQuantity(1);
                }}
              >
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
            </div>
            <span className="divider" />
            <div className="info-item">
              <span className="text-bold">
                Category: <span> {productDetails.categories}</span>
              </span>
              <span className="text-bold">
                Share:
                <span className="social-icons">
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedinIn size={16} />
                  <FaPinterest size={16} />
                </span>
              </span>
            </div>
          </div>
        </div>
        <RelatedProducts productId={id} />
      </div>
    </div>
  );
}

export default SingleProduct;
