import React from "react";
import { TextField, Container, Paper } from "@material-ui/core";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Logo, Facebook } from "../components/Icons";
import { Typography, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import useMutationWrapper from "../hooks/useMutationWrapper";
import gql from "graphql-tag";
import * as Types from "../generated/graphql";

// import classes from "*.module.css";
// import theme from "../hooks/theme";
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}
interface SignupState {
  email: string;
  password: string;
  cpassword: string;
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
      "& .signup-login-switch": {
        paddingTop: theme.spacing(2),
        textAlign: "right",
      },
      "& .signup-login-switch a": {
        cursor: "pointer",
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
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    const js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};

const SIGNUP = gql`
  mutation signup($email: String!, $password: String!, $cpassword: String!) {
    registerUser(email: $email, password: $password, cpassword: $cpassword) {
      success
      message
    }
  }
`;
const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
    }
  }
`;
const loginToFb = () => {
  window.FB.login(function (response) {
    if (response.status === "connected") {
      // console.log("connected");
      // Logged into your webpage and Facebook.
    } else {
      // console.log("not connected");
      // The person is not logged into your webpage or we are unable to tell.
    }
  });
  //launches facebook login dialog
};
// const isLoggedIn=()=>{//checks if the user is already logged in
//   window.FB.getLoginStatus(function(response) {
//   }
// }
const CredentialsPage: React.FC = () => {
  const [formData, setFormData] = useState<SignupState>({
    email: null,
    password: null,
    cpassword: null,
  });
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [
    signup,
    signupData,
    signupErrorWrapper,
    signupLoader,
    signupSuccessComponent,
  ] = useMutationWrapper<Types.SignupMutation, Types.SignupMutationVariables>({
    gql: SIGNUP,
    successText: "Signup Successful!",
  });

  const [
    login,
    loginData,
    loginErrorWrapper,
    loginLoader,
    loginSuccessComponent,
  ] = useMutationWrapper<Types.LoginMutation, Types.LoginMutationVariables>({
    gql: LOGIN,
    successText: "Login Successful!",
  });
  useEffect(() => {
    _initFB();
  }, []);
  const classes = useStyles();
  const _onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const _switchForm = () => {
    setFormData({ email: null, password: null, cpassword: null });
    setIsLoginForm(!isLoginForm);
  };
  const _onSignUp = () => {
    signup({ variables: { ...formData } });
  };
  return (
    <div className={classes.wrapper}>
      {signupErrorWrapper.errorComponent}
      {signupSuccessComponent}
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
          {isLoginForm ? (
            <form className={classes.form}>
              <div>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  onChange={_onChange}
                />
              </div>
              <div>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  onChange={_onChange}
                />
              </div>

              <Button variant="contained" color="primary" onClick={_onSignUp}>
                {loginLoader} Login
              </Button>
            </form>
          ) : (
            <form className={classes.form}>
              <div>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  onChange={_onChange}
                />
              </div>
              <div>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  onChange={_onChange}
                />
              </div>
              <div>
                <TextField
                  id="confirm-password"
                  name="cpassword"
                  label="Confirm Password"
                  variant="outlined"
                  onChange={_onChange}
                />
              </div>
              <Button variant="contained" color="primary" onClick={_onSignUp}>
                {signupLoader} Sign Up
              </Button>
            </form>
          )}
          <div className="signup-login-switch">
            {isLoginForm ? (
              <Typography component="a" onClick={_switchForm}>
                Not a member? Sign up.
              </Typography>
            ) : (
              <Typography component="a" onClick={_switchForm}>
                Alread a member? Login.
              </Typography>
            )}
          </div>
        </Paper>
      </Container>
    </div>
  );
};
export default CredentialsPage;
