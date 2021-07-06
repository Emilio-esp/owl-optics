import { encodeValue, decodeValue } from "../utils/localstorage";

export const KEY_LOCALSTORAGE = "shopping_cart_owloptics";

const LOAD_PRODUCTS_FROM_LOCALSTORAGE_START = "LOAD_PRODUCTS_FROM_LOCALSTORAGE_START";
const LOAD_PRODUCTS_FROM_LOCALSTORAGE_SUCCESS = "LOAD_PRODUCTS_FROM_LOCALSTORAGE_SUCCESS";
const LOAD_PRODUCTS_FROM_LOCALSTORAGE_ERROR = "LOAD_PRODUCTS_FROM_LOCALSTORAGE_ERROR";

const ADD_PRODUCT_TO_SHOPPINGCART_START = "ADD_PRODUCT_TO_SHOPPINGCART_START";
const ADD_PRODUCT_TO_SHOPPINGCART_SUCCESS = "ADD_PRODUCT_TO_SHOPPINGCART_SUCCESS";
const ADD_PRODUCT_TO_SHOPPINGCART_ERROR = "ADD_PRODUCT_TO_SHOPPINGCART_ERROR";

const CHANGE_QUANTITY_TO_ITEM_SHOPPINGCART = "CHANGE_QUANTITY_TO_ITEM_SHOPPINGCART";

const REMOVE_PRODUCT_TO_SHOPPINGCART_START = "REMOVE_PRODUCT_TO_SHOPPINGCART_START";
const REMOVE_PRODUCT_TO_SHOPPINGCART_SUCCESS = "REMOVE_PRODUCT_TO_SHOPPINGCART_SUCCESS";
const REMOVE_PRODUCT_TO_SHOPPINGCART_ERROR = "REMOVE_PRODUCT_TO_SHOPPINGCART_ERROR";

// const REMOVE_PRODUCT_TO_SHOPPINGCART_START = "REMOVE_PRODUCT_TO_SHOPPINGCART_START";
const ADD_PRESCRIPTION_TO_LENSES_SUCCESS = "ADD_PRESCRIPTION_TO_LENSES_SUCCESS";
// const REMOVE_PRODUCT_TO_SHOPPINGCART_ERROR = "REMOVE_PRODUCT_TO_SHOPPINGCART_ERROR";

const DELETE_SHOPPING_CART_INFORMATION = "DELETE_SHOPPING_CART_INFORMATION";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const addProductShoppingCartStart = () => ({
  type: ADD_PRODUCT_TO_SHOPPINGCART_START,
});

export const addProductShoppingCartSuccess = (payload) => ({
  type: ADD_PRODUCT_TO_SHOPPINGCART_SUCCESS,
  payload,
});

export const addProductShoppingCartError = (payload) => ({
  type: ADD_PRODUCT_TO_SHOPPINGCART_ERROR,
  payload,
});

export const changeQuantityForItemFromShoppingCart = (payload) => ({
  type: CHANGE_QUANTITY_TO_ITEM_SHOPPINGCART,
  payload,
});

export const removeItemFromShoppingCartStart = () => ({
  type: REMOVE_PRODUCT_TO_SHOPPINGCART_START,
});

export const removeItemFromShoppingCartSuccess = (payload) => ({
  type: REMOVE_PRODUCT_TO_SHOPPINGCART_SUCCESS,
  payload,
});

export const removeItemFromShoppingCartError = (payload) => ({
  type: REMOVE_PRODUCT_TO_SHOPPINGCART_ERROR,
  payload,
});

export const addPrescriptionToLensesSuccess = (payload) => ({
  type: ADD_PRESCRIPTION_TO_LENSES_SUCCESS,
  payload,
});

export const clearShoppingCartInformation = (payload) => ({
  type: DELETE_SHOPPING_CART_INFORMATION,
  payload,
});


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS_FROM_LOCALSTORAGE_START:
    case ADD_PRODUCT_TO_SHOPPINGCART_START:
    case REMOVE_PRODUCT_TO_SHOPPINGCART_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOAD_PRODUCTS_FROM_LOCALSTORAGE_SUCCESS:
    case CHANGE_QUANTITY_TO_ITEM_SHOPPINGCART:
    case ADD_PRODUCT_TO_SHOPPINGCART_SUCCESS:
    case ADD_PRESCRIPTION_TO_LENSES_SUCCESS:
    case REMOVE_PRODUCT_TO_SHOPPINGCART_SUCCESS:
      case DELETE_SHOPPING_CART_INFORMATION:  {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    }
    case LOAD_PRODUCTS_FROM_LOCALSTORAGE_ERROR:
    case ADD_PRODUCT_TO_SHOPPINGCART_ERROR:
    case REMOVE_PRODUCT_TO_SHOPPINGCART_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const addItemToShoppingCart = (item) => async (dispatch) => {

  let shoppingCartProducts;
  let dataShoppingCart;
  dispatch(addProductShoppingCartStart());

  try {
    shoppingCartProducts = window.localStorage.getItem(KEY_LOCALSTORAGE);

    if (shoppingCartProducts) {
      shoppingCartProducts = await decodeValue(shoppingCartProducts);

      dataShoppingCart = [...shoppingCartProducts, item];

    } else {
      dataShoppingCart = [item];
    }
    dispatch(addProductShoppingCartSuccess(dataShoppingCart));

    window.localStorage.setItem(
      KEY_LOCALSTORAGE,
      encodeValue(dataShoppingCart)
    );
  } catch (err) {
    dispatch(addProductShoppingCartError());
  }
};

export const loadItemsFromLocalStorage = () => async (dispatch) => {
  let shoppingCartProducts;
  dispatch(addProductShoppingCartStart());

  try {
    shoppingCartProducts = window.localStorage.getItem(KEY_LOCALSTORAGE);

    if (shoppingCartProducts) {
      shoppingCartProducts = await decodeValue(shoppingCartProducts);
      dispatch(addProductShoppingCartSuccess(shoppingCartProducts));
    }else{
      dispatch(addProductShoppingCartSuccess([]));
    }
  } catch (err) {
    dispatch(addProductShoppingCartError());
  }
};

export const removeItemFromShoppingCart = ( item ) => async (dispatch, getState) => {
  const shoppingCartProducts = getState().shoppingCart.data;
  let i;

  for (i = 0; i < shoppingCartProducts.length; i++) {
    const lense = shoppingCartProducts[i];
    if (lense.cartId === item.cartId) {
      break;
    }
  }

  shoppingCartProducts.splice(i, 1);

  dispatch(removeItemFromShoppingCartSuccess(shoppingCartProducts));

  window.localStorage.setItem(KEY_LOCALSTORAGE, encodeValue(shoppingCartProducts));

}; 

export const addPrescriptionToItem = (id, prescription = null, eyeSide=null) => async (dispatch, getState ) => {
  
  const shoppingCartProducts = getState().shoppingCart.data;

  const updateData = shoppingCartProducts.map((lense) => {
    if (id === lense.cartId) {
      const presOpt = prescription?{ ...lense.prescription,[eyeSide]:prescription}: null;
      
      return {
        ...lense,
        prescription: presOpt
      };
    } else {
      return lense;
    }
  });

  dispatch(addPrescriptionToLensesSuccess(updateData));

  window.localStorage.setItem(KEY_LOCALSTORAGE, encodeValue(updateData));
};
