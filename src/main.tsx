import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import { ChakraProvider } from "@chakra-ui/react";
import Products from "./pages/Products";
import ViewProduct from "./pages/Products/ViewProduct";
import NavBar from "./components/NavBar";
import EditProduct from "./pages/Products/EditProduct";
import ProductProvider from "./pages/Products/context/ProductContext";
import CreateProduct from "./pages/Products/CreateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Products />,
  },
  {
    path: "/product/:id",
    element: <ViewProduct />,
  },
  {
    path: "/edit-product/:id",
    element: <EditProduct />,
  },
  {
    path: "/create-product",
    element: <CreateProduct />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <NavBar />
      <ProductProvider>
        <RouterProvider router={router} />
      </ProductProvider>
    </ChakraProvider>
  </React.StrictMode>
);
