import React from "react";
import { Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <div className="relative top-[6rem]">
      <Container className="bg-blue-500">
        <Container className="bg-green-500">
          <div className="w-full h-[30rem]">
            <Typography variant="h1">Description</Typography>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default Home;
