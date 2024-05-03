export const environment = {
  production: false,
  apiUrl: 'api/',
  paths: {
    emailNotUsed: 'emailNotUsed'
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
    disableTimeOut: true,
    easeTime: 500,
    positionClass: 'toast-bottom-right'
  },
  home: 'Home',
  basketId: 'basket_id',
  token: "token",
  bearer: 'Bearer',
  passwordPattern: '(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;\'?/&gt;.&lt;,])(?!.*\\s).*$',
  phoneNumberPattern: '^\\D?(\\d{3})\\D?\\D?(\\d{3})\\D?(\\d{4})$'
};
