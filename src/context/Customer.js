import { get } from '../adapters/ApiServices';

export const getProductList = async function () {
    return await get(`Product/GetAll`);
}

export const getSingleProduct = async function (data) {
 
    return await get(`Product/${data}`);
};