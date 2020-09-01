import { postServiceData } from "../utils/httprequest";

export const setData = (param = {}, token = "") => {
  param.loading(true);
  let posturl = param.method;
  let getdataString = { param: param.values };
  postServiceData(posturl, getdataString, token).then((response) => {
    param.loading(false);
    param.msgBar(true);
    param.setData(response);
  });
};

export const getData = (param = {}, token = "") => {
  param.loading(true);
  let posturl = param.method;
  let getdataString = { param: param.values };
  postServiceData(posturl, getdataString, token).then((response) => {
    if (param.setDispatch === true) {
      param.loading(false);
      if (response && response.error === false) {
        param.setData();
        param.dispatch({
          type: param.type,
          payload: response,
        });
      } else {
        param.setData(response);
      }
      // param.loading(false);
      // param.dispatch({
      //   type: "SHOW_SNACKBAR",
      //   payload: response,
      // });
    } else {
      param.loading(false);
      param.setData(response);
    }
  });
};
