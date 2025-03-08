import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Error as ErrorIcon } from "@mui/icons-material";

const NotFound = () => {
  return (
    <Container
      maxWidth="100%"
      sx={{
        width: "100%",
        minHeight: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle, rgba(36,36,36,1) 0%, rgba(0,0,0,1) 100%)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          background: "transparent",
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          borderRadius: "15px",
          boxShadow: "0px 4px 20px rgba(176, 26, 26, 0.3)",
        }}
      >
        <ErrorIcon sx={{ fontSize: "6rem", color: "#ff4c4c" }} />
        <Typography variant="h3" fontWeight={700} color="error">
          404
        </Typography>
        <Typography variant="h4" fontWeight={500} color="white">
          Page Not Found
        </Typography>

        <Typography variant="body1" color="gray" textAlign="center">
          The page you're looking for might have been removed or doesn't exist.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="outlined"
          color="error"
          sx={{
            color: "error",
            fontWeight: "bold",
            padding: "0.8rem 2rem",
            borderRadius: "10px",
            textTransform: "none",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          Go Back Home
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFound;
