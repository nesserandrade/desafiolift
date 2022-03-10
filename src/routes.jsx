import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

const Router = () => {
  return (
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
  );
};

export default Router;
