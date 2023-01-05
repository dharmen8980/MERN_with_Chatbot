import { Container } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Button, Typography } from "@mui/material";
import { BsCart, BsCartFill } from "react-icons/bs";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    Axios.get("http://localhost:4000/api/get").then((res) => {
      // setProducts from the response and add isAdded and quantityAdded fields
      setProducts(
        res.data.map((product) => ({
          ...product,
          isAdded: false,
          quantityAdded: 0,
        }))
      );
    });
  }, []);

  return (
    <div className="relative top-[6rem]">
      <Container>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="px-[1rem] border border-1 shadow-md hover:shadow-2xl"
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/shrwan-sahakari.appspot.com/o/WxD0Jgg59YPWraPrrCMD16CAl7h1%2F2023-01-04T19%3A27%3A42Z.jpg?alt=media&token=25085604-6b54-4e7c-8920-d94dc74c1a8e"
                alt=""
                className="max-w-[24rem] max-h-[20rem] mx-auto my-2"
              />
              <Typography variant="h4">{product.name}</Typography>
              <Typography variant="h6">Price: {product.price}</Typography>
              <Typography variant="h6">
                Description: {product.description}
              </Typography>
              {/* <div className="flex flex-row justify-end">
                <Button
                  sx={{
                    color: "black",
                    fontSize: "2rem",
                    marginBottom: "1rem",
                  }}
                  onClick={() => {
                    const newProducts = [...products];
                    newProducts.find((p) => p._id === product._id).isAdded =
                      !product.isAdded;
                    setProducts(newProducts);
                  }}
                >
                  {product.isAdded ? <BsCartFill /> : <BsCart />}
                </Button>
              </div> */}
              <div className="flex flex-row justify-end">
                {product.isAdded && (
                  <React.Fragment>
                    <Button
                      sx={{
                        color: "black",
                        fontSize: "2rem",
                        marginBottom: "1rem",
                      }}
                      onClick={() => {
                        const newProducts = [...products];
                        const newProduct = newProducts.find(
                          (p) => p._id === product._id
                        );
                        newProduct.quantityAdded = Math.max(
                          0,
                          newProduct.quantityAdded - 1
                        );
                        setProducts(newProducts);
                      }}
                    >
                      -
                    </Button>
                    <p className="text-xl relative top-6">
                      {product.quantityAdded}
                    </p>
                    <Button
                      sx={{
                        color: "black",
                        fontSize: "2rem",
                        marginBottom: "1rem",
                      }}
                      onClick={() => {
                        const newProducts = [...products];
                        const newProduct = newProducts.find(
                          (p) => p._id === product._id
                        );
                        newProduct.quantityAdded += 1;
                        setProducts(newProducts);
                      }}
                    >
                      +
                    </Button>
                  </React.Fragment>
                )}
                <Button
                  sx={{
                    color: "black",
                    fontSize: "2rem",
                    marginBottom: "1rem",
                  }}
                  onClick={() => {
                    const newProducts = [...products];
                    newProducts.find((p) => p._id === product._id).isAdded =
                      !product.isAdded;
                    setProducts(newProducts);
                  }}
                >
                  {product.isAdded ? <BsCartFill /> : <BsCart />}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Product;
