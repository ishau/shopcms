import React,{useContext} from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../views/dashboard";

import Systemprops from '../views/config/systemprops'
import Users from '../views/config/users'
import Userprofile from '../views/config/userprofile'
import { renderRoutes } from "react-router-config";

import { AppContext } from "../contexts/AppContext";
import Newproduct from '../views/products/newproduct'
import Productlsit from '../views/products/productlist'

/**
 * make array off it ......
 */
export default function Router() {
  const { state: appState, dispatch } = useContext(AppContext);

  console.log(appState.user);

  return (
    <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/productlist" exact component={Productlsit} />
        <Route path="/newproduct/:id?" exact component={Newproduct} />
        <Route path="/users" exact component={Users} />
        <Route path="/system" exact component={Systemprops} />
        <Route path="/userprofile" exact component={Userprofile} />
    </Switch>
  );
}
