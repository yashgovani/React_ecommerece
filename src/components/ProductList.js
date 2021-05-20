import React, { useEffect, useMemo, useState } from 'react';
import filtr from '../filterProducts';
import withContext from '../withContext';
import ProductItem from './ProductItem';
import { categories } from '../constant/categories';

const ProductList = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(props.context.products);
  }, [props.context]);

  const [categoryFilter, setCategoryFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  const filteredProducts = useMemo(
    () => filtr(products, categoryFilter, nameFilter, priceFilter),
    [categoryFilter, nameFilter, priceFilter, products]
  );

  return (
    <div className="home">
      <div className="home-page">
        <div className="hero is-primary">
          <div className="hero-body container">
            <h4 className="title">Our Products</h4>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: 1000,
          }}
        >
          <p>
            <strong>Filter By : &nbsp;</strong>
          </p>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ width: 200 }}
          >
            <option value={''}>All Categories</option>
            {categories.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
          <input
            type="search"
            placeholder="Search for items"
            className="search-keyword"
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            style={{ marginRight: 20, width: 200 }}
          >
            <option key="0" value={''}>
              Sort By: All
            </option>
            <option key="1" value={'asc'}>
              Price: Lowest to Highest
            </option>
            <option key="2" value={'desc'}>
              Price: Highest to Lowest
            </option>
          </select>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', paddingTop: 16 }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductItem
                key={index.toString()}
                product={product}
                addToCart={props.context.addToCart}
              />
            ))
          ) : (
            <p>No Results found.. &#128533; </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default withContext(ProductList);
