import React from "react";
import ChatBot from "react-simple-chatbot";
function CustomChatbot(props) {
   const config = {
     width: "300px",
     height: "400px",
     floating: true
   };
   const steps = [
      {
         id: "Greet",
         message: "Hello, Welcome to our shop",
         trigger: "Ask Name"
       },
       {
         id: "Ask Name",
         message: "Please type your name?",
         trigger: "Waiting user input for name"
       },
       {
         id: "Waiting user input for name",
         user: true,
         trigger: "Asking options to eat"
       },
       {
         id: "Asking options to eat",
         message: "Hi {previousValue}, Glad to know you !!",
         trigger: "Would you like to get call"
       },
       {
         id: "Would you like to get call",
         message: "Would you like to get call",
         trigger: "Type your Phone number1"
       },
       
       {
         id: "Type your Phone number1",
         user: true,
         trigger: "Type your Phone number"
       },
       {
         id: "Type your Phone number",
         message: "Type your Phone number",
         trigger: "Phone Call1"
       },
       {
         id: "Phone Call1",
         user: true,
         message: "Type your Phone number",
         trigger: "Phone Call"
       },
       {
         id: "Phone Call",
         message: "Our manager call you soon !!",
         trigger: "Done"
       },
       {
         id: "Done",
         message: "Have a great day !!",
         end: true
       },
       
    ];
   
   return <ChatBot steps={steps} {...config} />;
  }
  export default CustomChatbot;