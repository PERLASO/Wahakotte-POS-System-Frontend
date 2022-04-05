import { get,post,put,deleteApi } from '../adapters/ApiServices';

export const getAllCustomers = async function () {
    return await get(`Customer/GetAll`);
}

export const getCustomer = async function (data) {
 
    return await get(`Customer/${data}`);
};