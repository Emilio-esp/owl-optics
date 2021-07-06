const FETCH_GLASSES_START = "FETCH_GLASSES_START";
const FETCH_GLASSES_SUCCESS = "FETCH_GLASSES_SUCCESS";
const FETCH_GLASSES_ERROR = "FETCH_GLASSES_ERROR";

const initialState = {
  loading: false,
  glasses: [],
  error: null
};

export const fetchGlassesStart = () => ({
  type: FETCH_GLASSES_START,
});

export const fetchGlassesSuccess = (payload) => ({
  type: FETCH_GLASSES_SUCCESS,
  payload,
});

export const fetchGlassesError = (payload) => ({
  type: FETCH_GLASSES_ERROR,
  payload,
});

// fetch one type of glasses
const FETCH_LENSES_SELECTED_START = "FETCH_LENSES_SELECTED_START";
const FETCH_LENSES_SELECTED_SUCCESS = "FETCH_LENSES_SELECTED_SUCCESS";
const FETCH_LENSES_SELECTED_ERROR = "FETCH_LENSES_SELECTED_ERROR";

const initialStateProductDetail = {
  loading: false,
  lensesSelected: null,
  error: null,
};

export const fetchLensesSelectedStart = () => ({
  type: FETCH_LENSES_SELECTED_START,
});

export const fetchLensesSelectedSuccess = (payload) => ({
  type: FETCH_LENSES_SELECTED_SUCCESS,
  payload,
});

export const fetchLensesSelectedError = (payload) => ({
  type: FETCH_LENSES_SELECTED_ERROR,
  payload,
});


export function reducerShop(state = initialState, action) {
  switch (action.type) {
    case FETCH_GLASSES_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_GLASSES_SUCCESS: {
      return {
        ...state,
        glasses: action.payload,
        loading: false,
      };
    }
    case FETCH_GLASSES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return initialState;
    }
  }
}

export function reducerProductDetail (state = initialStateProductDetail, action ) {
  switch (action.type) {
    case FETCH_LENSES_SELECTED_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_LENSES_SELECTED_SUCCESS: {
      return {
        ...state,
        lensesSelected: action.payload,
        loading: false,
      };
    }
    case FETCH_LENSES_SELECTED_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state
    }
  }
}

export const getGlassesForShop = (glasses) => async (
  dispatch,
  getState,
  firebase
) => {
    // const uploadLenses = firebase.uploadLenses;

    // await uploadLenses(glasses);
  dispatch(fetchGlassesStart());
  try {
    const getCollectionData = firebase.getCollectionData;
    const glasses = await getCollectionData({ collection: "glasses" });
    const shopData = getFormatForShop(glasses);

    dispatch(fetchGlassesSuccess(shopData));

  } catch (err) {
    dispatch(fetchGlassesError(err));
  }
};

export const fetchLensesSelected = ( lensesID ) =>
  async (dispatch, getState, firebase) => {

    const getDocumentById = firebase.getDocumentById;
    // console.log("try to fetch a sigle glasess");
    dispatch(fetchLensesSelectedStart());
    try {
      const lenses = await getDocumentById({
        collection: "glasses",
        doc: lensesID.toUpperCase(),
      });
      // console.log(lenses.data());
      dispatch(fetchLensesSelectedSuccess(lenses.data()));
    } catch ( err ) {
      console.log(err);
      dispatch(fetchLensesSelectedError( err ));
    }
    
  };


const getFormatForShop = (glasses) => {
  const shopGlasses = [];

  for (let i = 0; i < glasses.length; i++) {
    const currentGlass = glasses[i];
    const { name, colors } = currentGlass;

    for (let j = 0; j < colors.length; j++) {
      const currentColor = colors[j];
      const color  = currentColor.name;

      for (let k = 0; k < currentColor.lenses.length; k++) {
        const { type } = currentColor.lenses[k];
        const models = [
          currentColor.lenses[k].glasses,
          currentColor.lenses[k].models[0],
          currentColor.lenses[k].models[1],
        ];
        for (let l = 0; l < models.length; l++) {
          const glassesData = {
            image: models[l],
            name,
            color,
            type,
            alt: "this is the best glasses you have in your life",
          };

          shopGlasses.push(glassesData)
        }
      }
    }
  }

  return generateRandomArr(shopGlasses);
};

const generateRandomArr = ( arr ) => {
    const arrRandom = [];
    let min = 0;
    let max = arr.length;
    let i;

    while( arr.length ) { 
        i = Math.floor( Math.random() * (max - min) + min);
        let tempItem = arr[i];
        i = arr.splice(i, 1);
        arrRandom.push( tempItem );
        max = arr.length;
    }

    return arrRandom
}
