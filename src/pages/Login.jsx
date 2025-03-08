import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CameraAltOutlined as CameraIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponent";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { usernameValidator } from "../utils/validator";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();
  const avatar = useFileHandler("single");

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleSignUp = (e) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        backgroundColor: "black",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          padding: "5px",
          minHeight: "100vh",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GradientBall />

        <Paper
          elevation={5}
          variant="elevation"
          sx={{
            backgroundColor: "rgb(237, 237, 237)",
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">LOGIN</Typography>
              <form
                style={{
                  width: "100%",
                  // marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  type="password"
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                    padding: ".5rem",
                    fontWeight: "900",
                    fontSize: "1rem",
                  }}
                  fullWidth
                  variant="contained"
                  color="secondary"
                  type="submit"
                >
                  Login
                </Button>

                <Button
                  sx={{
                    marginTop: "1rem",
                    padding: ".5rem",
                    fontWeight: "900",
                    fontSize: "1rem",
                  }}
                  fullWidth
                  variant="contained"
                  color="info"
                  type="submit"
                >
                  Guest User
                </Button>

                <Typography textAlign={"center"} m={".5rem"}>
                  OR
                </Typography>

                <Button
                  sx={{
                    padding: ".5rem",
                    fontWeight: "900",
                    fontSize: "1rem",
                  }}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={toggleLogin}
                >
                  Sign Up
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">SIGNUP</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleSignUp}
              >
                <Stack
                  alignItems={"center"}
                  position={"relative"}
                  width={"10rem"}
                  margin={"auto"}
                >
                  <Avatar
                    sx={{
                      width: "5rem",
                      height: "5rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "-.3rem",
                      right: "1.4rem",
                      color: "black",
                      bgcolor: "rgba(35, 35, 35, 0.5)",
                      ":hover": {
                        bgcolor: "rgba(108, 106, 106, 0.7)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraIcon sx={{ fontSize: "1.3rem" }} />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>

                {avatar.error && (
                  <Typography
                    m={".3rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="dense"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="dense"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                {username.error && username.value && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="dense"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  type="password"
                  label="Password"
                  margin="dense"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                {password.error && password.value && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )}

                <Button
                  sx={{
                    marginTop: ".5rem",
                    padding: ".5rem",
                    fontWeight: "900",
                    fontSize: "1rem",
                  }}
                  fullWidth
                  variant="contained"
                  color="secondary"
                  type="submit"
                >
                  Sign Up
                </Button>

                <Typography textAlign={"center"} m={".5rem"}>
                  OR
                </Typography>

                <Button
                  sx={{
                    padding: ".5rem",
                    fontWeight: "900",
                    fontSize: "1rem",
                  }}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={toggleLogin}
                >
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;

const GradientBall = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX - 300, // Center the ball on the cursor
        y: event.clientY - 300,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgb(227, 85, 224) 0%, rgba(215,52,131,0) 60%)",
        pointerEvents: "none", // Prevent blocking interactions
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.2s ease-out",
      }}
    />
  );
};
