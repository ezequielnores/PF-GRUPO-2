import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const ContenidoChat = () => {
  const config = {
    width: "400px",
    height: "450px",
    floating: true,
    backButton: {
      show: true,
      label: "Back",
    },
  };
  const theme = {
    background: "white",
    fontFamily: "Arial, Helvetica, sans-serif",
    headerBgColor: "#058d8d",
    headerFontColor: "#fff",
    headerFontSize: "25px",
    botBubbleColor: "#058d8d",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4c4c4c",
   };

  return (
    <div >
      <ThemeProvider theme={theme}>
      <ChatBot

        {...config}
        steps={[
          {
            id: "intro",
            message: "Hello, welcome to iCare, what is your name?",
            trigger: "pregunta-nombre",
          },
          {
            id: "pregunta-nombre",
            user: true,
            trigger: "respuesta-nombre",
          },
          {
            id: "respuesta-nombre",
            message: "Hello {previousValue}, how can I help you?",
            trigger: "opciones",
          },
          {
            id: "opciones",
            options: [
              { value: "site", label: "About the site", trigger: "site-1" },
              { value: "plans", label: "Types of plans", trigger: "plan-1" },
              {
                value: "join",
                label: "How get the service",
                trigger: "join-1",
              },
              { value: "contact", label: "Contact", trigger: "contact-1" },
            ],
          },
          {
            id: "site-1",
            message:
              "iCare is a medical service tailored to your needs, we have a team of high-level doctors with a wide variety of specialties. We have the possibility of both virtual and face-to-face medical attention, once registered you will have access to obtaining differents plans as well as the possibility of making medical appointments, seeing your medical history and much more. Do not hesitate to meet us!",
            trigger: "back",
            action: () => ({ goTo: "back" }),
          },

          {
            id: "plan-1",
            options: [
              { value: "plan1", label: "iCare guard", trigger: "simple" },
              { value: "plan2", label: "iCare 360", trigger: "360" },
              { value: "plan3", label: "iCare full", trigger: "full" },
              { value: "back", label: "Go back", trigger: "opciones" },
            ],
          },

          {
            id: "back",
            message: "Do you want to know anything else ?",
            trigger: "simple-back-options2",
          },
          {
            id: "simple-back-options2",
            options: [
              { value: "yes", label: "Yes", trigger: "opciones" },
              { value: "no", label: "No", trigger: "fin" },
            ],
          },
          {
            id: "join-1",
            message:
              "To be part of iCare and start enjoying our service, you must register by filling in all the necessary information to provide better care. Once this is done, you will be able to access the medical plan that best suits you.",
            trigger: "back",
            action: () => ({ goTo: "back" }),
          },
          {
            id: "contact-1",
            message:
              "If you have any other questions that you can not resolve here, you could communicate in our live chat that is in the lower left part of the screen. An iCare representative will contact you as soon as possible. On the other hand, you can also contact us by email.",
            trigger: "back",
            action: () => ({ goTo: "back" }),
          },

          {
            id: "simple-back",
            message: "Do you want to see the plan options again?",
            trigger: "simple-back-options",
          },
          {
            id: "simple-back-options",
            options: [
              { value: "yes", label: "Yes", trigger: "plan-1" },
              { value: "no", label: "No", trigger: "fin" },
            ],
          },
          {
            id: "fin",
            message:
              "Thank you for your time, if you have any other questions, do not hesitate to contact us.",
            end: true,
          },

          {
            id: "simple",
            message:
              "It is the most economical plan that we have so far, with a rate of $1000 per month, this subscription plan includes a medical consultation with any of our best specialists, on the other hand it includes the possibility of making use of the medical guard 5 times per month. For any other more specific questions, do not hesitate to use the live chat.",
            trigger: "simple-back",
            action: () => ({ goTo: "simple-back" }),
          },
          {
            id: "360",
            message:
              "It is the intermediate plan of our service, it has a price of $3000 per month, which includes 4 medical consultations with any of our best specialists, it also includes the possibility of using two medical guards if necessary. For any other more specific questions Do not hesitate to contact the live chat.",
            trigger: "simple-back",
            action: () => ({ goTo: "simple-back" }),
          },
          {
            id: "full",
            message:
              "It is our most expensive and premium medical plan, the full package has a cost of $4,000 per month, which includes the possibility of 4 consultations with any of our best specialists, on the other hand, you have the possibility of making use of the medical guard as many times as you need, without any limit!. If you have any other specific questions about the plan, don't hesitate to use the live chat.",
            trigger: "simple-back",
            action: () => ({ goTo: "simple-back" }),
          },
        ]}
      />
      </ThemeProvider>
    </div>
  );
};

export default ContenidoChat;
