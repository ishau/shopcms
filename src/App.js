import React from 'react';
import './App.css';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Authenticate from './layouts/authenticate';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
       <MuiPickersUtilsProvider utils={DateFnsUtils}>  
      <Authenticate />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default App;
