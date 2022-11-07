import React, { useState } from "react";
import "./SaveText.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { teal } from "@mui/material/colors";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import BarLoader from "react-spinners/BarLoader";
import { BASE_URL } from "../../constants";
import { logoutHandler } from "../../services/api";
import sha256 from "crypto-js/sha256";
import axios from "axios";

const SaveText = () => {
  const [plainText, setPlainText] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const uploadHandler = async () => {
    if (plainText) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        withCredentials: true,
      };
      setIsLoading(true);
      let hashedText = sha256(plainText);
      await axios
        .post(
          `${BASE_URL}/message/saveHash`,
          {
            hash: hashedText,
          },
          config
        )
        .then((res) => {
          if (res.status === 401) {
            logoutHandler();
          }
          alert("HASH SAVED");
          axios
            .post(
              `${BASE_URL}/message/saveMessage`,
              {
                content: plainText,
                objId: res?.data?._id,
              },
              config
            )
            .then((res) => {
              alert(res.data.msg);
              setPlainText("");
              setIsLoading(false);
              if (res.status === 401) {
                logoutHandler();
              }
            })
            .catch((error) => {
              alert(error.response.data.msg);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          alert(error.response.data.msg);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="save-text-container">
      <div className="save-text-container-textarea">
        <TextareaAutosize
          aria-label="minimum height"
          minRows={10}
          placeholder="Message"
          style={{
            width: 700,
            paddingLeft: "5%",
            paddingRight: "5%",
            fontSize: "1.7em",
          }}
          onChange={(e) => {
            setPlainText(e.target.value);
          }}
        />
      </div>
      <div className="save-text-save-btn">
        <Button
          variant="contained"
          fullWidth
          style={{ backgroundColor: teal[500] }}
          startIcon={<ArrowForwardIosRoundedIcon />}
          onClick={uploadHandler}
        >
          <div className="save-text-save-btn-text">SAVE MESSAGE</div>
        </Button>
        {isLoading && <BarLoader color="orange" width={"100%"} />}
      </div>
    </div>
  );
};

export default SaveText;
