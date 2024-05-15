import React from "react";

const ContactMeButton = (props) => {
  return (
    <div>
      <button className="p-2 rounded-md bg-gray-900 text-white hover:bg-gray-700">
        {props.children}
      </button>
    </div>
  );
};

export default ContactMeButton;
