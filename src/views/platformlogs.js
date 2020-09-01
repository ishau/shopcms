import React, { useState, useContext, useEffect } from "react";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import { useForm, Controller } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import SaveIcon from "@material-ui/icons/Save";
import { AppContext } from "../contexts/AppContext";
import { getData, setData } from "../actions/appactions";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { colors } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  container: {
    marginTop: theme.spacing(3),
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

export default function Platformlogs(props) {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    errors,
    np,
    control,
    setValue,
    reset,
  } = useForm();
  const [save, saveData] = useState();
  const [loading, setLoading] = useState(false);
  const { state: appState } = useContext(AppContext);
  const [snackbar, setSnackbar] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [logList, setLogList] = useState([]);

  const onSubmit = (data) => {
    data.id = props.refId;
    data.type = props.refType;
    let param = {
      method: "saveLog",
      values: data,
      loading: setSaveLoading,
      setData: saveData,
      msgBar: setSnackbar,
    };
    setData(param, appState.token);
  };

  const getloglist = () => {
    let param = {
      method: "getlogs",
      values: { reftype: props.refId, atype: props.refType },
      loading: setLoading,
      setData: setLogList,
    };
    getData(param, appState.token);
  };

  useEffect(() => {
        getloglist();
  }, [props.refId]);

  useEffect(() => {
    if (save && save.success === true) {
      getloglist();
      reset();
    }
  }, [save]);

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  return (
    <div>
      {save && save.success === false && (
        <>
          <Snackbar
            open={snackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleCloseSnackbar} severity="error">
              {save.message}
            </Alert>
          </Snackbar>
        </>
      )}
      {save && save.success === true && (
        <>
          <Snackbar
            open={snackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleCloseSnackbar} severity="success">
              {save.message}
            </Alert>
          </Snackbar>
        </>
      )}

      <Dialog
        open={props.open}
        onClose={props.hide}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">
          <b> Platform log, {props.refName} </b>
          <IconButton
            aria-label="close"
            onClick={props.hide}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} style={{ marginBottom: 20 }}>
              <Grid item xs={12}>
                <TextField
                  label="Detail"
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="detail"
                  id="detail"
                  inputRef={register({ required: "Required" })}
                  error={errors.detail ? true : false}
                  helperText={errors.detail && errors.detail.message}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  as={
                    <KeyboardDatePicker
                      disablePast={false}
                      style={{ marginTop: 7, marginBottom: 7, marginRight: 10 }}
                      inputVariant="outlined"
                      size="small"
                      variant="inline"
                      format="dd/MM/yyyy"
                      id="eventdate"
                      name="eventdate"
                      label="Event Date"
                      onChange={() => {}}
                      value={() => {}}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      autoOk
                      fullWidth
                      inputRef={register({ eventdate: "Required" })}
                      error={errors.eventdate ? true : false}
                      helperText={errors.eventdate && errors.eventdate.message}
                    />
                  }
                  name="eventdate"
                  defaultValue={null}
                  control={control}
                  rules={{ required: "Select date" }}
                />
              </Grid>
              <Grid item xs={6} style={{ marginTop: 12 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  type="submit"
                  disabled={saveLoading}
                >
                  Save
                  {saveLoading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>

          <Divider />

          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <HeaderCell width="20%">Event Date</HeaderCell>
                <HeaderCell align="left">Detail</HeaderCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6}>
                    <LinearProgress color="secondary" />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {logList &&
                  logList.map((row, key) => (
                    <TableRow key={key} hover>
                      <TableCell align="left">
                        <b>{row.eventdate}</b>
                      </TableCell>
                      <TableCell align="left">{row.detail}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            )}
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
}
