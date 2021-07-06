import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getPurchasesByUserId } from "../../reducers/purchaseReducer";

import { decodeTimesTamp, getTotalAmount } from "../../helpers";

import PageContainer from "../../components/PageContainer";
import PageContent from "../../components/PageContent";
import PageTitle from "../../components/PageTitle";
import Loader from "../../components/Loader";
import Row from "../../components/Row";
import Column from "../../components/Column";

const DashboardPage = () => {

  const user = useSelector((state) => state.user);
  const purchases = useSelector((state) => state.purchases);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPurchasesByUserId(user.data?.userId));
  }, [dispatch, user.data?.userId]);

  if (purchases?.loading) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }
  console.log(purchases);
  if (!purchases.allItems.length) {
    return (
      <PageContainer>
        <PageTitle>You Don't Have Any Purchase yet</PageTitle>
        <div className="text-center my-24">
          <Link
            to="/shop"
            className="sm:text-xs bg-gray-400 uppercase text-white text-center tracking-widest hover:bg-black cursor-pointer inline w-full p-4 "
          >
            Go Shopping
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>Dashboard</PageTitle>
      <PageContent>
        {purchases.allItems.map((purchase, index) => (
          <div key={`order-number-${index}`} className="w-full m-auto">
            <Row margin={2}>
              <Column>
                <h5 className="p-tag py-2 font-semibold text-center">
                  Order Date
                </h5>
                <span className="p-tag p-1 block text-center">
                  {decodeTimesTamp(purchase.date)}
                </span>
              </Column>
              <Column>
                <h5 className="p-tag py-2 font-semibold text-center">
                  Order Number
                </h5>
                <span className="p-tag p-1 block text-center">
                  {purchase?.id.toLowerCase()}
                </span>
              </Column>
              <Column>
                <h5 className="p-tag py-2 font-semibold text-center">
                  Order Total
                </h5>
                <span className="p-tag p-1 block text-center">
                  {getTotalAmount(purchase.order)} EUR
                </span>
              </Column>
              <Column>
                <h5 className="p-tag py-2 font-semibold text-center">
                  Options
                </h5>
                <div className="text-center">
                  <Link
                    to={`/costumer/check-order-details?itemId=${purchase.id}`}
                    className="sm:text-xs bg-gray-400 text-white text-center tracking-widest hover:bg-black cursor-pointer inline w-full p-2 "
                  >
                    See Full Description
                  </Link>
                </div>
              </Column>
            </Row>
          </div>
        ))}
      </PageContent>
    </PageContainer>
  );
};

export default DashboardPage;
