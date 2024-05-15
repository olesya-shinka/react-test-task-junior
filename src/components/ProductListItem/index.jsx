import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { getProduct } from "../../services/api";

function ProductListItem({ product, sizes }) {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    getProduct(id).then((product) => {
      if (product && product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
    });
  }, [id]);

  if (!product || !sizes) {
    return <p>Error of loading...</p>;
  }

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

  return (
    <div>
      {product && (
        <>
          <Link to={"/"} className="product-link">
            <IoIosArrowBack /> Back
          </Link>
          <h2>{product.name}</h2>
          <div className="product-images">
            {selectedColor &&
              selectedColor.images &&
              selectedColor.images.map((image, index) => (
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
          {selectedColor && (
            <>
              <h3>Description:</h3>
              <p>{selectedColor.description}</p>
            </>
          )}
          <h3>Colors:</h3>
          <div>
            {product.colors.map((color) => (
              <button
                key={color.id}
                className={
                  selectedColor === color
                    ? "product-prop-selected"
                    : "product-prop"
                }
                onClick={() => selectColor(color)}
              >
                {color.name}
              </button>
            ))}
          </div>
          <h3>Sizes:</h3>
          <div>
            {selectedColor ? (
              selectedColor.sizes.length > 0 ? (
                selectedColor.sizes.map((sizeId) => {
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
              ) : (
                sizes.map((size, i) => (
                  <button className="disabled-btn" key={i}>
                    {size.label}
                  </button>
                ))
              )
            ) : (
              <p>Please select a color</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductListItem;
