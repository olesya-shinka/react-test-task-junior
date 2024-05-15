import React, { useEffect, useState } from "react";
import "../../styles/index.css";
import { getProducts } from "../../services/api";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className="container">
      <div className="products-box">
        <h1 className="products-title">PRODUCTS LIST</h1>
      </div>
      <main className="products-container">
        {products.map((product) => (
          <div className="products-item" key={product.id}>
            <Link to={`/product/${product.id}`} className="product-link">
              <img
                src={product.colors[0].images[0]}
                alt={product.name}
                className="product-image"
              />
            </Link>
            <h3>{product.name}</h3>
          </div>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
