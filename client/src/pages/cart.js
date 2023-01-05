import { Divider, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const Cart = ({cart, setCart}) => {
  return (
    <div className="relative top-[6rem]">
      <Container>
        <Typography>This is the page for cart</Typography>
        <div className="flex flex-row justify-between px-8 my-8">
          <div className="max-w-[50rem] border border-1  px-[2rem] shadow-md">
            <p className="text-xl">Your Cart Details</p>
            <Divider className="w-[40rem]" />
            {cart.map((product) => (
                    <div key={product._id}>
                        <p>{product.name}</p>
                        <p>{product.quantity}</p>
                    </div>
                ))}
          </div>
          <div className="max-w-[20rem] border border-1 px-[2rem] shadow-md">
            <p>Price details over here</p>
          </div>
        </div>
       
      </Container>
    </div>
  );
};

export default Cart;
