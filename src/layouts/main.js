import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Router from "./Router";
import { NavLink } from "react-router-dom";
import menuList from "./menu";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import "./main.module.css";
import CloseIcon from "@material-ui/icons/Close";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import { AppContext } from "../contexts/AppContext";
import { getData } from "../actions/appactions";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import Authenticate from "./authenticate";
import WarningIcon from "@material-ui/icons/Warning";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import LockIcon from "@material-ui/icons/Lock";
import { Link } from "react-router-dom";


const drawerWidth = 240;
const themeColor = "#00bfa5";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    /* padding: 25,
        paddingTop: 25,
        flexGrow: 1,
        overflow: 'auto', */
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("sm")]: {
      marginLeft: -drawerWidth,
    },
  },

  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
  logo: {
    fontWeight: "bold",
    color: "#FFF",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Main(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const { state: appState, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const history = useHistory();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  let filterdList = [];
  if(appState.user != null){
    if(appState.user.role === "USER"){
      filterdList = menuList.filter((item, i)=>{
        return item.id === "Market" || item.id === "" ;
      })
    }
    if(appState.user.role === "ADMIN"){
      filterdList = menuList.filter((item, i)=>{
        return item.id != "Config";
      })
    }
    if(appState.user.role === "SYSTEM"){
      filterdList = menuList.filter((item, i)=>{
        return menuList;
      })
    }
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogoutClose = () => {
    setConfirmLogout(false);
  };

  const doLogout = () => {
    props.logout();
  };

  const isAuth = () => {
    let params = {
      type: "USER",
      method: "isAuth",
      loading: setLoading,
      dispatch: dispatch,
      setData: setUserData,
      setDispatch: true,
    };
    getData(params, appState.token);
  };

  

  useEffect(() => {
    isAuth();
  }, []);

  const reloadwindow = () => {};

  useEffect(() => {
    if (userData && userData.error === true) {
      props.logout();
    }
  }, [userData]);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>

        <div align="center" style={{ marginTop: 20,marginBottom: 20  }}>
          
          {appState.user && appState.user.name && 
              <Typography variant="h6"  display="block" gutterBottom   to="/userprofile"
              component={Link}>
                <b> {appState.user.name}  </b>
              </Typography>
          }
         
        </div>
       
        {filterdList.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem>
              <ListItemText>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, path }) => (
              <NavLink to={path} key={childId} activeClassName={classes.active}>
                <ListItem button>
                  <ListItemIcon className={classes.itemIcon}>
                    <b>{icon} </b>
                  </ListItemIcon>
                  <ListItemText>
                    <b> {childId} </b>
                  </ListItemText>
                </ListItem>
              </NavLink>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}

        <div align="center" style={{ marginTop: 20 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setConfirmLogout(true);
            }}
            startIcon={<LockIcon />}
          >
            <small>
              <b>Sign out</b>
            </small>
          </Button>
        </div>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      {appState && appState.user ? (
        <>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>

              <Hidden xsDown implementation="css">
                {open === true ? (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerClose}
                    edge="start"
                    className={clsx(
                      classes.menuButtonFull,
                      open && classes.hide
                    )}
                  >
                    <ArrowBackIos />
                  </IconButton>
                ) : (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(
                      classes.menuButtonFull,
                      open && classes.hide
                    )}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
              </Hidden>
              <Typography variant="h6" noWrap className={classes.logo}>
                CMS - Content management 
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                <IconButton
                  onClick={handleDrawerToggle}
                  className={classes.closeMenuButton}
                >
                  <CloseIcon />
                </IconButton>

                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="persistent"
                anchor="left"
                open={open}
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.toolbar} />
            <Router />
          </main>
        </>
      ) : (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <Dialog
        open={confirmLogout}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleLogoutClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <b> {"Log out"} </b>
        </DialogTitle>
        <DialogContent>
          <div align="center">
            <LockIcon style={{ fontSize: 60, color: "#FA6262 " }} />
          </div>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to continue ?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{justifyContent:'center'}}>
          <Button onClick={handleLogoutClose} variant="outlined">
            <small>
              <b> NO</b>
            </small>
          </Button>
          <Button
            onClick={doLogout}
            color="primary"
            variant="outlined"
            style={{ color: "#FA6262 " }}
          >
            <small>
              <b> Yes </b>
            </small>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Main.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Main;
