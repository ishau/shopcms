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
import { colors, Divider } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";

import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PrintIcon from "@material-ui/icons/Print";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export default function Activities() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [markets, setMarkets] = useState([]);
  const { state: appState } = useContext(AppContext);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [saveAction, setSaveAction] = useState(false);
  const [selected, setSelected] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [platforms, setPlatforms] = useState([]);
  const [selectPlt, setSelectPlt] = React.useState("");

  const getMarketList = () => {
    let param = {
      loading: setLoading,
      setData: setMarkets,
      values: {plt: (selectPlt!=='clear') ? selectPlt : ""},
      method: "getallactivities",
    };
    getData(param, appState.token);
  };

  useEffect(() => {
    getMarketList();
    getPlatForms();
  }, []);

  useEffect(() => {
    if ((saveAction && saveAction.success === true) || selectPlt) {
      getMarketList();
    }
  }, [saveAction,selectPlt]);


  const getPlatForms = () => {
    let param = {
      loading: setLoading,
      setData: setPlatforms,
      method: "getplatforms",
      values: {},
    };
    getData(param, appState.token);
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



  const handleChange = (event) => {
    setSelectPlt(event.target.value);
  };
  
  function Row(props) {
    const { row } = props;
    console.log(props.index);
    const classes = useRowStyles();
    return (
      <React.Fragment>
        <TableRow>
          {props.index === 0 && (
            <TableCell align="left" rowSpan={props.rcnt}>
              <Button
                color="primary"
                to={"/markets/" + props.name.id}
                component={Link}
              >
                <small>
                  <b>{props.name.country} </b>
                </small>
              </Button>
            </TableCell>
          )}
          <TableCell align="left">{row.detail}</TableCell>
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
                  color="primary"
                  style={{ marginRight: 5 }}
                />
              ))}
          </TableCell>
          <TableCell align="left">{row.amountusd}</TableCell>
          <TableCell align="left">{row.amount}</TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  return (
 

      <div>

        <Paper style={{ marginBottom: 5,padding:10 }}>

            <Grid container spacing={3}>
                <Grid item xs={2} style={{paddingTop:20}}>
                <Button
                      variant="outlined"
                      color="default"
                      className={classes.button}
                      startIcon={<PrintIcon />}
                      href={
                        "http://68.183.225.239/api/print/TCPDF/pdf/plan.php?plt="+selectPlt
                      }
                      target="_blank"
                      size="small"
                      style={{marginRight:10}}
                    >
                      <small>Print </small>
                    </Button>
                </Grid>
                <Grid item xs={2}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  size="small"
                >
                  <InputLabel id="category">Platform</InputLabel>
              
                      <Select
                        name="platform"
                        labelId="platform"
                        id="platform"
                        value={selectPlt}
                        label="Platform"
                        onChange={handleChange}
                      >
                        <MenuItem value="clear">
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
                
                 
                </FormControl>
                </Grid>
            </Grid>
        </Paper>   


        {loading ? (
          <LinearProgress color="secondary" />
        ) : (
          <Paper style={{ marginBottom: 5 }}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  {/* <HeaderCell width="0.5%"></HeaderCell> */}
                  <HeaderCell width="10%">Market</HeaderCell>
                  <HeaderCell width="20%">Activity</HeaderCell>
                  <HeaderCell width="20%"> Duration </HeaderCell>
                  <HeaderCell> Platform </HeaderCell>
                  <HeaderCell width="10%" align="left">
                    Amount (USD)
                  </HeaderCell>
                  <HeaderCell width="10%" align="left">
                    Amount (MVR)
                  </HeaderCell>
                </TableRow>
              </TableHead>

              {markets &&
                markets.map((row, key) => (
                  <React.Fragment key={key}>
                    <TableBody>
                      {row.activities.length >= 1 &&
                        row.activities.map((act, index) => (
                          <Row
                            index={index}
                            key={index}
                            row={act}
                            rcnt={row.activityCnt}
                            name={row}
                          />
                        ))}
                    </TableBody>
                  </React.Fragment>
                ))}
            </Table>
          </Paper>
        )}
      </div>

  );
}
