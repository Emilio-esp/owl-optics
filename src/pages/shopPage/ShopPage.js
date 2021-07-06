import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import PageContainer from "../../components/PageContainer";

import { getGlassesForShop } from "../../reducers/shopReducer";
import Loader from "../../components/Loader";

import phrases from "../../utils/shopPhrases";
import ProductsForShop from "../../components/ProductsForShop";

// import lenses from '../../utils/lenses.json';
// import { uploadGlasses } from '../../reducers/userReducer'

const ShopPage = () => {
  const productRef = useRef(null);
  const dispatch = useDispatch();
  const shopData = useSelector((state) => state.shop);

  const [loadMoreGlasses, setLoadMoreGlasses] = useState(false);
  const [cantPages, setCantPages] = useState(1);

  const stateRef = React.useRef(loadMoreGlasses);
  const pagesRef = React.useRef(cantPages);

  // const dispatch = useDispatch()

  // const uploadLenses = async ()=>{
  //     console.log("click detect");
  //     dispatch(uploadGlasses(lenses));
  // };
  const setStateAndRefValue = (data) => {
    stateRef.current = data;
    setLoadMoreGlasses(data);
  };

  const addPageToRender = () => {
    const cant = pagesRef.current + 1;
    pagesRef.current = cant;
    setCantPages(cant);
    setStateAndRefValue(false);
  };

  const handleScrollEvent = () => {
    const scrollY = window.scrollY + window?.innerHeight;
    const productHeight = productRef.current?.offsetHeight;

    if (scrollY > productHeight - 200) {
      if (!stateRef.current) {
        setStateAndRefValue(true);
        addPageToRender();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScrollEvent);
  }, [handleScrollEvent]);

  useEffect(() => {
    console.log(shopData);
    if (!shopData.glasses.length) {
      dispatch(getGlassesForShop());
    }
  }, [dispatch]);

  const chunk = (arr, cant) => {
    const result = [];

    let subArr = [],
      j = 0;

    for (let i = 0; i < arr.length; i++) {
      if (j === cant) {
        result.push(subArr);
        subArr = [];
        j = 0;
      }
      subArr.push(arr[i]);
      j++;
    }

    if (subArr.length) {
      result.push(subArr);
    }

    return result;
  };

  const renderProducts = () => {
    const {glasses} = shopData;
    
    const arrGlasses = chunk(glasses, 12);
    const arrPhrases = chunk(phrases, 3);

    if (!glasses.length) return;

    const pages = [];
    const maxPages = parseInt( glasses / 12 );

    let cantPages = pagesRef.current;
    cantPages = cantPages >= maxPages ? maxPages : pagesRef.current;

    for (let j = 0; j < cantPages; j++) {
      pages.push(
        <ProductsForShop
          key={`page-product-${j}`}
          glasses={arrGlasses[j]}
          phrases={arrPhrases[j]}
          greeting={j === 0 ? true : false}
        />
      );
    }

    return pages;
  };

  if (shopData?.loading) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <PageContainer assingRef={productRef}>
      {/* <button onClick={uploadLenses} className="bg-red-900">
          Glaseses
        </button> */}
      {renderProducts()}
    </PageContainer>
  );
};

export default ShopPage;
