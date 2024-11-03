import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestPage = (props) => {
  const userSelector = useSelector((state) => state.user);

  if (userSelector.id) {
    return <Navigate to={"/"} />;
  }

  return props.children;
};

export default GuestPage;
