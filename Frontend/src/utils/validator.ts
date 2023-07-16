import { message } from "antd";
import { Dispatch, SetStateAction } from "react";
import { emailerrors, phoneerrors } from "../Context/ExtrasContext";
export const validateEmail = (email: string) => {
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};
export const validatePhone = (phone: string) => {
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneNumberRegex = /^(?:\+254|0)(?:1|7)\d{8}$/;
  return phoneNumberRegex.test(phone);
};

export const handleEmailBlur = (
  email: string,
  origin: string,
  setEmailErrors: Dispatch<SetStateAction<emailerrors>>
) => {
  if (!validateEmail(email)) {
    message.error("Invalid email address");
    switch (origin) {
      case "email":
        setEmailErrors((prev) => ({ ...prev, emailerror: true }));
        break;
      case "from":
        setEmailErrors((prev) => ({ ...prev, fromerror: true }));
        break;
      case "to":
        setEmailErrors((prev) => ({ ...prev, toerror: true }));
        break;
      case "cc":
        setEmailErrors((prev) => ({ ...prev, ccerror: true }));
        break;
      default:
        break;
    }
  } else {
    setEmailErrors({
      emailerror: false,
      ccerror: false,
      fromerror: false,
      toerror: false,
    });
  }
};
export const handlePhoneBlur = (
  email: string,
  origin: string,
  setPhoneErrors: Dispatch<SetStateAction<phoneerrors>>
) => {
  if (!validatePhone(email)) {
    message.error("Invalid Phone Number");
    switch (origin) {
      case "from":
        setPhoneErrors((prev) => ({ ...prev, fromerror: true }));
        break;
      case "to":
        setPhoneErrors((prev) => ({ ...prev, toerror: true }));
        break;
      default:
        break;
    }
  } else {
    setPhoneErrors({
      fromerror: false,
      toerror: false,
    });
  }
};
