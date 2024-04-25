export const environment = {
  production: true,
  apiUrl: 'https://localhost:5001/api/',
  productsPath: 'products/',
  basketPath: 'basket/',
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
  maxItemQuantity: 999,
  taxRate: 0.05
};
