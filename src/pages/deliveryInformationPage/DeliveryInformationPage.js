import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import  styled from "styled-components";

import useQuery from "../../hooks/useQuery";

import PageContainer from "../../components/PageContainer";
import PageContent from "../../components/PageContent";
import PageTitle from "../../components/PageTitle";
import Row from "../../components/Row";
import Column from "../../components/Column";
import Product from "../../components/Product";
import Loader from "../../components/Loader";

import {getPurchaseById} from "../../reducers/purchaseReducer";
import { getTotalAmount, decodeTimesTamp } from "../../helpers";

import truckIcon from "../../images/truck_icon.gif" 

const DeliveryInformationPage = () => {
  
    const purchases = useSelector((state) => state.purchases);
    const dispatch = useDispatch()
    const query = useQuery();
    const purchaseId = query.get("itemId");
  
    useEffect(() => {
      dispatch(getPurchaseById(purchaseId));
    }, [dispatch, purchaseId]);

    if (purchases.error) {
      return (
        <PageContainer>
          <PageTitle>This purchase doesn't exists</PageTitle>
        </PageContainer>
      );
    }

    if (purchases?.loading || !purchases.item.length) {
      return (
        <PageContainer>
          <Loader />
        </PageContainer>
      );
    }
    

    const order = purchases.item[0];
    return (
      <PageContainer>
        {purchases.isASaleMake && (
          <div className="bg-green-900 text-white">
            <PageTitle>Payment Successful</PageTitle>
          </div>
        )}
        <PageTitle>Your order is on its way</PageTitle>
        <PageContent>
          <img src={truckIcon} alt="truck delivery icon"></img>
          <h2 className="sub-title-text text-sm">
            Please allow 24 hours to track your order.
          </h2>

          <Wrapper
            width={70}
            justifyContent="space-around"
            className="md:justify-center"
          >
            <Column>
              <h2 className="text-center sm:text-left sub-title-text text-sm m-0 py-2 ">
                Summary
              </h2>
              <div className="w-full flex justify-center">
                <div>
                  <p className="p-tag py-1">Order Number:</p>
                  <p className="p-tag py-1">Order Date:</p>
                  <p className="p-tag py-1">Order Total:</p>
                </div>
                <div>
                  <p className="p-tag py-1 px-2">
                    {purchaseId.toLocaleLowerCase()}
                  </p>
                  <p className="p-tag py-1 px-2">
                    {decodeTimesTamp(order.date)}
                  </p>
                  <p className="p-tag py-1 px-2">
                    {getTotalAmount(order.order)} EUR
                  </p>
                </div>
              </div>
            </Column>

            <Column>
              <h2 className="text-center sm:text-left sub-title-text text-sm m-0 py-2 ">
                Shipping Address
              </h2>
              <div>
                <p className="p-tag py-1 text-center sm:text-left">
                  {order.shipInformation.name} {order.shipInformation.surname}
                </p>
                <p className="p-tag py-1 text-center sm:text-left">
                  {order.shipInformation.address}
                </p>
                <p className="p-tag py-1 text-center sm:text-left">
                  {order.shipInformation.phone}
                </p>
                <p className="p-tag py-1 text-center sm:text-left">
                  {order.shipInformation.country}
                  {" - "}
                  {order.shipInformation.state}
                </p>
              </div>
            </Column>
          </Wrapper>
          <br></br>
          <br></br>
          <br></br>
          <Row directionColumn={true}>
            <Wrapper width={100} justifyContent="center">
              <h2 className="sub-title-text text-sm m-0 p-2 text-center uppercase">
                Items Shipped
              </h2>
              <h2 className="sub-title-text text-sm m-0 p-2 text-center uppercase">
                Price
              </h2>
            </Wrapper>
            {order.order.map((product, index) => (
              <ItemWrapper key={`row-item-${index}`}>
                <Product key={`product-${index}`} width={30} {...product} />
                <Wrapper
                  width={50}
                  justifyContent="center"
                  className="items-center w-3/4"
                >
                  <span className="text-red-700 font-bold">
                    {product.price} EUR
                  </span>
                </Wrapper>
              </ItemWrapper>
            ))}
          </Row>

          <Wrapper width={100} className="">
            <Column flexBasis={50}></Column>
            <Column flexBasis={50}>
              <div className="w-full flex justify-center py-10">
                <div>
                  <p className="p-tag py-1">SubTotal:</p>
                  <p className="p-tag py-1">Flat-Rate Shipping:</p>
                  <p className="p-tag py-1 font-extrabold">Order Total:</p>
                </div>
                <div>
                  <p className="p-tag py-1 text-right">
                    {getTotalAmount(order.order)} EUR
                  </p>
                  <p className="p-tag py-1 text-right">Free</p>
                  <p className="p-tag py-1 text-right font-extrabold">
                    {getTotalAmount(order.order)} EUR
                  </p>
                </div>
              </div>
            </Column>
          </Wrapper>
        </PageContent>
      </PageContainer>
    );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  min-width: ${({ width }) => (width ? width + "%" : "auto")};

  @media( max-width: 640px){
      width:100%;
      flex-direction:column;
  }
`;

const ItemWrapper = styled.div`
  padding:1rem;
  display:flex;
  overflow:hidden;
`;

export default DeliveryInformationPage;
