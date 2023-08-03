import React from 'react';
import { useLocation } from 'react-router-dom';
import './Category.scss';
import Product from '../Products/Products';

function Category() {
  const location = useLocation();
  const filteredData = location.state?.filteredData || [];

  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="category-title">
        Category List
        </div>
        <Product innerPage={true}  products={filteredData} />
      </div>
    </div>
  );
}
export default Category;