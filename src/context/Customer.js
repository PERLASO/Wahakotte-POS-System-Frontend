import { get,post } from '../adapters/ApiServices';

export const getProductList = async function () {
    return await get(`Product/GetAll`);
}

export const getSingleProduct = async function (data) {
 
    return await get(`Product/${data}`);
};

export const setProduct = async function (data) {
    console.log(data)
    return await post(`Product`,data);
  }