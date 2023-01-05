// import { Container } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Button, Typography } from "@mui/material";
import { BsCart, BsCartFill } from "react-icons/bs";
import Cart from "./cart";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const getProduct = async () => {
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
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="relative top-[6rem]">
      <div>
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

                        const newCart = [...cart];
                        const cartProduct = newCart.find(
                          (p) => p._id === product._id
                        );
                        if (cartProduct) {
                          cartProduct.quantity = Math.max(
                            0,
                            cartProduct.quantity - 1
                          );
                        }
                        if (cartProduct.quantity === 0) {
                          setCart(cart.filter((p) => p._id !== product._id));
                        } else {
                          setCart(newCart);
                        }
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

                        const newCart = [...cart];
                        const cartProduct = newCart.find(
                          (p) => p._id === product._id
                        );
                        if (cartProduct) {
                          cartProduct.quantity += 1;
                        } else {
                          newCart.push({ ...newProduct, quantity: 1 });
                        }
                        setCart(newCart);
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
          <Cart cart={cart} setCart={setCart} />
        </div>
        {cart.map((product) => (
          <div key={product._id}>
            <p>{product.name}</p>
            <p>{product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;

// import React, { useEffect, useState } from "react";
// import { Typography } from "@mui/material";

// const Product = () => {
//   const data = {
//     products: [
//       {
//         id: 1,
//         name: "Product 1",
//         price: 100,
//         description: "Product 1 Description",
//         image: "https://picsum.photos/200/300",
//       },
//       {
//         id: 2,
//         name: "Product 2",
//         price: 200,
//         description: "Product 2 Description",
//         image: "https://picsum.photos/200/300",
//       },
//       {
//         id: 3,
//         name: "Product 3",
//         price: 300,
//         description: "Product 3 Description",
//         image: "https://picsum.photos/200/300",
//       },
//     ],
//   };
//   const [products, setProducts] = useState([]);

//   const getProduct = async () => {
//     try {
//       const res = await fetch("http://localhost:4000/api/get");
//       const data = await res.json();

//       // setProducts from the response and add isAdded and quantityAdded fields
//       setProducts(
//         data.map((product) => ({
//           ...product,
//           isAdded: false,
//           quantityAdded: 0,
//         }))
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getProduct();
//     }, []);

//   return (
//     <div className="relative top-[6rem]">
//       <div>
//         <div className="grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-8">
//           {data.products.map((product) => (
//             <div
//               key={product.id}
//               className="px-[1rem] border border-1 shadow-md hover:shadow-2xl"
//             >
//               <img
//                 src={product.image}
//                 alt=""
//                 className="max-w-[24rem] max-h-[20rem] mx-auto my-2"
//               />
//               <Typography variant="h4">{product.name}</Typography>
//               <Typography variant="h6">Price: {product.price}</Typography>
//               <Typography variant="h6">
//                 Description: {product.description}
//               </Typography>
//             </div>
//           ))}
//         </div>
//         <div>
//           <div className="grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-8">
//             {products.map((item) => (
//               <div
//                 key={item.id}
//                 className="px-[1rem] border border-1 shadow-md hover:shadow-2xl"
//               >
//                 <img
//                   src={item.image}
//                   alt=""
//                   className="max-w-[24rem] max-h-[20rem] mx-auto my-2"
//                 />
//                 <Typography variant="h4">{item.name}</Typography>
//                 <Typography variant="h6">Price: {item.price}</Typography>
//                 <Typography variant="h6">
//                   Description: {item.description}
//                 </Typography>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;

