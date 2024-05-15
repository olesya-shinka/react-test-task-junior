import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Product from "./pages/product/index";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/product/:id" element={<Product />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default AppRoutes;
