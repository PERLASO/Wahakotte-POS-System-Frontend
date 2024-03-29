import { get,post,put,deleteApi } from '../adapters/ApiServices';

export const getProductList = async function () {
    return await get(`Product/GetAll`);
}

export const getSingleProduct = async function (data) {
 
    return await get(`Product/${data}`);
};
export const getNumbereOfProducts = async function () {
    return await get(`Product/GetNumberOfProducts`);
};

export const getSingleProductByShortcode = async function (data) {
 
  return await get(`Product/GetSingleProductByshortcode/${data}`);
};
export const getSingleProductByName = async function (data) {
 
  return await get(`Product/GetSingleProductByname/${data}`);
};

export const getProductsSuggesionsByShortcode = async function (data) {
 
  return await get(`Product/GetSingleProductAutoByshortcode/${data}`);
};

export const setProduct = async function (data) {
    return await post(`Product`,data);
  }

  export const updateProduct = async function (data) {
    
    return await put(`Product`,data);
  }
  export const deleteProduct = async function (data) {
    
    return await deleteApi(`Product/${data}`);
  }
