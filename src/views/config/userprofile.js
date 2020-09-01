import React, { useState, useContext, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useForm, Controller } from "react-hook-form";
import { getData, setData } from "../../actions/appactions";
import { AppContext } from "../../contexts/AppContext";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import SaveIcon from "@material-ui/icons/Save";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { colors } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CompassCalibrationIcon from "@material-ui/icons/CompassCalibration";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from '@material-ui/core/CircularProgress';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: 10,
  },
  inputBox: {
    marginBottom: theme.spacing(1),
  },
  formControl: {
    padding: theme.spacing(1),
  },
  tableHead: {
    backgroundColor: colors.lightBlue[500],
    color: colors.lightBlue[50],
  },
}));

const HeaderCell = withStyles((theme) => ({
  head: {
    backgroundColor: colors.lightBlue[900],
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function Userprofile() {
  const classes = useStyles();
  const { state: appState } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    errors,
    np,
    control,
    setValue,
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [action, setAction] = useState({});
  const [snackbar, setSnackbar] = useState(false);
  const [userSelect, setUserSelect] = useState({});

  
  useEffect(() => {
    if (userSelect && userSelect.id) {
      setValue("name", userSelect.name);
      setValue("username", userSelect.username);
      setValue("userrole", userSelect.role);
    } else {
      reset();
    }
  }, [userSelect]);

  const selectUser = (v) => {
    setUserSelect(v);
  };

  useEffect(() => {
    if (action && action.success === true) {
      setUserSelect({});
      reset();
      localStorage.removeItem('token')
      window.location.href = '/';
    }
  }, [action]);

  const onSubmit = (data) => {
  
    data.username = appState.user.userName;
    let param = {
      method: "resetuserpassword",
      values: data,
      loading: setActionLoading,
      setData: setAction,
      msgBar: setSnackbar,
    };
    setData(param, appState.token);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };


  return (
    <div>
      {action && action.success === false && (
        <>
          <Snackbar
            open={snackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleCloseSnackbar} severity="error">
              {action.message}
            </Alert>
          </Snackbar>
        </>
      )}
      {action && action.success === true && (
        <>
          <Snackbar
            open={snackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleCloseSnackbar} severity="success">
              {action.message}
            </Alert>
          </Snackbar>
        </>
      )}

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6} style={{ marginTop: 20 }}>
                <Typography variant="h6" gutterBottom>
                <b>Name:</b> {appState.user.name}
                </Typography>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                <b>User Name:</b> {appState.user.userName}
                </Typography>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <TextField
                    label="New Password"
                    variant="outlined"
                    fullWidth
                    size="small"
                    name="password"
                    id="password"
                    inputRef={register({ required: "Required" })}
                    error={errors.password ? true : false}
                    helperText={errors.password && errors.password.message}
                    type="password"
                />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <TextField
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    size="small"
                    name="confirmpass"
                    id="confirmpass"
                    inputRef={register({ required: "Required" })}
                    error={errors.confirmpass ? true : false}
                    helperText={errors.confirmpass && errors.confirmpass.message}
                    type="password"
                />
            </Grid>
            <Grid item xs={3}></Grid>

            <Grid item xs={12}>
              <Divider className={classes.inputBox} />
              <div align="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  type="submit"
                  disabled={actionLoading}
                >
                  Change password
                  {actionLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </Button>

              </div>
            </Grid>
          </Grid>
        </Paper>
      </form>

      
    </div>
  );
}
