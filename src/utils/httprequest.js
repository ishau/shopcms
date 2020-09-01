import axios from 'axios';
let cachedPostData = null;


const postServiceData = (url, params = {}, token = '') => {

    axios.defaults.baseURL = 'https://cms.aximweb.com/';
    axios.defaults.headers.common["Authorization"] = (token!=='') ? 'Bearer '+ token : '';
    axios.defaults.headers.common["Accept"] = 'application/json';
    return axios
    .post(url,
        params,
    )
    .then(response => {
        cachedPostData = response.data;
        return cachedPostData
    })
    .catch(error => {
        localStorage.removeItem('token')
        window.location.href = '/';
        return error.response.data
    })
};
export { postServiceData };

/* nYyR1o2Y2dxejFVWW9OR0FFRjlNQT09 */