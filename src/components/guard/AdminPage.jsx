import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminPage = (props) => {
  const userSelector = useSelector((state) => state.user);

  if (userSelector.role !== "admin") {
    return <Navigate to={"/"} />;
  }

  return props.children;
};

export default AdminPage;
