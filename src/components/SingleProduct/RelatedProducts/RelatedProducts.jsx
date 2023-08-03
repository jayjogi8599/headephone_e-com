import React, { useState, useEffect } from 'react'
import Products from '../../Products/Products'
import { fetchDataFromApi } from "../../../utils/api";
const RelatedProducts = ({productId}) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  const fetchRelatedProducts = async () => {
    try {
      const products = await fetchDataFromApi('product');

      const currentProduct = products.find((product) => product._id === productId);
      
      const relatedProducts = products.filter(
        (product) => product._id !== productId && product.categories === currentProduct.categories
      );

      setRelatedProducts(relatedProducts);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, [productId]);
  return (
    <div className='releted-products'>
        <Products headingText='Releted Products' products={relatedProducts}/>
    </div>
  )
}

export default RelatedProducts