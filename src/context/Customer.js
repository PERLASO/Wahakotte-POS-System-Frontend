import { get } from '../adapters/ApiServices';

export const getProductList = async function () {
    return await get(`Product/GetAll`);
}