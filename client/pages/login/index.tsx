import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../typings/types";
import { AppContext } from "../contexts/AppContext";
import Layout from "../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  const { updateData, accessToken, ...data } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });

  const router = useRouter();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const url = `${apiBaseUrl}/login`;

  const SignIn = async () => {
    const isValid = user.email.length > 0 && user.password.length > 0;
    if (!isValid) return setOpen(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // console.log("user success : ", await response.json());
        const { accessToken } = await response.json();

        // const token = localStorage.setItem("accessToken", accessToken);
        updateData({ ...data, accessToken });
      } else {
        setOpen(true);
      }
    } catch (err) {
      console.log("Error here: ", err);
    }
  };

  useEffect(() => {
    if (accessToken) {
      router.push("/");
    }
  }, [accessToken]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Please enter email and password"
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 400,
          minWidth: 400,
          mt: 5,
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          sx={{ mb: 2, outline: "none" }}
          onChange={(evt) => setUser({ ...user, email: evt.target.value })}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          sx={{ mb: 2 }}
          onChange={(evt) => setUser({ ...user, password: evt.target.value })}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            mt: 5,
          }}
        >
          <Button variant="outlined" onClick={SignIn}>
            Log in
          </Button>
          <Link href={"/register"}>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Register
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
