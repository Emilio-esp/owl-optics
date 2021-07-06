import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addPrescriptionToItem } from "../reducers/shoppingCartReducer";

import Select from "./Select";

import { sphere, cylinder, axis, pupillarDistance} from "../utils/prescription";

const Presciption = ({ presciption, eyeSide, cartId }) => {
  const SPHERE_VALUE = presciption? presciption?.sphere: "0.00";
  const CYLINDER_VALUE = presciption? presciption?.cylinder: "0.00";
  const AXIS_VALUE = presciption? presciption?.axis: "0";
  const PUPILLAR_DISTANCE_VALUE = presciption? presciption?.pupillarDistance: "31.50";

  const INITIAL_PRESCRIPTION = {
    sphere: SPHERE_VALUE,
    cylinder: CYLINDER_VALUE,
    axis: AXIS_VALUE,
    pupillarDistance: PUPILLAR_DISTANCE_VALUE
  };

  const [press, setPress] = useState(INITIAL_PRESCRIPTION);

  const dispatch = useDispatch();

  const toCamelCase = (str) => {
    str = str.split(" ");
    str[0].toLowerCase();

    str = str.map((substr, index) => {
      if (index === 0) {
        return substr.toLowerCase();
      } else {
        let s = substr.split("");
        s[0].toUpperCase();
        return s.join("");
      }
    });

    return str.join("");
  };

  const handleOnchangeSphereSelect = (op, label) => {
    const key = toCamelCase(label);
    const dataPrescription = {
      ...press,
      [key]: op,
    };

    setPress(dataPrescription);
    dispatch(addPrescriptionToItem(cartId, dataPrescription, eyeSide));
  };

  return (
    <div className="sm:w-3/6 mx-auto">
      <Select
        label="Sphere"
        options={sphere}
        handleOnchange={handleOnchangeSphereSelect}
        defaultValueSelected={SPHERE_VALUE}
      />

      <Select
        label="Cylinder"
        options={cylinder}
        handleOnchange={handleOnchangeSphereSelect}
        defaultValueSelected={CYLINDER_VALUE}
      />

      <Select
        label="Axis"
        options={axis}
        handleOnchange={handleOnchangeSphereSelect}
        defaultValueSelected={AXIS_VALUE}
      />
      <Select
        label="Pupillar Distance"
        options={pupillarDistance}
        handleOnchange={handleOnchangeSphereSelect}
        defaultValueSelected={PUPILLAR_DISTANCE_VALUE}
      />
    </div>
  );
};

export default React.memo(Presciption);
