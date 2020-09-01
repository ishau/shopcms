import React, { useState, useContext, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getData, setData } from "../actions/appactions";
import { AppContext } from "../contexts/AppContext";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";
import { colors } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import WarningIcon from "@material-ui/icons/Warning";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Marketlist() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [markets, setMarkets] = useState([]);
  const { state: appState } = useContext(AppContext);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [saveAction, setSaveAction] = useState(false);
  const [selected, setSelected] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const getMarketList = () => {
    let param = {
      loading: setLoading,
      setData: setMarkets,
      values: {},
      method: "getmarketlist",
    };
    getData(param, appState.token);
  };

  useEffect(() => {
    getMarketList();
  },[]);

  useEffect(() => {
    if (saveAction && saveAction.success === true){
        getMarketList();
    }
  }, [saveAction]);

  const removeMarket = () => {
    let param = {
      loading: setActionLoading,
      setData: setSaveAction,
      method: "removemarket",
      values: { id: selected },
      msgBar: setSnackbar,
    };
    setData(param, appState.token);
    setConfirmRemove(false);
  };

  const handleClose = () => {
    setConfirmRemove(false);
  };

  const selectRemove = (v) => {
    setSelected(v);
    setConfirmRemove(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  return (
    <div>
      {saveAction && saveAction.success === false && (
        <>
          <Snackbar
            open={snackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleCloseSnackbar} severity="error">
              {saveAction.message}
            </Alert>
          </Snackbar>
        </>
      )}
      {saveAction && saveAction.success === true && (
        <>
          <Snackbar
            open={snackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleCloseSnackbar} severity="success">
              {saveAction.message}
            </Alert>
          </Snackbar>
        </>
      )}



      <div>
        <Paper>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <HeaderCell width="50%">Country</HeaderCell>
                <HeaderCell align="left"  width="10%">Budget (USD)</HeaderCell>
                <HeaderCell align="left"  width="10%">Budget (MVR)</HeaderCell>
                <HeaderCell align="left"  width="10%">Used (MVR) </HeaderCell>
                <HeaderCell align="left"  width="10%">Balance (MVR) </HeaderCell>

                <HeaderCell align="right">..</HeaderCell>
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
                {markets &&
                  markets.map((row, key) => (
                    <TableRow key={key} hover>
                      <TableCell align="left">
                        <b>{row.country}</b>
                      </TableCell>
                      <TableCell align="left">{row.amountusd}</TableCell>
                      <TableCell align="left">{row.amount}</TableCell>
                      <TableCell align="left">{row.usedBudgetMVR}</TableCell>
                      <TableCell align="left"> <b>{row.balanceMVR}</b> </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="inherit"
                          aria-label="Delete"
                          onClick={() => selectRemove(row.id)}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>

                        <IconButton
                          size="small"
                          color="primary"
                          aria-label="Select"
                          to={"/markets/" + row.id}
                          component={Link}
                        >
                          <ArrowForwardIosIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            )}
          </Table>
        </Paper>
      </div>

      <Dialog
        open={confirmRemove}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <b> {"Remove Market"} </b>
        </DialogTitle>
        <DialogContent>
          <div align="center">
            <WarningIcon style={{ fontSize: 60, color: "#FA6262 " }} />
          </div>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to continue ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            <small>
              <b> Cancel </b>
            </small>
          </Button>
          <Button
            onClick={removeMarket}
            color="primary"
            variant="outlined"
            style={{ color: "#FA6262 " }}
          >
            <small>
              <b> Confirm </b>
            </small>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
