"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useRouter } from "next/navigation";
import { Row, Col, Spin } from "antd";
import ProductCard from "../components/productCard";
import Navbar from "../components/navbar";
import {
  selectProducts,
  fetchProducts,
} from "../redux/slices/productListSlice";
import LogoutButton from "../components/logoutButton";

const ProductListScreen: React.FC = () => {
  const storedProducts = localStorage && localStorage.getItem("cart");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [cart, setCart] = useState(
    storedProducts ? JSON.parse(storedProducts) : []
  );
  const [offset, setOffset] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState();

  const { products, checkedEmpty, error, status } = useSelector(selectProducts);

  const handleCategoryChange = (category: any) => {
    setOffset(0);
    setSelectedCategory(category === "All" ? null : category);
  };

  const handleCartClick = () => {
    router.push("/product-list/cart");
  };

  const handleAddToCart = (product: any) => {
    setCart((prevCart: any) => {
      const productIndex = prevCart.findIndex(
        (item: any) => item["id"] === product.id
      );

      const likedProduct =
        productIndex > -1
          ? prevCart.filter((item: any) => item["id"] !== product.id)
          : [...prevCart, product];
      storeProduct(likedProduct);
      return likedProduct;
    });
  };

  const storeProduct = (cart: any) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight &&
      checkedEmpty.length !== 0
    ) {
      setOffset(offset + 10);
    }
  };

  useEffect(() => {
    dispatch(
      fetchProducts({ limit: 10, offset: offset, categoryId: selectedCategory })
    );
  }, [dispatch, offset, selectedCategory]);

  return (
    <div className="min-h-screen">
      <Navbar
        externalLoading={status === "loading"}
        onCategoryChange={handleCategoryChange}
        onCartClick={handleCartClick}
        productInCart={cart.length !== 0}
      />
      <div className="p-4">
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col key={product["id"]} span={12} md={8} lg={6}>
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                isInCart={cart.some((item: any) => item["id"] === product["id"])}
              />
            </Col>
          ))}
        </Row>
      </div>

      <Spin
        className="flex justify-center items-center"
        spinning={status == "loading"}
      ></Spin>
      {status === "failed" && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
      { products.length === 0 && (
        <p className="text-yellow-500 text-sm mt-2 text-center">Product not found ...</p>
      )

      }
      <LogoutButton/>
    </div>
  );
};

export default ProductListScreen;
