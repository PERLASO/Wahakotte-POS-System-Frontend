import { get,post,put,deleteApi } from '../adapters/ApiServices';

export const setInvoice = async function (data) {
    console.log(data);
    return await post(`api/Invoice/create-invoice`,data);
  }

  export const getInvoiceList = async function (dayfilter) {
    return await get(`api/Invoice/GetAll/${dayfilter}`);
}


export const getInvoice = async function (data) {
  return await get(`api/Invoice/${data}`);
};
 

export const getInvoiceByCustomer = async function (data,dayfilter) {
  return await get(`api/Invoice/GetSingleInvoiceByshortcode/${data}/${dayfilter}`);
}

export const getInvoiceByDate = async function (data) {
  return await get(`api/Invoice/GetSingleInvoiceByCreatedDate/${data}`);
}


