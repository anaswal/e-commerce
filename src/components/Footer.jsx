import React from "react";
import ContactMeButton from "./ContactMeButton";

const Footer = () => {
  return (
    <footer className="border-t min-h-16 flex justify-between items-center px-20 py-8 mt-20">
      <p>Anas Walyullah Copyright 2024</p>
      <ContactMeButton>Contact Me</ContactMeButton>
    </footer>
  );
};

export default Footer;
