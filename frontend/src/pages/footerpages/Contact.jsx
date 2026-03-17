import React from "react";
import SendMessage from "../../components/SendMessage";
import useSEO from "../../hooks/useSEO";

const Contact = () => {
  useSEO({
    title: "Contact Us",
    description: "Get in touch with us for any inquiries or support.",
  });

  return (
    <div>
      <SendMessage />
    </div>
  );
};

export default Contact;
