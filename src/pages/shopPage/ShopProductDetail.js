import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import { fetchLensesSelected } from "../../reducers/shopReducer";
import { addItemToShoppingCart } from "../../reducers/shoppingCartReducer";

import useQuery from "../../hooks/useQuery";

import PageContainer from "../../components/PageContainer";
import Row from "../../components/Row";
import Column from "../../components/Column";
import Loader from "../../components/Loader";

const getCurrentSelectedGlasses = (lenses, color, type, getImages = true) => {
  const currentColor = lenses.find(
    (lense) => lense.name.toLowerCase() === color
  );

  const itemSelected = currentColor.lenses.filter(
    (lense) => lense.type === type
  );

  if (!getImages) return [{ ...itemSelected[0], color: currentColor.color}];

  return [itemSelected[0].glasses, ...itemSelected[0].models];
};

const ShopProductDetail = () => {
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.product);
  const carrouselRef = useRef(null);

  const query = useQuery();
  const { glassId } = useParams();
  const currentColor = query.get("color") || "midnight";
  const currentType = query.get("type") || "sunglasses";

  const [colorSelected, setColorSelected] = useState(currentColor);
  const [type, setsCurrentType] = useState(currentType);
  const [showCarousel, setShowCarousel] = useState(false);
  const LENSES_OPTION = ["glasses", "sunglasses"];

   useEffect(() => {
     return () => {
       setColorSelected(null);
       setsCurrentType(null);
       setShowCarousel({});
     };
   }, []);

  useEffect(() => {
    const fetchLenses = async () =>
    dispatch(fetchLensesSelected(glassId));

    fetchLenses();
  }, [dispatch, glassId]);

  useEffect(() => {
    if (window.matchMedia("(max-width: 640px)").matches) {
      setShowCarousel(true);
    } else {
      setShowCarousel(false);
    }

    window.addEventListener("resize", (e) => {
      const windowWidth = e.target.innerWidth;

      if (windowWidth < 640 && !showCarousel) {
        setShowCarousel(true);
      } else if (windowWidth > 640) {
        setShowCarousel(false);
      }
    });
  }, [setShowCarousel, showCarousel]);

  const handleOnClickColorGlasses = (color) => setColorSelected(color.toLowerCase())

  const toggleModalCarousel = ( op ) => {
    const showCloseBtn = op === "show" ? "block" : "none";
    const overFlowOpt = op === "show" ? "hidden" : "auto";

    const modal = carrouselRef.current;
    const closeBtn = carrouselRef.current.querySelector("div");

    if (op === "show") modal.classList.add("modal-product");
    else if (op === "hidden") modal.classList.remove("modal-product");

    document.body.style.overflowY = overFlowOpt;
    closeBtn.style.display = showCloseBtn;
  }

  const handleClickItem = () => toggleModalCarousel("show")

  const handleCloseSliderModal = () => toggleModalCarousel("hidden")

  const handleAddToBagProduct = (colors, price) => {

    const item = getCurrentSelectedGlasses(colors, colorSelected, type, false);
    const date = new Date();

    const data = {
      ...item[0],
      colorHex: item[0].color,
      price,
      glassId,
      color: colorSelected,
      type,
      cartId: `${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`
    };

    dispatch(addItemToShoppingCart(data));
  };

  if (shop?.loading || !shop.lensesSelected) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  const { name, description, price,  colors } = shop.lensesSelected;

  return (
    <PageContainer>
      <Row>
        <Column flexBasis="50">
          {showCarousel && (
            <div ref={carrouselRef}>
              <CloseBtn
                onClick={handleCloseSliderModal}
                className="w-8 h-8 cursor-pointer absolute right-4 text-white text-2xl"
              >
                X
              </CloseBtn>
              <Carousel
                showThumbs={false}
                autoPlay={true}
                swipeable={true}
                emulateTouch={true}
                showArrows={false}
                showStatus={false}
                infiniteLoop={true}
                onClickItem={handleClickItem}
              >
                {getCurrentSelectedGlasses(colors, colorSelected, type).map(
                  (model, i) => (
                    <img
                      key={i}
                      className="min-w-full py-4 object-cover"
                      src={model}
                      alt={`${glassId} ${colorSelected} Glasses`}
                    />
                  )
                )}
              </Carousel>
            </div>
          )}

          {!showCarousel &&
            getCurrentSelectedGlasses(
              colors,
              colorSelected,
              type
            ).map((model, i) => (
              <img
                key={i}
                className="min-w-full py-4"
                src={model}
                alt={`${glassId} ${colorSelected} Glasses`}
              />
            ))}
        </Column>

        <Column flexBasis="50">
          <div className="pr-0 sm:fixed sm:pr-12">
            <Column flexBasis="100">
              <h1 className="font-arial tracking-widest font-medium text-xl">
                {name}
              </h1>
            </Column>
            <Column flexBasis="100">
              <div className="form-label font-extralight tracking-widest leading-relaxed">
                {description}
              </div>
            </Column>
            <Row>
              <Column flexBasis="50">
                <h2 className="form-label font-semibold tracking-widest py-2">
                  Colour of frame
                </h2>
                <ul className="flex flex-wrap">
                  {colors.map((col, i) => (
                    <Option
                      key={i}
                      onClick={() => handleOnClickColorGlasses(col.name)}
                      className={
                        col.name.toLowerCase() === colorSelected
                          ? "selected"
                          : ""
                      }
                      color={col.color}
                    >
                      <span className="form-label font-extralight tracking-widest leading-relaxed">
                        {col.name}
                      </span>
                    </Option>
                  ))}
                </ul>
              </Column>

              <Column flexBasis="50">
                <CardPrice>
                  <span className="font-arial tracking-widet font-semibold text-x  block text-center">
                    {price} EUR
                  </span>
                  <p className="form-label font-extralight tracking-widest leading-relaxed text-center">
                    Including high quality
                  </p>
                  <p className="form-label font-extralight tracking-widest leading-relaxed text-center">
                    prescription lenses
                  </p>
                </CardPrice>
                <button
                  onClick={() => handleAddToBagProduct(colors, price)}
                  className="sm:text-xs bg-gray-400 uppercase text-white tracking-widest hover:bg-black cursor-pointer block w-full p-4 my-4"
                >
                  Add to Bag
                </button>
              </Column>
            </Row>
            <Row directionColumn={true}>
              <Column flexBasis={50}>
                <h2 className="form-label font-semibold tracking-widest py-2">
                  Type of Glasses
                </h2>
                <ul>
                  {LENSES_OPTION.map((lense, index) => (
                    <Option
                      key={`type-${index}`}
                      onClick={() => setsCurrentType(lense)}
                      className={`block ${type === lense ? "selected" : ""}`}
                      color={lense === "glasses" ? "gray" : "black"}
                    >
                      <span className="form-label font-extralight tracking-widest leading-relaxed">
                        {lense}
                      </span>
                    </Option>
                  ))}
                </ul>
              </Column>
            </Row>
          </div>
        </Column>
      </Row>
    </PageContainer>
  );
};

const Option = styled.li`
  flex-basis: 50%;
  padding: 0.5rem;
  color: black;
  border-radius: 0.1rem;
  transition: background-color 0.5s ease;

  &:hover {
    cursor: pointer;
    color: white;
    background-color: ${({ color }) => color};
  }

  &.selected {
    background-color: ${({ color }) => color};
    color: white;
  }
`;

const CloseBtn = styled.div`
  top: 15%;
  @media (min-width: 450px) {
    top: 10%;
  }
  @media (min-width: 550px) {
    top: 5%;
  }
`;

const CardPrice = styled.div`
  border: 1px solid grey;
  padding: 1rem;
  border-radius: 0.2rem;
`;

export default ShopProductDetail;
