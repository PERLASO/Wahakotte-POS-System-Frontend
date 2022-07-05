import { get,post,put,deleteApi } from '../adapters/ApiServices';

export const setInvoice = async function (data) {  
    return await post(`api/Invoice/create-invoice`,data);
  }

  export const getInvoiceList = async function (dayfilter) {
    return await get(`api/Invoice/GetAll/${dayfilter}`);
}


export const getInvoice = async function (data) {
  return await get(`api/Invoice/${data}`);
};
 

export const getInvoiceByCustomerCode = async function (data,dayfilter) {
  return await get(`api/Invoice/GetSingleInvoiceByshortcode/${data}/${dayfilter}`);
}
export const getInvoiceByCustomerName = async function (data,dayfilter) {
  return await get(`api/Invoice/GetSingleInvoiceByCustomerName/${data}/${dayfilter}`);
}

export const getInvoiceByDate = async function (data) {
  return await get(`api/Invoice/GetSingleInvoiceByCreatedDate/${data}`);
}


