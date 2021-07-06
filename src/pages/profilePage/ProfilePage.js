import React, { useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory} from "react-router-dom";

import useInput from "../../hooks/useInput";
import useSelect from "../../hooks/useSelect";

import Loader from "../../components/Loader";
import PageContainer from "../../components/PageContainer";
import PageTitle from "../../components/PageTitle";
import PageContent from "../../components/PageContent";
import Select from "../../components/Select";
import Input from "../../components/Input";
import Alert from "../../components/Alert";

import { updateUserInformationAccount } from "../../reducers/userReducer";
import validate from '../../utils/validations';

import countriesAvailables from "../../utils/shippingAvailable.json";



const getCountries = () => {
  let countries = [];
  for (const key in countriesAvailables) {
    let country = countriesAvailables[key];

    countries.push({
      name: country.name,
      code: country.code,
    });
  }

  return countries;
};

const ProfilePage = () => {
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);

  const userCountry = currentUser.data.country ? currentUser.data.country : "US";

  const userState = currentUser.data.state ? currentUser.data.state : "AL";

  const [countries, country, setCountry] = useSelect(
    userCountry,
    getCountries()
  );

  const [states, state, setState, setStates] = useSelect(
    userState,
    countriesAvailables[userCountry].states
  );


  const [name, updateName,nameError,setNameError] = useInput(currentUser.data.name ? currentUser.data.name : "");
  const [lastName, updateLastName,lastNameError,setLastNameError] = useInput(currentUser.data.surname ? currentUser.data.surname : "");
  const [email, updateEmail,emailError,setemailError] = useInput(currentUser.data.email ? currentUser.data.email : "");
  const [phoneNumber, updatePhoneNumber,phoneError,setPhoneError] = useInput(currentUser.data.phone ? currentUser.data.phone : "");
  const [address, updateAddress,addressError,setAddressError] = useInput(currentUser.data.address ? currentUser.data.address : "");
  const [postalCode, updatePostalCode,postalCodeError,setPostalCodeError] = useInput(currentUser.data.address ? currentUser.data.address : "");

  const cleanErrorMessages= ()=>{
    setNameError(null);
    setNameError(null);
    setLastNameError(null);
    setemailError(null);
    setPhoneError(null);
    setAddressError(null);
    setPostalCodeError(null);
  };

  const validateForm = () => {
    let validationStatus = true;
    cleanErrorMessages();

    const nameValidation = validate.fieldLength("name", name, 3);
    const lastNameValidation = validate.fieldLength("Last Name", lastName, 3);
    const emailValidation = validate.email("email", email);
    const phoneNumberValidation = validate.fieldLength("phone number", phoneNumber, 5);
    const addressValidation = validate.fieldLength("address", address, 5);
    const postalCodeValidation = validate.fieldLength("postal code", postalCode, 2);

    if ( !nameValidation?.isCorrect ){
      setNameError(nameValidation);
      validationStatus =  false;
    }

    if (!lastNameValidation?.isCorrect) {
      setLastNameError(lastNameValidation);
      validationStatus = false;
    }
    if ( !emailValidation?.isCorrect ){
      setemailError(emailValidation);
      validationStatus =  false;
    }

    if ( !phoneNumberValidation?.isCorrect ){
      setPhoneError(phoneNumberValidation);
      validationStatus =  false;
    }

    if ( !addressValidation?.isCorrect ){
      setAddressError(addressValidation);
      validationStatus =  false;
    }

    if ( !postalCodeValidation?.isCorrect ){
      setPostalCodeError(postalCodeValidation);
      validationStatus =  false;
    }

    return validationStatus;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm()) return;

    cleanErrorMessages();
    
    const updateUserData = {
      email,
      name,
      surname: lastName,
      phone: phoneNumber,
      address,
      country,
      state
    };

    await dispatch(
      updateUserInformationAccount({
        collection: "users",
        doc: currentUser.data.userId,
        data: updateUserData,
      })
    );
    setShowAlert(true);

    const previusRoute = localStorage.getItem("last_path_owloptics");
    
    if (previusRoute === "/costumer/checkout") {
      history.goBack();
    }
  };

  const setStatesFromCountry = (country)=>{
    setCountry(country);
    setStates(countriesAvailables[country].states);
  }

  if (currentUser?.loading) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  };

  return (
    <PageContainer>
      {showAlert && <Alert color="bg-black" setShowAlert={setShowAlert} />}

      <PageTitle>ACCOUNT</PageTitle>
      <PageContent>
        <h6 className="sub-title-text">Edit Account</h6>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-11/12 md:w-6/12 sm:w-9/12"
        >
          <Select
            label="Country"
            options={countries}
            handleOnchange={setStatesFromCountry}
            defaultValueSelected={country}
          />
          <Input
            label="First Name"
            labelFor="name"
            name="name"
            type="text"
            placeholder="Nombre"
            value={name}
            updateValue={updateName}
            error={nameError}
          />
          <Input
            label="Last Name"
            labelFor="last_name"
            name="last_name"
            type="text"
            placeholder="Last Name"
            value={lastName}
            updateValue={updateLastName}
            error={lastNameError}
          />
          <Input
            label="Email"
            labelFor="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            updateValue={updateEmail}
            error={emailError}
          />
          <Input
            label="Address"
            labelFor="address"
            name="address"
            type="text"
            placeholder="direction"
            value={address}
            updateValue={updateAddress}
            error={addressError}
          />
          <Input
            label="Phone"
            labelFor="phone"
            name="phone"
            type="text"
            placeholder="(+591) 123456"
            value={phoneNumber}
            updateValue={updatePhoneNumber}
            error={phoneError}
          />
          <Select
            label="State"
            options={states}
            handleOnchange={setState}
            defaultValueSelected={state}
          />
          <Input
            label="Postal Code"
            labelFor="postal_code"
            name="postal_code"
            type="text"
            placeholder="A53541"
            value={postalCode}
            updateValue={updatePostalCode}
            error={postalCodeError}
          />

          <div className="text-center mt-8 pb-20">
            <input
              autoComplete="off"
              className="bg-gray-400 p-4 px-20 uppercase text-white tracking-widest hover:bg-black cursor-pointer"
              type="submit"
              value="update"
            />
          </div>
        </form>
      </PageContent>
    </PageContainer>
  );
};

export default ProfilePage;
