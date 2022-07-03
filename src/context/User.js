import { get,post,put,deleteApi } from '../adapters/ApiServices';

export const login = async function (data) {
    return await post(`api/User/login`,data);
  }

  export const updatePassword = async function (data) {
    
    return await put(`api/User/UpdatePassword`,data);
  }
 