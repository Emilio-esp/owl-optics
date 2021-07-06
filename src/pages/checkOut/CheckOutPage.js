import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link, useHistory} from "react-router-dom";
import Loader from "../../components/Loader";

import Options from "../../components/Options";
import PageContainer from "../../components/PageContainer";
import PageContent from "../../components/PageContent";
import PageTitle from "../../components/PageTitle";
import Paypal from "../../components/Paypal";
import Product from "../../components/Product";
import Row from "../../components/Row";
import ShippingAddress from "../../components/ShippingAddress";

import { makeASale } from "../../reducers/purchaseReducer";


const CheckOutPage = ( ) => {
    const shoppingCart = useSelector((state) => state.shoppingCart);
    const purchases = useSelector((state) => state.purchases);
    const history = useHistory();
    const dispatch = useDispatch();

    const [paymentStatus, setPaymentStatus] = useState(false);

    const handleMakeSale = async(data, id) => {
      dispatch(makeASale(data, id));
      history.push(`/costumer/check-order-details?itemId=${id}`);
    };
    // console.log(purchases);

    if (purchases.loading || paymentStatus) {
      return (
        <PageContainer>
          <Loader />
        </PageContainer>
      );
    }

    if ( !shoppingCart.data.length) {
      return (
        <PageContainer>
          <PageTitle>There are no items in your shopping Cart </PageTitle>

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

    if (!paymentStatus) {
      return (
        <PageContainer>
          <PageTitle>Check Out</PageTitle>
          <PageContent>
            {shoppingCart.data.map((product, index) => (
              <Row margin={2} key={`row-item-${index}`}>
                <Product
                  key={`product-${index}`}
                  width={30}
                  {...product}
                  addRemove={true}
                />
                <Options {...product} key={`presciption-${index}`} />
              </Row>
            ))}
            <ShippingAddress />
            <h2 style={{padding: "2em", border:"dashed 2px black"}}>You can Use this account to purchase</h2>
            <h2>email: sb-ly6l25763956@personal.example.com </h2>
            <h2>password: Xmpd6@+A</h2>
            <br />
            <Paypal
              makeSale={handleMakeSale}
              shoppingCartData={shoppingCart.data}
              setPaymentStatus={setPaymentStatus}
            />
          </PageContent>
        </PageContainer>
      );
    }
}


export default CheckOutPage
