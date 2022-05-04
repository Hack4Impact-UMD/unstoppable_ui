import Box from "@material-ui/core/Box";
import { Container } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import React from "react";
import SignIn2 from "../components/LogIn/SignIn2";
import { makeStyles } from "@material-ui/core/styles";
import {Redirect} from 'react-router-dom';
import {useDataStore} from "../UserContext";


function Copyright() {
  return (
    <p variant="body2" style={{ color: "#FFFFFF" }} align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://2Unstoppable.org/">
        2Unstoppable
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </p>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundColor: "transparent"
  },
  paper: {
    margin: theme.spacing(5, 4),
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const storedData = localStorage.getItem("userStore");
  const store = useDataStore();

  if (!(!storedData && ((store && !store.isLoggedIn)))) {
    return <Redirect to="/home" />
  }

  return (
    <Container maxWidth="xl" className={classes.image}>
      {/* <CssBaseline /> */}
      <div
        style={{
          paddingTop: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <SignIn2 />
      </div>

      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
