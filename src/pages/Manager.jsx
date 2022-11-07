/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import SaveText from "../components/saveText/SaveText";
import SaveFile from "../components/saveFile/SaveFile";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { teal } from "@mui/material/colors";
import { AUTH_BASE_URL } from "../constants";
import axios from "axios";

const Manager = () => {
  const [statusCheck, setStatusCheck] = useState(false);

  const logoutHandler = () => {
    window.open(`${AUTH_BASE_URL}/auth/logout`, "_self");
  };

  const checkUserSession = async () => {
    const url = `${AUTH_BASE_URL}/auth/login/success`;
    await axios
      .get(url, { withCredentials: true })
      .then((res) => {
        setStatusCheck(!statusCheck);
      })
      .catch((err) => {
        alert("Your session expired, please log in again");
        logoutHandler();
      });
  };

  // useEffect(() => {
  //   checkUserSession();
  // }, [statusCheck]);
  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        marginTop: "20vh",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <SaveText />
        </div>
        <div>
          <SaveFile />
        </div>
        <div>
          <Button
            variant="contained"
            fullWidth
            style={{ backgroundColor: teal[500], marginBottom: "10vh" }}
            startIcon={<LogoutIcon />}
            onClick={logoutHandler}
          >
            <div className="login-success-logout-btn-text">LOGOUT</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Manager;
