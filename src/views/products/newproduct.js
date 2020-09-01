import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useForm, Controller } from "react-hook-form";
import { getData,setData } from "../../actions/appactions";
import { AppContext } from "../../contexts/AppContext";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import SaveIcon from "@material-ui/icons/Save";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
  inputBox: {
    marginBottom: theme.spacing(1),
  },
  formControl: {
    padding: theme.spacing(1),
  },
}));

export default function Newproduct() {
  const classes = useStyles();
  const { state: appState } = useContext(AppContext);
  const { register, handleSubmit, errors, np, control } = useForm();
  const [loading, setLoading] = useState();
  const [actionLoading, setActionLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [action, setAction] = useState({});
  const [snackbar,setSnackbar]=useState(false)

  const getCountries = () => {
    let param = {
      loading: setLoading,
      setData: setCountries,
      method: "getcountries",
      values: {},
    };
    getData(param, appState.token);
  };

  useEffect(() => {
    getCountries();
  }, []);


  const onSubmit = (data) => {
    console.log(appState);
    let param={
        method:"savemarket",
        values:data,
        loading:setActionLoading,
        setData:setAction,
        msgBar:setSnackbar
    }
    setData(param,appState.token)

  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  useEffect(() => {
    if (action && action.success === true){

    }
  }, [action])

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
        <Typography variant="h5" gutterBottom>
        Add / Update Products
      </Typography>
      <Divider style={{marginBottom:20}} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                variant="outlined"
                fullWidth
                size="small"
                name="amount"
                id="amount"
                inputRef={register({ required: "Required" })}
                error={errors.amount ? true : false}
                helperText={errors.amount && errors.amount.message}
                inputProps={{ min: "0", step: ".01" }}
              />
            </Grid>
           
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
              </div>
            </Grid>
          </Grid>
        </Paper>
        
      </form>
    </div>
  );
}
