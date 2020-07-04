import {
  TextField,
  Container,
  Paper,
  createGenerateClassName,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Logo, Facebook } from "../components/Icons";
import { Typography, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useApolloClient, useMutation } from "@apollo/react-hooks";

import * as Types from "../src/generated/graphql";

import classes from "*.module.css";
// import theme from "../hooks/theme";
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},

    wrapper: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
    },
    form: {
      marginTop: theme.spacing(3),
      "& .MuiTextField-root": {},
    },

    paper: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      textAlign: "center",
      margin: theme.spacing(5),
      "& .MuiTextField-root": {
        marginTop: theme.spacing(2),
        marginBottm: theme.spacing(2),
        width: "100%",
      },
      "& .MuiButton-root": {
        marginTop: theme.spacing(2),
        marginBottm: theme.spacing(2),
        width: "100%",
        height: "56px",
        textTransform: "none",
        color: "white",
      },
      "& .fbLogin": {
        background: "#3B5998",
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
      },
    },
    logo: {
      maxWidth: "300px",
      width: "30%",
      height: "auto",
      margin: "auto",
      marginBottom: theme.spacing(2),
    },
  })
);
// const theme = theme();
const _initFB = () => {
  //initialize facebook sdk
  window.fbAsyncInit = () => {
    window.FB.init({
      appId: "166017921403938",
      cookie: true,
      xfbml: true,
      version: "v6.0",
    });
    window.FB.AppEvents.logPageView();
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};

const SIGNUP = gql`
  query signup($email: String, $password: String, $cpassword: string) {
    registerUser(email: $email, passowrd: $password, cpassword: $cpassword) {
      success
      message
    }
  }
`;
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
const loginToFb = () => {
  window.FB.login(function (response) {
    if (response.status === "connected") {
      console.log("connected");
      // Logged into your webpage and Facebook.
    } else {
      console.log("not connected");
      // The person is not logged into your webpage or we are unable to tell.
    }
  });
  //launches facebook login dialog
};
// const isLoggedIn=()=>{//checks if the user is already logged in
//   window.FB.getLoginStatus(function(response) {
//   }
// }
export default function SignUp() {
  useEffect(() => {
    _initFB();
  }, []);
  const [login, { data }] = useMutation<Types.login, Types.loginVariables>(
    LOGIN_USER
  );

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container className={classes.root} maxWidth="sm">
        <Paper elevation={3} className={classes.paper}>
          <Logo className={classes.logo} />
          <Typography variant="subtitle2">
            Join a community of avid readers to exchange and trade books
          </Typography>
          <div>
            <Button
              onClick={loginToFb}
              variant="contained"
              className="fbLogin"
              startIcon={<Facebook width="24px" height="24px" fill="white" />}
            >
              Continue with Facebook
            </Button>
          </div>
          <Typography variant="subtitle2">OR</Typography>
          <form className={classes.form}>
            <div>
              <TextField id="email" label="Email" variant="outlined" />
            </div>
            <div>
              <TextField id="password" label="Password" variant="outlined" />
            </div>
            <div>
              <TextField
                id="confirm-password"
                label="Confirm Password"
                variant="outlined"
              />
            </div>
            <Button variant="contained" color="primary">
              Sign Up
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
