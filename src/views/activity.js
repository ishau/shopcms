import React, { useState, useContext, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { AppContext } from "../contexts/AppContext";
import { getData, setData } from "../actions/appactions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Activityplatform from "./activity.platform";
import PostAddIcon from "@material-ui/icons/PostAdd";
import IconButton from "@material-ui/core/IconButton";
import UseModle from "../utils/useModal";
import { set } from "date-fns";
import Chip from "@material-ui/core/Chip";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
import LinearProgress from "@material-ui/core/LinearProgress";
import { colors } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import WarningIcon from "@material-ui/icons/Warning";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Platformlogs from "./platformlogs";
import DehazeIcon from '@material-ui/icons/Dehaze';
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

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export default function Activity(props) {
  const classes = useStyles();
  const { state: appState } = useContext(AppContext);
  const [loading, setLoading] = useState();
  const [actionLoading, setActionLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [action, setAction] = useState({});
  const [snackbar, setSnackbar] = useState(false);
  const {isShowing, toggle } = UseModle(null);
  const [activity, setActivity] = useState();
  const [confirm, setConfirm] = useState(false);
  const [confirmActivity, setConfirmActivity] = useState(false);
  const [platform, setPlatform] = useState();
  const [saveAction, setSaveAction] = useState();


  const removeItem = (v) => {
    setPlatform(v);
    setConfirm(true);
  };

  const removeConfirmActivity = (v) => {
    setPlatform(v);
    setConfirmActivity(true);
  };

  const handleClose = () => {
    setConfirm(false);
    setConfirmActivity(false);
  };

  const editActivity = (v) => {
    props.editRecord(v);
  };

  const removeActivity = () => {
    setConfirmActivity(false);
    let param = {
      loading: setActionLoading,
      setData: setSaveAction,
      method: "removeactivity",
      values: { id: platform },
      msgBar: setSnackbar,
    };
    setData(param, appState.token);
  };
  const removePlatform = () => {
    setConfirm(false);
    let param = {
      loading: setActionLoading,
      setData: setSaveAction,
      method: "removeactivityplatform",
      values: { id: platform },
      msgBar: setSnackbar,
    };
    setData(param, appState.token);
  };

  useEffect(() => {
    getMarketActivities();
  }, []);

  useEffect(() => {
    if (saveAction && saveAction.success === true) {
      getMarketActivities();
    }
  }, [saveAction]);

  useEffect(() => {
    if (props.listReload === true) {
      getMarketActivities();
    }
  }, [props.listReload]);

  const reloadPage = () => {
    getMarketActivities();
  };

  const getMarketActivities = () => {
    let param = {
      loading: setLoading,
      setData: setActivities,
      method: "getmarketactivity",
      values: { id: props.market.id },
    };
    getData(param, appState.token);
  };

  const addPlatForm = (v) => {
    setActivity({
      show:'platform',
      data:v
    });
    toggle();
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  const platformlogModal = (v) => {
    setActivity({
      show:'platformLog',
      data:v
    });
    toggle();
  };
  const activityLogModal = (v) => {
    setActivity({
      show:'activityLog',
      data:v
    });
    toggle();
  };



  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
    return (
      <React.Fragment>
        <TableRow hover>
          {/*  <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
      */}
          <TableCell align="left" >
            <Tooltip title="Activity Log">
              <IconButton
                aria-label="delete"
                className={classes.margin}
                size="small"
                onClick={() =>activityLogModal(row)}
              >
                <DehazeIcon fontSize="inherit" style={{ color: "#059CDE" }} />
              </IconButton></Tooltip> <b >  {row.detail} </b>
          </TableCell>
          <TableCell align="left">
            <Tooltip title="Date From">
              <Chip
                variant="outlined"
                size="small"
                label={row.dateFromDisp}
                style={{ border: "none" }}
                icon={<CalendarTodayIcon style={{ color: "#66C2FE" }} />}
              />
            </Tooltip>
            <Tooltip title="Date To">
              <Chip
                variant="outlined"
                size="small"
                label={row.dateToDisp}
                icon={<DateRangeIcon style={{ color: "#047BAB" }} />}
                style={{ border: "none" }}
              />
            </Tooltip>
          </TableCell>
          <TableCell align="left">
            {row.platforms.length >= 1 &&
              row.platforms.map((plt, plkey) => (
                <Chip
                  key={plkey}
                  variant="outlined"
                  size="small"
                  label={plt.name}
                  onDelete={() => removeItem(plt.id)}
                  color="primary"
                  style={{ marginRight: 5 }}
                  onClick={() => {
                    platformlogModal(plt);
                  }}
                />
              ))}
          </TableCell>
          <TableCell align="left">{row.amountusd}</TableCell>
          <TableCell align="left">{row.amount}</TableCell>
          <TableCell align="right">
            <Tooltip title="New Platform">
              <IconButton
                aria-label="delete"
                className={classes.margin}
                size="small"
                onClick={() => addPlatForm(row)}
              >
                <PostAddIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete Activity">
              <IconButton
                aria-label="delete"
                className={classes.margin}
                size="small"
                onClick={() => removeConfirmActivity(row.id)}
              >
                <DeleteIcon fontSize="inherit" style={{ color: "#FB0C0C" }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit Activity">
              <IconButton
                aria-label="delete"
                className={classes.margin}
                size="small"
                onClick={() => editActivity(row)}
              >
                <EditIcon fontSize="inherit" style={{ color: "#FB0C0C" }} />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
        {/* 
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                dasdasd
              </Box>
            </Collapse>
          </TableCell>
        </TableRow> */}
      </React.Fragment>
    );
  }

  return (
    <div>
      {activity && activity.show==='platform' && (
        <Activityplatform
          open={isShowing}
          hide={toggle}
          activity={activity.data}
          reloadPage={reloadPage}
        />
      )}

      {activity && activity.show==='platformLog'  && (
        <Platformlogs
          open={isShowing}
          hide={toggle}
          refName={activity.data.name}
          refId={activity.data.id}
          refType="PLATFORM"
          reloadPage={reloadPage}
        />
      )}

      {activity && activity.show==='activityLog' && (
        <Platformlogs
          open={isShowing}
          hide={toggle}
          refName={activity.data.detail}
          refId={activity.data.id}
          refType="ACTIVITY"
          reloadPage={reloadPage}
        />
      )}


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

      <Paper>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {/* <HeaderCell width="0.5%"></HeaderCell> */}
              <HeaderCell width="20%">Activity</HeaderCell>
              <HeaderCell width="10%"> Duration </HeaderCell>
              <HeaderCell> Platform </HeaderCell>
              <HeaderCell width="10%" align="left">
                Amount (USD)
              </HeaderCell>
              <HeaderCell width="10%" align="left">
                Amount (MVR)
              </HeaderCell>
              <HeaderCell width="10%" align="right">
                ..
              </HeaderCell>
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
              {activities &&
                activities.map((row, key) => <Row key={key} row={row} />)}
            </TableBody>
          )}
        </Table>
      </Paper>

      {/* Delete confirms  */}

      <Dialog
        open={confirm}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <b> {"Remove platform from activity"} </b>
        </DialogTitle>
        <DialogContent>
          <div align="center">
            <WarningIcon style={{ fontSize: 60, color: "#FA6262 " }} />
          </div>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to continue ?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{justifyContent:'center'}}>
          <Button onClick={handleClose} variant="outlined">
            <small>
              <b> Cancel</b>
            </small>
          </Button>
          <Button
            onClick={removePlatform}
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

      <Dialog
        open={confirmActivity}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <b> {"Remove activity"} </b>
        </DialogTitle>
        <DialogContent>
          <div align="center">
            <WarningIcon style={{ fontSize: 60, color: "#FA6262 " }} />
          </div>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to continue ?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{justifyContent:'center'}}>
          <Button onClick={handleClose} variant="outlined">
            <small>
              <b> Cancel</b>
            </small>
          </Button>
          <Button
            onClick={removeActivity}
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
