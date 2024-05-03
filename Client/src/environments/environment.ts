export const environment = {
  production: true,
  apiUrl: 'https://localhost:5001/api/',
  paths: {
    emailNotInUse: 'emailNotInUse'
  },
  productsPath: 'products/',
  basketPath: 'basket/',
  accountPath: 'account/',
  toastrConfig: {
    closeButton: true,
    preventDuplicates: true,
    countDuplicates: true,
    resetTimeoutOnDuplicate: true,
    includeTitleDuplicates: true,
    newestOnTop: true,
    timeout: 5000,
    extendedTimeOut: 3000,
    easeTime: 500,
    positionClass: 'toast-bottom-right'
  },
  home: 'Home',
  basketId: 'basket_id',
  token: "token",
  bearer: 'Bearer',
  passwordPattern: "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$",
  phoneNumberPattern: '^\\D?(\\d{3})\\D?\\D?(\\d{3})\\D?(\\d{4})$'
};
