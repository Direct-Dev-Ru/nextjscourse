export const mw1 = (storeAPI) => (next) => (action) => {
  console.log('fire middleware 1');
  const actionType = (action?.type ?? 'UNDEFINED').toUpperCase();
  return next({ ...action, type: actionType });
};

export const mw2 = (storeAPI) => (next) => (action) => {
  console.log('fire middleware 2');
  const currentCounter = storeAPI.getState()?.counter?.counter ?? 0;
  const actionType = action?.type ?? 'UNDEFINED';
  
  if ((currentCounter === 0 && actionType === 'DEC') || (currentCounter < 5 && actionType === 'SUB')) {
    console.log('less then needed');
    return next({ ...action, type: 'UNDEFINED' });
  }
  return next(action);
};
