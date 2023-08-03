import React from 'react';
import {useNavigate} from 'react-router-dom'
import "./Product.scss";
const Product = ({products}) => {
  const navigate = useNavigate();
  return (
    <>
    {products?.map((item) => (
    <div className='product-card' onClick={()=>navigate(`/product/${item._id}`)}  key={item._id}  id={item._id}>
      <div className="thumbnail">
        <img src={item.img} alt="" />
      </div>
      <div className="prod-details">
        <span className="name">{item.title}</span>
        <span className="price">₹{item.price}</span>
        
      </div>
    </div>
       ))}
    </>
  )
}

export default Product