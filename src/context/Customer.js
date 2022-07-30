import { get,post,put,deleteApi } from '../adapters/ApiServices';

export const getAllCustomers = async function () {
    return await get(`Customer/GetAll`);
}

export const getCustomer = async function (data) {
    return await get(`Customer/${data}`);
};
export const getNumbereOfCustomers = async function () {
    return await get(`Customer/numberOfCustomers`);
};

export const getCustomerByShortname = async function (data) {
 
    return await get(`Customer/getcustomerbysc/${data}`);
};
export const getCustomerByName = async function (data) {
 
    return await get(`Customer/getcustomerbyName/${data}`);
};

export const updateCustomer = async function(data){
    return await put(`Customer`, data);
}

export const setCustomer = async function (data){
    return await post(`Customer`, data)
}

export const deleteCustomer = async function(data){
    return await deleteApi(`Customer/${data}`)
}