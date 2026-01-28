import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import LogInFirst from "../components/LogInFirst";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Messenger = () => {
  const { accessToken, user } = useAuth();
  const [chatUser, setChatUser] = useState([]);
  const [active, setActive] = useState(2);

  const fetchChatUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/fetchChatUser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      const result = await res.json();
      if (result.success) {
        setChatUser(result.result);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (accessToken) {
      fetchChatUser();
    }
  }, [accessToken]);

  return (
    <div>
      {accessToken ? (
        <div>
          <Navbar username={user.display_name} photo={user.photo} />
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
                {chatUser.map((chat) => (
                  <Link to={`/chat/${user.Id}`}>
                    <button
                      key={chat.UID}
                      onClick={() => setActive(chat.UID)}
                      className={`list-group-item list-group-item-action border-0 rounded-3 mb-1 ${
                        active === chat.UID ? "bg-light" : ""
                      }`}
                    >
                      <div className="d-flex align-items-center gap-3">
                        {/* Avatar */}
                        <div className="position-relative flex-shrink-0">
                          <img
                            src={`http://localhost:5000/photo/${chat.photo}`}
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
                            {chat.display_name}
                          </div>
                        </div>
                      </div>
                    </button>
                  </Link>
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
