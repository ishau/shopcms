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

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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

export default function Activityplatform(props) {
  console.log(props);
  const classes = useStyles();
  const { register, handleSubmit, errors, np, control } = useForm();
  const [save, saveData] = useState();
  const [loading, setLoading] = useState(false);
  const [ActionLoading, setActionLoading] = useState(false);
  const { state: appState } = useContext(AppContext);
  const [snackbar, setSnackbar] = useState(false);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    getPlatForms();
  }, [props.activity]);

  useEffect(() => {
    if (save && save.success === true) {
      props.reloadPage();
      props.hide();
    }
  }, [save]);

  const getPlatForms = () => {
    let param = {
      loading: setLoading,
      setData: setPlatforms,
      method: "getplatforms",
      values: {},
    };
    getData(param, appState.token);
  };

  const onSubmit = (data) => {
    data.activityid = props.activity.id;
    let param = {
      method: "addactivityplatform",
      values: data,
      loading: setActionLoading,
      setData: saveData,
      msgBar: setSnackbar,
    };
    setData(param, appState.token);
  };

  const [selectPlt, setSelectPlt] = React.useState("");
  const handleChange = (event) => {
    setSelectPlt(event.target.value);
  };
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
          <b> Set platform to {props.activity.detail} </b>
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
                <FormControl
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={errors.platform ? true : false}
                >
                  <InputLabel id="category">Platform</InputLabel>
                  <Controller
                    as={
                      <Select
                        name="platform"
                        labelId="platform"
                        id="platform"
                        value={selectPlt}
                        label="Platform"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {platforms &&
                          platforms.length >= 1 &&
                          platforms.map((pl, pkey) => (
                            <MenuItem value={pl.id} key={pkey}>
                              {pl.name}
                            </MenuItem>
                          ))}
                      </Select>
                    }
                    name="platform"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Select Platform" }}
                  />
                  {errors.platform && (
                    <FormHelperText>{errors.platform.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

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
                    disabled={ActionLoading}
                  >
                    Save
                    {ActionLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
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
