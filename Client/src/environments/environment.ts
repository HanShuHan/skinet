import {GlobalConfig} from "ngx-toastr/toastr/toastr-config";

export const environment = {
  production: true,
  apiUrl: 'https://localhost:5001/api/',
  productsUrl: 'products/',
  toastrConfig: {
    closeButton: true,
    preventDuplicates: true,
    countDuplicates: true,
    resetTimeoutOnDuplicate: true,
    includeTitleDuplicates: true,
    newestOnTop: true,
    disableTimeOut: true,
    easeTime: 500,
    positionClass: 'toast-bottom-right',
  }
};
