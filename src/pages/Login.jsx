import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography
} from "@mui/material";
import { login } from "../../api";
import { setAccessToken, setRefreshToken } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import GoogleAuth from "../components/GoogleAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false); // New loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true when submitting

    try {
      const data = await login(username, password);
      dispatch(setAccessToken(data.data.access));
      dispatch(setRefreshToken(data.data.refresh));
      navigate("/"); // Redirect to the home page after successful login
    } catch (error) {
      console.error("Login error:", error);
    }

    setLoading(false); // Set loading state back to false after login attempt
  };

  return (
    <Container maxWidth="md" sx={{display:"flex",alignItems:'center',justifyContent:"center"}}>
      <Card sx={{ maxWidth: 400, marginTop: 5,
              boxShadow: "5px 5px 10px 10px #D4D4D4",
              minWidth:"350px"
            }}>
        <CardContent sx={{display:"flex",flexDirection:"column",alignItems:'center',}} >
          <Typography variant="h5" component="h2" gutterBottom>
            Log in to Cat AI
          </Typography>
          <Button
  // variant="contained"
  // color="primary"
  sx={{
    background: "white",
    padding: "6px 16px",
    boxShadow: "none",
    color: "black",
    '&:hover': {
      background: "lightgray",
    },
  }}
>
  
  <FontAwesomeIcon icon={faGoogle} size="lg" style={{ marginRight: "8px" }} />
  Login with Google
</Button>
<GoogleAuth/>

<Typography>Or</Typography>
          <Box
            component="form"
            sx={{
              width:"100%",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              marginTop:2
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              sx={{ marginBottom: 2, width: "100%" }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              sx={{ marginBottom: 2, width: "100%" }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
              disabled={isLoading} // Disable the button when loading
            >
              {isLoading ? "Loading..." : "Login"} {/* Display "Loading..." when loading */}
            </Button>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Don't have an account?{" "}
              <Button onClick={() => navigate("/register")}>
                Register
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
