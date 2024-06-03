import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-6xl font-semibold">404 : Page Not Found!</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
