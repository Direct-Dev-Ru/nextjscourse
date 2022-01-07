import {
  GET_POSTS_BY_ID_REQUEST,
  GET_POSTS_BY_ID_SUCCESS,
  GET_POSTS_BY_ID_FAIL,
  GET_POSTS_BULK_REQUEST,
  GET_POSTS_BULK_SUCCESS,
  GET_POSTS_BULK_FAIL,
} from './constants';

import { getPostByIdFunc, getPostsBulkFunc } from './actions';

const initialState = {
  byId: {
    isLoading: null,
    error: null,
    data: null,
  },
  byBulk: {
    isLoading: null,
    error: null,
    data: null,
  },
  actions: {
    getPostByIdFunc,
    getPostsBulkFunc,
  },
};

const postsReducer = (state = initialState, action) => {
  let byBulkNew;
  console.log(action);
  switch (action.type) {
    case 'TEST_POST_REDUCER_ACTION':
      console.log('TEST_POST_REDUCER_ACTION FIRED');
      return state;
    case GET_POSTS_BY_ID_REQUEST:
      return {
        ...state,
        byId: {
          isLoading: true,
          error: null,
          data: null,
        },
      };
    case GET_POSTS_BY_ID_SUCCESS:
      console.log({
        isLoading: false,
        error: false,
        data: action.payload,
      });
      return {
        ...state,
        byId: {
          isLoading: false,
          error: false,
          data: action.payload,
        },
      };
    case GET_POSTS_BY_ID_FAIL:
      console.log({
        isLoading: false,
        error: action.payload,
        data: false,
      });
      return {
        ...state,
        byId: {
          isLoading: false,
          error: action.payload,
          data: false,
        },
      };

    case GET_POSTS_BULK_REQUEST:
      return {
        ...state,
        byBulk: {
          isLoading: true,
          error: null,
          data: null,
        },
      };
    //   Успех запроса всех постов
    case GET_POSTS_BULK_SUCCESS:
      byBulkNew = {
        isLoading: false,
        error: false,
        data: action.payload,
      };
      console.log(byBulkNew);
      return {
        ...state,
        byBulk: byBulkNew,
      };
    //   Ошибка запроса всех постов
    case GET_POSTS_BULK_FAIL:
      byBulkNew = {
        isLoading: false,
        error: action.payload,
        data: false,
      };
      console.log(byBulkNew);
      return {
        ...state,
        byBulk: byBulkNew,
      };
    default:
      return state;
  }
};

export default postsReducer;
