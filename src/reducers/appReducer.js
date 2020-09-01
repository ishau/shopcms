export const appReducer = (state, action) => {
  switch (action.type) {
    case "TOKEN":
      return {
        ...state,
        token: action.payload.token,
        user:action.payload.user,
        isAuth:true
      };
      break;
  
    case "USER":
      localStorage.setItem('token',action.payload.token)
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuth:true
      };
      break;
    case "SHOW_SNACKBAR":
      return {
        ...state,
        snacks: action.payload,
      };
      break;
    default:
      return state;
  }
};
