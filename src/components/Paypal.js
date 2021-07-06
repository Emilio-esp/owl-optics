import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";

import { getTotalAmount, encodeTimesTamp } from "../helpers";

const Paypal = ({ makeSale, shoppingCartData, setPaymentStatus }) => {
  const paypalRef = useRef();
  const user = useSelector((state) => state.user?.data) || {};

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "lenses Owloptics",
                amount: {
                  currency_code: "USD",
                  value: getTotalAmount(shoppingCartData),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          data = {
            shipInformation: { ...user },
            paymentInformation: { ...order },
            order: shoppingCartData,
            idsOrder: [user.userId, order.id],
            date: encodeTimesTamp(),
          };
          await setPaymentStatus(true);
          await makeSale(data, order.id);
        },
        onError: (err) => {
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, []);

  return (
    <div>
      <div ref={paypalRef}></div>
    </div>
  );
};

export default Paypal;