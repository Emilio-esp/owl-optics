import {clearShoppingCartInformation, KEY_LOCALSTORAGE} from "./shoppingCartReducer";

const PURCHASE_PRODUCT_START = "PURCHASE_PRODUCT_START";
const PURCHASE_PRODUCT_SUCCESS = "PURCHASE_PRODUCT_SUCCESS";
const PURCHASE_PRODUCT_ERROR = "PURCHASE_PRODUCT_ERROR";

const FETCH_PURCHASE_BY_ID_START = "FETCH_PURCHASE_BY_ID_START";
const FETCH_PURCHASE_BY_ID_SUCCESS = "FETCH_PURCHASE_BY_ID_SUCCESS";
const FETCH_PURCHASE_BY_ID_ERROR = "FETCH_PURCHASE_BY_ID_ERROR";

const FETCH_ALL_PURCHASES_BY_USER_START = "FETCH_ALL_PURCHASES_BY_USER_START";
const FETCH_ALL_PURCHASES_BY_USER_SUCCESS = "FETCH_ALL_PURCHASES_BY_USER_SUCCESS";
const FETCH_ALL_PURCHASES_BY_USER_ERROR = "FETCH_ALL_PURCHASES_BY_USER_ERROR";

const initialState = {
  loading: false,
  item: [],
  allItems: [],
  error: null,
  isASaleMake: false
};

export const purchaseItemsStart = () => ({
  type: PURCHASE_PRODUCT_START,
});

export const purchaseItemsSuccess = (payload) => ({
  type: PURCHASE_PRODUCT_SUCCESS,
  payload,
});

export const purchaseItemsError = (payload) => ({
  type: PURCHASE_PRODUCT_ERROR,
  payload,
});

/**
 * fetch item purchase
 */
export const fetchPurchaseItemStart = () => ({
  type: FETCH_PURCHASE_BY_ID_START,
});

export const fetchPurchaseItemSuccess = (payload) => ({
  type: FETCH_PURCHASE_BY_ID_SUCCESS,
  payload,
});

export const fetchPurchaseItemError = (payload) => ({
  type: FETCH_PURCHASE_BY_ID_ERROR,
  payload,
});

/**
 * fetch purchases by user
 */
export const fetchPurchasesStart = () => ({
  type: FETCH_ALL_PURCHASES_BY_USER_START,
});

export const fetchPurchasesSuccess = (payload) => ({
  type: FETCH_ALL_PURCHASES_BY_USER_SUCCESS,
  payload,
});

export const fetchPurchasesError = (payload) => ({
  type: FETCH_ALL_PURCHASES_BY_USER_ERROR,
  payload,
});

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case PURCHASE_PRODUCT_START:
    case FETCH_PURCHASE_BY_ID_START:
    case FETCH_ALL_PURCHASES_BY_USER_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_PURCHASE_BY_ID_SUCCESS:{
      return {
        ...state,
        item: action.payload,
        error: null,
        loading: false,
      };
    }
    case PURCHASE_PRODUCT_SUCCESS:{
      return {
        ...state,
        item: action.payload,
        error: null,
        loading: false,
        isASaleMake:true,
      };
    }
    case FETCH_ALL_PURCHASES_BY_USER_SUCCESS: {
      return {
        ...state,
        allItems: action.payload,
        loading:false
      }
    }
    case PURCHASE_PRODUCT_ERROR:
    case FETCH_PURCHASE_BY_ID_ERROR:
    case FETCH_ALL_PURCHASES_BY_USER_ERROR: {
      return {
        ...state,
        loading:false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const makeASale = (data, id) => async (dispatch, getState, firebase) => {
  const saveData = firebase.saveData;

  dispatch(purchaseItemsStart());

  try {
    const dataPurchase = await saveData({
      collection: "sales",
      data,
      id,
    });

    dispatch(purchaseItemsSuccess([dataPurchase]));
    dispatch(clearShoppingCartInformation([]));
    localStorage.removeItem(KEY_LOCALSTORAGE);

  } catch (err) {
    console.log(err);
    dispatch(purchaseItemsError(err));
  }
};

export const getPurchaseById = (id) => async ( dispacth, getState, firebase) => {
  const getDocumentById = firebase.getDocumentById;
  dispacth(fetchPurchaseItemStart());
  
  try {
    const purchase = await getDocumentById({ collection: "sales", doc: id });
    if (purchase.exists) {
      dispacth(fetchPurchaseItemSuccess([purchase.data()]));
    }else{
      dispacth(fetchPurchaseItemError("this purchase doesn't exist"));
    }
  } catch (err) {
    dispacth(fetchPurchaseItemError(err));
  }

};

export const getPurchasesByUserId = ( id ) => async(dispatch, getState, firebase ) => {
  const getCollectionData = firebase.getCollectionData;
  const collection = "sales";
  const where = {
    field:"idsOrder",
    op: "array-contains-any",
    value: [`${id}`],
  };

  dispatch(fetchPurchasesStart());

  try {
    const purchasesData = await getCollectionData({
      collection,
      where,
    });
    dispatch(fetchPurchasesSuccess(purchasesData));
    
  } catch (err) {
    dispatch(fetchPurchasesError(err));
  }

}
