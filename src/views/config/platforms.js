import React, { useState, useContext, useEffect } from "react";
import { makeStyles,withStyles } from "@material-ui/core/styles";
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
import { colors } from '@material-ui/core';
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
  tableHead:{
    backgroundColor: colors.lightBlue[500],
    color: colors.lightBlue[50],
  }
}));


const HeaderCell = withStyles((theme) => ({
    head: {
      backgroundColor: colors.lightBlue[900],
      color: theme.palette.common.white,
      fontWeight:'bold'
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

export default function Platforms() {
  const classes = useStyles();
  const { state: appState } = useContext(AppContext);
  const { register, handleSubmit, errors, np, control } = useForm();
  const [loading, setLoading] = useState();
  const [platforms, setPlatforms] = useState([]);
  const [action, setAction] = useState({});
  const [snackbar, setSnackbar] = useState(false);



  const getPlatForms = () => {
    let param = {
      loading: setLoading,
      setData: setPlatforms,
      method: "getplatforms",
      values: {},
    };
    getData(param, appState.token);
  };

  useEffect(() => {
    getPlatForms();
  }, []);

  const onSubmit = (data) => {
    console.log(appState);
    let param = {
      method: "addplatform",
      values: data,
      loading: setLoading,
      setData: setAction,
      msgBar: setSnackbar,
    };
    setData(param, appState.token);
  };

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6} style={{ marginTop: 20 }}>
              <TextField
                label="Platform Name"
                variant="outlined"
                fullWidth
                size="small"
                name="platform"
                id="platform"
                inputRef={register({ required: "Required" })}
                error={errors.platform ? true : false}
                helperText={errors.platform && errors.platform.message}
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
                >
                  Save
                </Button>
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
                <HeaderCell width="10%">Id</HeaderCell >
                <HeaderCell >Name</HeaderCell >
              </TableRow>
            </TableHead>
            <TableBody>
              {platforms &&
                platforms.map((row, key) => (
                  <TableRow key={key}>
                    <TableCell align="left">
                      <b>{row.id}</b>
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </Paper>
    </div>
  );
}
