import React, { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { managementClient } from "../Client/contentfulManage";
import "../css/contact.css";

function ContactUs() {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const validateEmail = (email) => {
    // Basic email validation expression
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  function submit(e) {
    //this will prevent page refresh
    e.preventDefault();

    //Reset validation error
    setEmailError;
    setMessageError("");

    //form validation
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (message.trim().length < 10) {
      setMessageError("Message must be at least 10 characters");
      return;
    }

    // Check if there are any validation errors
    if (emailError || messageError) {
      return;
    }

    //proceed with form submission
    managementClient
      .getSpace(import.meta.env.VITE_space)
      .then((space) => space.getEnvironment("master"))
      .then((environment) => {
        return environment.createEntry("contactus", {
          fields: {
            email: {
              "en-US": email,
            },
            message: {
              "en-US": message,
            },
          },
        });
      })
      .then((entry) => {
        console.log("Entry created:", entry);
        setSubmitted(true);
      })
      .catch((err) => {
        console.error("Error creating entry:", err);
        setError(err.message);
      });
  }
  const resetForm = () => {
    setEmail("");
    setMessage("");
    setSubmitted(false);
    setError("");
  };
  if (error) {
    return <p>{error}</p>;
  }
  if (submitted) {
    return (
      <div className={`Contactus ${theme} contactform `}>
        <h3 style={{ color: theme === "light" ? "#333333" : "#ffffff" }}>
          we have received your message,thank you for contacting us!
        </h3>
        <button onClick={resetForm}> Go to contact</button>
      </div>
    );
  }
  return (
    <div className={`Contactus ${theme} contactform `}>
      <h1>Contact us</h1>
      <form onSubmit={submit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {emailError && <span className="error">{emailError}</span>}

        <label htmlFor="Message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        {messageError && <span className="error">{messageError}</span>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default ContactUs;
