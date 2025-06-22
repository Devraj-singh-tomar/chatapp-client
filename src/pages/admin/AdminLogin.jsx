import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { black } from "../../constants/color";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../redux/thunks.js/admin";

const AdminLogin = () => {
  const dispatch = useDispatch();

  const secretKey = useInputValidation("");

  const { isAdmin } = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  if (isAdmin) return <Navigate to={"/admin/dashboard"} />;

  return (
    <div
      style={{
        backgroundColor: black,
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
          <Typography variant="h5">ADMIN PANEL LOGIN</Typography>
          <form
            style={{
              width: "100%",
              // marginTop: "1rem",
            }}
            onSubmit={submitHandler}
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
              type="password"
              label="Secret Key"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
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
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
