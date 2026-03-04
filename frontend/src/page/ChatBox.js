// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useSocket } from "../context/socketContext";
// import Navbar from "../components/Navbar";
// import { useAuth } from "../context/authContext";
// import { use } from "passport";

// function ChatBox() {
//   const { user, accessToken } = useAuth();
//   const { userId } = useParams();
//   const [message, setMessage] = useState("");
//   const [recieveMess, setRecieveMess] = useState("");
//   const [convoId, setConvoId] = useState(null);
//   const socket = useSocket();

//   const sendMessage = () => {
//     alert(message);
//     socket.emit("private_message", {to: userId, message: message });
//   };

//   const fetchPrevMessage = async () => {
//     const res = await fetch(`${process.env.REACT_APP_API_URL}/fetchPrevMess`, {
//       method: "GET",
//       headers: {
//         authorization: `Bearer ${accessToken}`
//       },
//       credentials: "include"
//     });

//     const result = await res.json();
//     if(result.success){

//     }
//   }

//   useEffect(() => {
//     if (!socket) return; 

//     const handler = (data) => {
//       setRecieveMess(data.message);
      
//     };

//     socket.on("receive_message", handler);
//     return () => socket.off("receive_message", handler);
//   }, [socket]);
//   return (
//     <div>
//       <Navbar username={user.display_name} photo={user.photo} />
//       <input
//         placeholder="message"
//         onChange={(e) => {
//           setMessage(e.target.value);
//         }}
//       />
//       <button onClick={sendMessage}>Send</button>

//       <h1>Message</h1>
//       {recieveMess}
//     </div>
//   );
// }

// export default ChatBox;
