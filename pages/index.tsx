import { TextField, Container, Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Logo, Facebook } from "../components/Icons";
import { Typography, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import classes from "*.module.css";
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    fbLogin: {
      background: "#3B5998",
    },
    wrapper: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
    },
    form: {
      marginTop: theme.spacing(5),
      "& .MuiTextField-root": {},
    },

    paper: {
      paddingTop: "50px",
      paddingBottom: "50px",
      textAlign: "center",
      margin: theme.spacing(5),
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "80%",
      },
      "& .MuiButton-root": {
        margin: theme.spacing(1),
        width: "80%",
        height: "56px",
        textTransform: "none",
        color: "white",
      },
    },
    logo: {
      maxWidth: "300px",
      width: "30%",
      height: "auto",
      margin: "auto",
      marginBottom: theme.spacing(5),
    },
  })
);
const _initFB = () => {
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

export default function SignUp() {
  useEffect(() => {
    _initFB();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container className={classes.root} maxWidth="sm">
        <Paper elevation={3} className={classes.paper}>
          <Logo className={classes.logo} />
          <Typography variant="h3">Sign Up</Typography>
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
              Submit
            </Button>
          </form>
        </Paper>
        <Paper elevation={3} className={classes.paper}>
          <Button
            color="primary"
            variant="contained"
            className={classes.fbLogin}
            startIcon={<Facebook width="24px" height="24px" fill="white" />}
          >
            Continue with Facebook
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
