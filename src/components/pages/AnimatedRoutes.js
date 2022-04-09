import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Form from "./Form";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/form" element={<Form />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
