import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import LogInFirst from "../components/LogInFirst";
import Navbar from "../components/Navbar";

const Messenger = () => {
  const { accessToken, user } = useAuth();
  const chats = [
    {
      id: 1,
      name: "Library boys",
      lastMessage: "Aysing ng kapkeyk ko sent an att...",
      time: "46m",
      avatar: "https://via.placeholder.com/50",
      online: true,
    },
    {
      id: 2,
      name: "BSIT 2A",
      lastMessage: "Steevan: okii thankyou poo",
      time: "4h",
      avatar: "https://via.placeholder.com/50",
      online: true,
    },
    {
      id: 3,
      name: "BSIT-2 STUDENTS 2025–2026",
      lastMessage: "Hazel sent an attachment.",
      time: "1d",
      avatar: "https://via.placeholder.com/50",
      online: true,
    },
    {
      id: 4,
      name: "Albert Jan",
      lastMessage: "You: Pa punta na kami rizal · Follow up?",
      time: "1d",
      avatar: "https://via.placeholder.com/50",
      online: true,
    },
  ];
  const [active, setActive] = useState(2);

  return (
    <div>
      {accessToken ? (
        <div>
          <Navbar />
          <div className="container-fluid p-0 p-md-3">
            <div
              className="mx-auto"
              style={{
                maxWidth: "420px",
                height: "100vh",
              }}
            >
              {/* Header */}
              <div className="px-3 pt-3">
                <h4 className="fw-bold mb-3">Chats</h4>

                {/* Search */}
                <input
                  className="form-control rounded-pill mb-3"
                  placeholder="Search Messenger"
                />

                {/* Tabs */}
                <div className="d-flex gap-2 mb-3 overflow-auto">
                  <span className="badge rounded-pill bg-primary flex-shrink-0">
                    All
                  </span>
                  <span className="badge rounded-pill text-dark flex-shrink-0">
                    Unread
                  </span>
                  <span className="badge rounded-pill text-dark flex-shrink-0">
                    Groups
                  </span>
                  <span className="badge rounded-pill text-dark flex-shrink-0">
                    Communities
                  </span>
                </div>
              </div>

              {/* Chat list (scrollable) */}
              <div
                className="list-group list-group-flush px-2"
                style={{
                  overflowY: "auto",
                  height: "calc(100vh - 160px)",
                }}
              >
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setActive(chat.id)}
                    className={`list-group-item list-group-item-action border-0 rounded-3 mb-1 ${
                      active === chat.id ? "bg-light" : ""
                    }`}
                  >
                    <div className="d-flex align-items-center gap-3">
                      {/* Avatar */}
                      <div className="position-relative flex-shrink-0">
                        <img
                          src={chat.avatar}
                          alt="avatar"
                          className="rounded-circle"
                          width="48"
                          height="48"
                        />
                        {chat.online && (
                          <span className="position-absolute bottom-0 end-0 translate-middle p-1 bg-success border border-white rounded-circle" />
                        )}
                      </div>

                      {/* Name + message */}
                      <div className="flex-grow-1 text-start overflow-hidden">
                        <div className="fw-semibold text-truncate">
                          {chat.name}
                        </div>
                        <div className="text-muted small text-truncate">
                          {chat.lastMessage}
                        </div>
                      </div>

                      {/* Time */}
                      <div className="text-muted small flex-shrink-0">
                        {chat.time}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <LogInFirst />
        </div>
      )}
    </div>
  );
};

export default Messenger;
