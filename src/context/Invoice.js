import { get,post,put,deleteApi } from '../adapters/ApiServices';

export const setInvoice = async function (data) {
    console.log(data);
    return await post(`api/Invoice/create-invoice`,data);
  }

  export const getInvoiceList = async function () {
    return await get(`api/Invoice/GetAll`);
}

