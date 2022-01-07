const initialState = {
  counter: 0,
};

const counterChangedHandler = (action, value) => {};

const counterReducer = (state = initialState, action) => {
//   console.log(state, action);
  switch (action.type) {
    case 'INC':
    //   const newState = { ...state, counter: state.counter + 1 };
    //   console.log('[inc-newstate]', newState);
      return { ...state, counter: state.counter + 1 };
      break;
    case 'DEC':
      return { ...state, counter: state.counter - 1 };
      break;
    case 'ADD':
      return { ...state, counter: state.counter + action.value };
      break;
    case 'SUB':
      return { ...state, counter: state.counter - action.value };
      break;
    default:
      return state;
  }
};

export default counterReducer;
