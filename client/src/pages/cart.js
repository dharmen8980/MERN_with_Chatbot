import { Divider, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const Cart = () => {
  return (
    <div className="relative top-[6rem]">
      <Container>
        <Typography>This is the page for cart</Typography>
        <div className="flex flex-row justify-between px-8 my-8">
          <div className="max-w-[50rem] border border-1  px-[2rem] shadow-md">
            <p className="text-xl">Your Cart Details</p>
            <Divider className="w-[40rem]" />
            <p>Div 1</p>
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
