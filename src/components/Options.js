import React, { useState} from "react";
import { useDispatch } from "react-redux";

import {addPrescriptionToItem} from '../reducers/shoppingCartReducer';

import Presciption from "./Prescription";

const Options = ({ cartId, prescription}) => {

  const dispatch = useDispatch();
  const ENABLE="enable", DISABLE='disable';
  const EYE_RIGHT_SIDE = "right", EYE_LEFT_SIDE = "left";

  const [withPrescription, setWithPrescription] = useState(
    (prescription?.right || prescription?.left) ? true : false
  );
  const [noPrescription, setNoPrescription] = useState(withPrescription? false:true);

  const enablePrescription = (op)=>{
    if (op === ENABLE) {
      setWithPrescription(!withPrescription);
      setNoPrescription(false);
    } else if (op === DISABLE) {
      setNoPrescription(!noPrescription);
      setWithPrescription(false);
    }

    dispatch(addPrescriptionToItem(cartId));
  }

  return (
    <div>
      <div className="text-center py-8 sm:py-0">
        <button
          onClick={() => enablePrescription(ENABLE)}
          className={`btn-presc my-2 sm:my-0 ${
            withPrescription ? "bg-black" : "bg-gray-400"
          }`}
        >
          With Presciption
        </button>
        <button
          onClick={() => enablePrescription(DISABLE)}
          className={`btn-presc my-2 sm:my-0 ${
            noPrescription ? "bg-black" : "bg-gray-400"
          }`}
        >
          No Presciption
        </button>
      </div>
      {withPrescription && (
        <>
          <h2 className="w-full font-arial font-semibold tracking-widest text-xs py-4">Right Eye</h2>
          <Presciption
            presciption={prescription?.right}
            eyeSide={EYE_RIGHT_SIDE}
            cartId={cartId}
          />
          <h2 className="w-full font-arial font-semibold tracking-widest text-xs py-4">Left Eye</h2>
          <Presciption
            presciption={prescription?.left}
            eyeSide={EYE_LEFT_SIDE}
            cartId={cartId}
          />
        </>
      )}
    </div>
  );
};


export default React.memo(Options);