import React from "react";
import {
  Input,
  Container,
  Paper,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Logo, Facebook } from "../components/Icons";
import { Typography, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import useMutationWrapper from "../hooks/useMutationWrapper";
import gql from "graphql-tag";
import * as Types from "../generated/graphql";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import AuthContext from "../contexts/authContext";

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}
type SignupState = {
  email: string;
  password: string;
  cpassword: string;
};
type LoginState = {
  email: string;
  password: string;
};
type censoredState = {
  signupPassword: boolean;
  signupCPassword: boolean;
  loginPassword: boolean;
};
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
      "& .MuiInput-root": {},
    },

    paper: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      textAlign: "center",
      margin: theme.spacing(5),
      "& .MuiInput-root": {
        marginTop: theme.spacing(2),
        marginBottm: theme.spacing(2),
        width: "100%",
      },
      "& .MuiFormControl-root": {
        width: "100%",
        marginBottom: theme.spacing(2),
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
    const js = d.createElement(s) as HTMLInputElement;
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
      id
    }
  }
`;
const LOGIN_FACEBOOK = gql`
  mutation continueWithFacebook($facebookId: String!) {
    continueWithFacebook(facebookId: $facebookId) {
      success
      id
    }
  }
`;

// const isLoggedIn=()=>{//checks if the user is already logged in
//   window.FB.getLoginStatus(function(response) {
//   }
// }
const CredentialsPage: React.FC = () => {
  const [signupFormData, setSignupFormData] = useState<
    Types.SignupMutationVariables
  >({
    //holds the state of the signup form
    email: "",
    password: "",
    cpassword: "",
  });
  const [loginFormData, setLoginFormData] = useState<LoginState>({
    //holds the state of the login form
    email: "",
    password: "",
  });
  const [isLoginForm, setIsLoginForm] = useState(false); //switches interface between login and signup
  const [
    signup,
    signupData,
    signupErrorWrapper,
    signupLoader,
    signupSuccessComponent,
  ] = useMutationWrapper<Types.SignupMutation, Types.SignupMutationVariables>({
    gql: SIGNUP,
    successText: "Signup Successful!",
  }); //handles signup graphql call, enables and disables the loader, handles success and error alerts
  const [
    login,
    loginData,
    loginErrorWrapper,
    loginLoader,
    loginSuccessComponent,
  ] = useMutationWrapper<Types.LoginMutation, Types.LoginMutationVariables>({
    gql: LOGIN,
    successText: "Login Successful!",
  }); //handles login graphql call, enables and disables the loader, handles success and error alerts
  const [
    continueWithFacebook,
    continueWithFacebookData,
    continueWithFacebookErrorWrapper,
    continueWithFacebookLoader,
    continueWithFacebookSuccessComponent,
  ] = useMutationWrapper<
    Types.ContinueWithFacebookMutation,
    Types.ContinueWithFacebookMutationVariables
  >({
    gql: LOGIN_FACEBOOK,
    successText: "Login Successful!",
  }); //handles login graphql call, enables and disables the loader, handles success and error alerts
  const [censored, setCensored] = useState({
    signupPassword: true,
    signupCPassword: true,
    loginPassword: true,
  });
  const { id, setId } = React.useContext(AuthContext);

  useEffect(() => {
    _initFB();
  }, []);
  useEffect(() => {
    if (loginData) {
      setId(loginData.login.id);
    }
  }, [loginData]);
  useEffect(() => {
    if (continueWithFacebookData) {
      setId(continueWithFacebookData.login.id);
    }
  }, [continueWithFacebookData]);
  const classes = useStyles();
  const loginToFb = () => {
    window.FB.login(function (response) {
      if (response.status === "connected") {
        console.log("1");
        continueWithFacebook({
          variables: { facebookId: response.authResponse.userID + "" },
        });

        continueWithFacebook(response.authResponse.userID + "");
        // Logged into your webpage and Facebook.
      } else {
        console.log("not connected", response);

        // The person is not logged into your webpage or we are unable to tell.
      }
    });
    //launches facebook login dialog
  };
  const _onSignupChange = (e): void => {
    setSignupFormData({ ...signupFormData, [e.target.name]: e.target.value });
  };
  const _onLoginChange = (e): void => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const _switchForm = (): void => {
    //switches signup and login UI and clears form data on switch
    setSignupFormData({ email: null, password: null, cpassword: null });
    setLoginFormData({ email: null, password: null });
    setIsLoginForm(!isLoginForm);
  };

  const _onSignUp = (): void => {
    signup({ variables: { ...signupFormData } });
  };
  const _onLogin = (): void => {
    login({ variables: { ...loginFormData } });
  };
  const _toggleCensored = (e): void => {
    setCensored({ ...censored, [e.target.name]: !censored[e.target.name] });
  };
  return (
    <div className={classes.wrapper}>
      {signupErrorWrapper.errorComponent}
      {signupSuccessComponent}
      {loginErrorWrapper.errorComponent}
      {loginSuccessComponent}
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
            <form className={classes.form} key={0}>
              <FormControl>
                <Input
                  name="email"
                  placeholder="Email"
                  value={loginFormData.email}
                  onChange={_onLoginChange}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="login-password">Password</InputLabel>
                <Input
                  id="login-password"
                  type={censored.loginPassword ? "password" : "text"}
                  name="password"
                  value={loginFormData.password}
                  onChange={_onLoginChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        name="signupPassword"
                        onClick={_toggleCensored}
                      >
                        {censored.signupPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Button variant="contained" color="primary" onClick={_onLogin}>
                {loginLoader} Login
              </Button>
            </form>
          ) : (
            <form className={classes.form} key={1}>
              <FormControl>
                <InputLabel htmlFor="signup-email">Email</InputLabel>
                <Input
                  id="signup-email"
                  name="email"
                  value={signupFormData.email}
                  onChange={_onSignupChange}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="signup-password">Password</InputLabel>
                <Input
                  id="signup-password"
                  type={censored.signupPassword ? "password" : "text"}
                  name="password"
                  value={signupFormData.password}
                  onChange={_onSignupChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        name="signupPassword"
                        aria-label="toggle password visibility"
                        onClick={_toggleCensored}
                      >
                        {censored.signupPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="signup-password">
                  Confirm Password
                </InputLabel>

                <Input
                  type={censored.signupCPassword ? "password" : "text"}
                  name="cpassword"
                  value={signupFormData.cpassword}
                  onChange={_onSignupChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        name="signupCPassword"
                        aria-label="toggle password visibility"
                        onClick={_toggleCensored}
                      >
                        {censored.signupCPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
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
