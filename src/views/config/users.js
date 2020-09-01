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

export default function Users() {
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

  const getUsers = () => {
    let param = {
      loading: setLoading,
      setData: setUserList,
      method: "getusers",
      values: {},
    };
    getData(param, appState.token);
  };

  useEffect(() => {
    if (userSelect && userSelect.id) {
      setValue("name", userSelect.name);
      setValue("username", userSelect.username);
      setValue("userrole", userSelect.role);
    } else {
      reset();
      setSelectRole("");
    }
  }, [userSelect]);

  const selectUser = (v) => {
    setUserSelect(v);
  };

  useEffect(() => {
    if (action && action.success === true) {
      getUsers();
      setUserSelect({});
      reset();
      setSelectRole("");
    }
  }, [action]);

  const onSubmit = (data) => {
    console.log(appState);
    if (userSelect && userSelect.id) {
      data.id = userSelect.id;
    }
    let param = {
      method: "adduser",
      values: data,
      loading: setActionLoading,
      setData: setAction,
      msgBar: setSnackbar,
    };
    setData(param, appState.token);
  };

  const [selectRole, setSelectRole] = React.useState("");
  const handleChange = (event) => {
    setSelectRole(event.target.value);
  };

  const cancelEdit = () => {
    setUserSelect({});
  };

  const resetPassword = () => {
    let param = {
      method: "resetuserpassword",
      values: { id: userSelect.id },
      loading: setActionLoading,
      setData: setAction,
      msgBar: setSnackbar,
    };
    setData(param, appState.token);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

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
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                size="small"
                name="name"
                id="name"
                inputRef={register({ required: "Required" })}
                error={errors.name ? true : false}
                helperText={errors.name && errors.name.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <TextField
                label="User Name"
                variant="outlined"
                fullWidth
                size="small"
                name="username"
                id="username"
                inputRef={register({ required: "Required" })}
                error={errors.username ? true : false}
                helperText={errors.username && errors.username.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <FormControl
                variant="outlined"
                fullWidth
                size="small"
                error={errors.userrole ? true : false}
              >
                <InputLabel id="category">User Role</InputLabel>
                <Controller
                  as={
                    <Select
                      name="userrole"
                      labelId="userrole"
                      id="userrole"
                      value={selectRole}
                      label="Platform"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="USER">USER</MenuItem>
                      <MenuItem value="ADMIN">ADMIN</MenuItem>
                      <MenuItem value="SYSTEM">SYSTEM</MenuItem>
                    </Select>
                  }
                  name="userrole"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Select user role" }}
                />
                {errors.userrole && (
                  <FormHelperText>{errors.userrole.message}</FormHelperText>
                )}
              </FormControl>
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
                  Save
                  {actionLoading && <CircularProgress size={24} className={classes.buttonProgress} />}

                </Button>

                {userSelect && userSelect.id && (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                      startIcon={<CloseIcon />}
                      type="button"
                      style={{ marginLeft: 10 }}
                      onClick={cancelEdit}
                      disabled={actionLoading}
                    >
                      Cancel Edit ({userSelect.username})
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      className={classes.button}
                      startIcon={<CompassCalibrationIcon />}
                      type="button"
                      style={{ marginLeft: 10 }}
                      onClick={resetPassword}
                      disabled={actionLoading}
                    >
                        
                      Reset Password ({userSelect.username})
                      {actionLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </Button>{" "}
                  </>
                )}
              </div>
            </Grid>
          </Grid>
        </Paper>
      </form>

      <Paper>
        <Paper>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead className={classes.tableHead}>
              <TableRow>
                <HeaderCell width="10%">Id</HeaderCell>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Role</HeaderCell>
                <HeaderCell align="right">..</HeaderCell>
              </TableRow>
            </TableHead>

            {loading ? 
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4}>
                    <LinearProgress color="secondary" />
                  </TableCell>
                </TableRow>
              </TableBody>
             : 

            <TableBody>
              {userList &&
                userList.map((row, key) => (
                  <TableRow key={key}>
                    <TableCell align="left">
                      <b>{row.id}</b>
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.role}</TableCell>
                    <HeaderCell align="right">
                      <IconButton
                        aria-label="delete"
                        className={classes.margin}
                        size="small"
                        onClick={() => selectUser(row)}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    </HeaderCell>
                  </TableRow>
                ))}
            </TableBody>
            }
          </Table>
        </Paper>
      </Paper>
    </div>
  );
}
