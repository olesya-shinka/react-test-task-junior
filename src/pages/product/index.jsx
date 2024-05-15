import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductListItem from "../../components/ProductListItem";
import { getProduct, getSizes } from "../../services/api";
import "../../styles/index.css";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    getProduct(id).then((data) => setProduct(data));
    getSizes().then((data) => setSizes(data));
  }, [id]);

  return (
    <div className="product-content">
      <ProductListItem product={product} sizes={sizes} />
    </div>
  );
}

export default Product;
