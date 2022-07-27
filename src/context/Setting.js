import { get,post,put,deleteApi } from '../adapters/ApiServices';

export const getMeasurementList = async function () {
    return await get(`Setting/GetAll`);
}

export const setMeasurement = async function (data) {
    return await post(`Setting`,data);
  }

  export const updateMeasurement = async function (data) {
    
    return await put(`Setting`,data);
  }
  export const deleteMeasurement = async function (data) {
    
    return await deleteApi(`Setting/${data}`);
  }
