import React, { useState, createRef, useContext, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import { AppContext } from "../../contexts/AppContext";
import { useForm, Controller } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getData } from "../../actions/appactions";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    loginPaper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 500,
      marginTop: "5vh",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {/* {"Copyright © "}
      <Link color="inherit" href="https://police.gov.mv/">
        Maldives Police Service
      </Link>{" "}
      {new Date().getFullYear()}
      {"."} */}
    </Typography>
  );
}

export default function Login() {
  const classes = useStyles();
  const [notrobot, setNotRobot] = useState(false);
  const [cap, setCap] = useState();
  const [mobileno, setmobileno] = useState();
  const { register, handleSubmit, errors, np, control } = useForm();
  const [loading, setLoading] = useState(false);
  const recaptchaRef = createRef();

  const [data, setData] = useState(false);
  const [open, setOpen] = useState(false);
  const [edata, setEdata] = useState();
  const { state: appState, dispatch } = useContext(AppContext);

  const onSubmit = (data) => {
    let param = {
      type: "USER",
      method: "dologin",
      values: data,
      loading: setLoading,
      setDispatch: true,
      dispatch: dispatch,
      setData: setData,
    };
    getData(param);
  };

  

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} variant="outlined" square={true}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.loginPaper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h3" variant="h6">
                  <b> Sign in </b>
                </Typography>
                {data && data.error === true && (
                  <Alert severity="error">{data.message}</Alert>
                )}
                <form
                  className={classes.form}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="off"
                    autoFocus
                    inputRef={register({ required: "Required" })}
                    error={errors.username ? true : false}
                    helperText={errors.username && errors.username.message}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="off"
                    autoFocus
                    inputRef={register({ required: "Required" })}
                    error={errors.username ? true : false}
                    helperText={errors.username && errors.username.message}
                    type="password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={loading}
                  >
                    {loading ? "Please Wait" : "Login"}
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </Button>
                </form>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
