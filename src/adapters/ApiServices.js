import axios from 'axios';
import { env_var } from './env';
import { getFormDataHeader, getHeaderInfo } from './TokenCreater';
import { getAccessToken, removeTokens, setTokens } from './LocalStorage';

const handleResponse = (response) => {

    if (response.data.status === 401) {
        removeTokens();
        // history.push('/v1');
        // window.location.reload();
    }
    if (response.data.status !== 'OK') {
        //window.location.reload();
        return response.data;
    }
    return response;
}

export const post = async function (url, body) {
    let header = await getHeaderInfo();
    try {
       // let resp = await axios.post("https://localhost:44341/" + url, body, header);
        let resp = await axios.post("https://wahakotte-pos-backend.azurewebsites.net/" + url, body, header);
        return handleResponse(resp);
    } catch (err) {
        return handleResponse(err.response)
    }
};




export const loginpost = async function (url, body) {

    try {
        let resp = await axios.post("https://wahakotte-pos-backend.azurewebsites.net/" +url, body);
        setTokens(resp.data);
        return handleResponse(resp);
    } catch (err) {
        return handleResponse(err.response)
    }
};



export const get = async function (url, params = {}) {
    
    let header = await getHeaderInfo();
    try {
        let resp = await axios.get( 'https://wahakotte-pos-backend.azurewebsites.net/' +url, { ...header });
        
        return handleResponse(resp);
    } catch (err) {
      console.log("not get")
    }
};

export const put = async function (url,body) {
    let header = await getHeaderInfo();

    try {
        let resp = await axios.put('https://wahakotte-pos-backend.azurewebsites.net/'+ url, body, header);

        return handleResponse(resp);
    } catch (err) {
        throw handleResponse(err.response)
    }
};

export const deleteApi = async function (url,params = {}) {
    let header = await getHeaderInfo();

    try {
        let resp = await axios.delete('https://wahakotte-pos-backend.azurewebsites.net/' + url, header);

        return handleResponse(resp);
    } catch (err) {
        throw handleResponse(err.response)
    }
};

export const postImage = async function (url, body) {

    let header = await getFormDataHeader();
    var formData = new FormData();
    formData.append('file', body);
    try {
        let resp = await axios.put('https://wahakotte-pos-backend.azurewebsites.net/' + url, formData, header);
        return handleResponse(resp);
    } catch (err) {
        throw handleResponse(err.response)
    }

};