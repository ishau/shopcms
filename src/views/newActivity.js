import React, { useState, useContext, useEffect } from "react";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
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
import CircularProgress from '@material-ui/core/CircularProgress';


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

export default function Newactivity(props) {
  console.log(props);
  const classes = useStyles();
  const { register, handleSubmit, errors, np, control, setValue } = useForm();
  const [save, saveData] = useState();
  const [loading, setLoading] = useState(false);
  const { state: appState } = useContext(AppContext);
  const [snackbar, setSnackbar] = useState(false);

  const onSubmit = (data) => {
    data.marketid = props.market.id;
    if (props.activity != "") {
      data.id = props.activity.id;
    }
    let param = {
      method: "addactivity",
      values: data,
      loading: setLoading,
      setData: saveData,
      msgBar: setSnackbar,
    };
    setData(param, appState.token);
  };

  useEffect(() => {
    console.log(props.activity);
    setValue("detail", props.detail);
  }, [props.activity]);


  useEffect(() => {
    if (save &&  save.success===true){
        props.setReload(true)
        props.hide()
    }
  },[save]);


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
          <b> New Activity - {props.market.country} </b>
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
                  defaultValue={props.activity ? props.activity.detail : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Budget (MVR)"
                  variant="outlined"
                  type="number"
                  fullWidth
                  size="small"
                  name="amount"
                  id="amount"
                  inputRef={register({ required: "Required" })}
                  error={errors.amount ? true : false}
                  helperText={errors.amount && errors.amount.message}
                  inputProps={{ min: "0", step: ".01" }}
                  defaultValue={
                    (props.activity && props.activity.budget) ? parseFloat(props.activity.budget) : null
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  as={
                    <KeyboardDatePicker
                      disablePast={true}
                      style={{ marginTop: 7, marginBottom: 7, marginRight: 10 }}
                      inputVariant="outlined"
                      size="small"
                      variant="inline"
                      format="dd/MM/yyyy"
                      id="datefrom"
                      name="datefrom"
                      label="Date From"
                      onChange={() => {}}
                      value={() => {}}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      autoOk
                      fullWidth
                      inputRef={register({ required: "Required" })}
                      error={errors.datefrom ? true : false}
                      helperText={errors.datefrom && errors.datefrom.message}
                    />
                  }
                  name="datefrom"
                  defaultValue={props.activity && props.activity.dateFrom ? props.activity.dateFrom : null}
                  control={control}
                  rules={{ required: "Select date" }}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  as={
                    <KeyboardDatePicker
                      disablePast={true}
                      style={{ marginTop: 7, marginBottom: 7, marginRight: 10 }}
                      inputVariant="outlined"
                      size="small"
                      variant="inline"
                      format="dd/MM/yyyy"
                      id="dateto"
                      name="dateto"
                      label="Date To"
                      onChange={() => {}}
                      value={() => {}}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      autoOk
                      inputRef={register({ required: "Required" })}
                      error={errors.dateto ? true : false}
                      helperText={errors.dateto && errors.dateto.message}
                      fullWidth
                    />
                  }
                  name="dateto"
                  defaultValue={props.activity && props.activity.dateTo ? props.activity.dateTo : ""}
                  control={control}
                  rules={{ required: "Select date" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider style={{ marginBottom: 20 }} />
                <div align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    type="submit"
                    disabled={loading}
                  >
                    Save
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
