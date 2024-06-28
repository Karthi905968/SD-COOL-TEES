import React from 'react';
import { useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import Items from './Items';

const Products = () => {
  const products = useSelector(state => state.items);

  return (
    <>
      {products.length > 0 ? (
        Array.isArray(products) && products.map(product => (
          <Items product={product} key={product.id} />
        ))
      ) : (
        <ClipLoader
          color='black'
          loading='true'
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}

    </>
  );
};

export default Products;
