import { useFileHandler } from "6pp";
import { CameraAltOutlined as CameraIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponent";
import { server } from "../constants/config";
import { userExists } from "../redux/reducres/auth";

const Login = () => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const avatar = useFileHandler("single");

  const handleLogin = async (e) => {
    e.preventDefault();

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username,
          password,
        },
        config
      );

      dispatch(userExists(data.user));

      toast.success(data.message, {});
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("avatar", avatar.file);
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("username", username);
    formData.append("password", password);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));

      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    } finally {
    }
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
        <Paper
          elevation={5}
          variant="elevation"
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.3)",
            backgroundColor: "transparent",
            color: "white",
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">LOGIN TO CHATTERLY</Typography>
              <form
                style={{
                  width: "100%",
                  // marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  sx={{
                    input: { color: "white" }, // Change text color inside input
                    "& .MuiInputLabel-root": { color: "#f9d423" }, // Change label color
                    "& .MuiInputLabel-root.Mui-focused": { color: "#f9d423" }, // Label when clicked
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" }, // Default border
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      }, // Hover border
                      "&.Mui-focused fieldset": { borderColor: "#f9d423" }, // Focus border
                    },
                  }}
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                  sx={{
                    input: { color: "white" }, // Change text color inside input
                    "& .MuiInputLabel-root": { color: "#f9d423" }, // Change label color
                    "& .MuiInputLabel-root.Mui-focused": { color: "#f9d423" }, // Label when clicked
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" }, // Default border
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      }, // Hover border
                      "&.Mui-focused fieldset": { borderColor: "#f9d423" }, // Focus border
                    },
                  }}
                  required
                  fullWidth
                  type="password"
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                    padding: ".5rem",
                    fontWeight: "900",
                    fontSize: "1rem",
                  }}
                  fullWidth
                  variant="outlined"
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
                  variant="outlined"
                  color="info"
                  type="submit"
                  onClick={() => {
                    setUsername("guestuser1");
                    setPassword("guestuser1");
                  }}
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
                  color="info"
                  onClick={toggleLogin}
                >
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">SIGNUP TO CHATTERLY</Typography>
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
                      color: "#f9d423",
                      bgcolor: "rgba(92, 90, 90, 0.5)",
                      ":hover": {
                        bgcolor: "rgba(65, 63, 63, 0.7)",
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
                  sx={{
                    input: { color: "white" }, // Change text color inside input
                    "& .MuiInputLabel-root": { color: "#f9d423" }, // Change label color
                    "& .MuiInputLabel-root.Mui-focused": { color: "#f9d423" }, // Label when clicked
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" }, // Default border
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      }, // Hover border
                      "&.Mui-focused fieldset": { borderColor: "#f9d423" }, // Focus border
                    },
                  }}
                  required
                  fullWidth
                  label="Name"
                  margin="dense"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  sx={{
                    input: { color: "white" }, // Change text color inside input
                    "& .MuiInputLabel-root": { color: "#f9d423" }, // Change label color
                    "& .MuiInputLabel-root.Mui-focused": { color: "#f9d423" }, // Label when clicked
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" }, // Default border
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      }, // Hover border
                      "&.Mui-focused fieldset": { borderColor: "#f9d423" }, // Focus border
                    },
                  }}
                  required
                  fullWidth
                  label="Username"
                  margin="dense"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                {/* {username.error && username.value && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )} */}

                <TextField
                  sx={{
                    input: { color: "white" }, // Change text color inside input
                    "& .MuiInputLabel-root": { color: "#f9d423" }, // Change label color
                    "& .MuiInputLabel-root.Mui-focused": { color: "#f9d423" }, // Label when clicked
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" }, // Default border
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      }, // Hover border
                      "&.Mui-focused fieldset": { borderColor: "#f9d423" }, // Focus border
                    },
                  }}
                  required
                  fullWidth
                  label="Bio"
                  margin="dense"
                  variant="outlined"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />

                <TextField
                  sx={{
                    input: { color: "white" }, // Change text color inside input
                    "& .MuiInputLabel-root": { color: "#f9d423" }, // Change label color
                    "& .MuiInputLabel-root.Mui-focused": { color: "#f9d423" }, // Label when clicked
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" }, // Default border
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      }, // Hover border
                      "&.Mui-focused fieldset": { borderColor: "#f9d423" }, // Focus border
                    },
                  }}
                  required
                  fullWidth
                  type="password"
                  label="Password"
                  margin="dense"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  sx={{
                    marginTop: ".5rem",
                    padding: ".5rem",
                    fontWeight: "900",
                    fontSize: "1rem",
                  }}
                  fullWidth
                  variant="outlined"
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
