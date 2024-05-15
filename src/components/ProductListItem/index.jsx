import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { getProduct } from "../../services/api";

function ProductListItem({ sizes }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProduct(id);
        setProduct(fetchedProduct);
        setSelectedColor(fetchedProduct.colors[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const selectColor = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
    setSelectedImageIndex(0);
  };

  const selectSize = (size) => {
    setSelectedSize(size);
  };

  const selectImage = (index) => {
    setSelectedImageIndex(index);
  };

  if (!product || !sizes || !selectedColor) {
    return <p>Error of loading...</p>;
  }

  return (
    <div>
      <Link to={"/"} className="product-link">
        <IoIosArrowBack /> Back
      </Link>
      <h2>{product.name}</h2>
      <div className="product-images">
        {selectedColor.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${product.name} - ${selectedColor.name}`}
            className={` ${
              selectedImageIndex === index
                ? "product-img-selected"
                : "product-img"
            }`}
            onClick={() => selectImage(index)}
          />
        ))}
      </div>
      <h3>Description:</h3>
      <p>{selectedColor.description}</p>
      <h3>Colors:</h3>
      <div>
        {product.colors.map((color) => (
          <button
            key={color.id}
            className={
              selectedColor === color ? "product-prop-selected" : "product-prop"
            }
            onClick={() => selectColor(color)}
          >
            {color.name}
          </button>
        ))}
      </div>
      <h3>Sizes:</h3>
      <div>
        {selectedColor.sizes.length > 0
          ? selectedColor.sizes.map((sizeId) => {
              const size = sizes.find((size) => size.id === sizeId);
              return (
                <button
                  key={size.id}
                  disabled={!size || size === selectedSize}
                  className={
                    size === selectedSize
                      ? "product-prop-selected"
                      : "product-prop"
                  }
                  onClick={() => selectSize(size)}
                >
                  {size.label}
                </button>
              );
            })
          : sizes.map((size, i) => (
              <button className="disabled-btn" key={i}>
                {size.label}
              </button>
            ))}
      </div>
    </div>
  );
}

export default ProductListItem;
