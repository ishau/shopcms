import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { AppContext } from "../contexts/AppContext";
import { getData } from "../actions/appactions";
import Typography from "@material-ui/core/Typography";
import UseModle from "../utils/useModal";
import Newactivity from "./newActivity";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Activity from "./activity";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import PrintIcon from "@material-ui/icons/Print";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  inputBox: {
    marginBottom: theme.spacing(1),
  },
  formControl: {
    padding: theme.spacing(1),
  },
}));

export default function Plans(props) {
  const classes = useStyles();
  const { state: appState } = useContext(AppContext);
  const [loading, setLoading] = useState();
  const [market, setMarket] = useState([]);
  const [action, setAction] = useState({});
  const [snackbar, setSnackbar] = useState(false);
  const { isShowing, toggle } = UseModle(null);
  const [activity, setActivity] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getMarketByid();
  }, []);

  const getMarketByid = () => {
    let param = {
      loading: setLoading,
      setData: setMarket,
      method: "getmarketbyid",
      values: { id: props.match.params.id },
    };
    getData(param, appState.token);
  };

  const editRecord = (v) => {
    setActivity(v);
    setReload(false);
    toggle();
  };

  return (
    <div className={classes.root}>
      {market && (
        <>
          <Newactivity
            open={isShowing}
            hide={toggle}
            market={market}
            activity={activity}
            setReload={setReload}
          />
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={9} align="center">
                {loading ? (
                  <CircularProgress disableShrink />
                ) : (
                  <>
                    <Typography variant="h6" component="h2" gutterBottom>
                      <b>
                        {market.country} - {market.amount}{" "}
                      </b>
                      <Chip
                        label={market.balanceMVR}
                        color="secondary"
                        variant="outlined"
                        size="small"
                      />
                   
                    

                    </Typography>
                  </>
                )}
              </Grid>
              <Grid item xs={3}>
                <div align="right">

                <Button
                      variant="outlined"
                      color="default"
                      className={classes.button}
                      startIcon={<PrintIcon />}
                      href={
                        "http://68.183.225.239/api/print/TCPDF/pdf/plan.php?id=" +
                        market.enc_id
                      }
                      target="_blank"
                      size="small"
                      style={{marginRight:10}}
                    >
                      <small>Print plan</small>
                    </Button>

                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => {
                      setActivity({});
                      setReload(false);
                      toggle();
                    }}
                    startIcon={  <AddIcon />}
                  >
                   
                      <small><b>New</b></small>
                    
                  </Button>

                  
                </div>
              </Grid>
            </Grid>
          </Paper>
          {market && market.id && (
            <Activity
              market={market}
              editRecord={editRecord}
              listReload={reload}
            />
          )}
        </>
      )}
    </div>
  );
}
