import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Timer from "./Timer";
import { Modal } from "react-bootstrap";
import axios from "axios";

export default function Window2() {
  const [text, setText] = useState("");
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [results, setResults] = useState(null);
  const [showGif, setShowGif] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [referenceText, setReferenceText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { apikey, testdifficulty } = location.state;

  useEffect(() => {
    axios
      .post("http://localhost:8000/typing-text", { apikey, level: testdifficulty })
      .then((res) => {
        if (res.data && res.data.message && res.data.message.content) {
          setReferenceText(res.data.message.content);
        } else {
          setReferenceText("No valid response received.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setReferenceText("Failed to fetch response.");
      });
  }, [apikey, testdifficulty]);

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleOnclick = () => {
    navigate("/");
  };

  const handleTimerExpire = () => {
    setIsTimerExpired(true);
    setShowModal(true);
  };

  const handleStart = () => {
    setText("");
    setIsTimerExpired(false);
    setResults(null);
    setShowGif(false);
    setShowModal(false);
  };

  const calculateResults = () => {
    const userWords = text.trim().split(/\s+/);
    const referenceWords = referenceText.trim().split(/\s+/);
    let correctWordsCount = 0;

    userWords.forEach((word, index) => {
      if (word === referenceWords[index]) {
        correctWordsCount++;
      }
    });

    return correctWordsCount;
  };

  useEffect(() => {
    if (isTimerExpired) {
      const correctWordsCount = calculateResults();
      setResults(correctWordsCount);
      const audio = new Audio("/clap.wav");
      audio.play();
      setShowGif(true);
    }
  }, [isTimerExpired, text]);

  return (
    <>
      <div className={`window-container ${isTimerExpired ? "faded" : ""}`}>
        <div className="heading">
          <h2>Welcome To The Typing Test</h2>
        </div>
        <Timer onTimerExpire={handleTimerExpire} onStart={handleStart} />
        <div className="contain">
          <div className="mb-3">
            <textarea
              className="form-control"
              id="text"
              rows="6"
              value={referenceText}
              readOnly
            ></textarea>
          </div>
        </div>
        <div className="container1">
          <div className="mb-3 my-7">
            <textarea
              value={text}
              className="form-control"
              id="write"
              onChange={handleOnChange}
              rows="6"
              readOnly={isTimerExpired}
              placeholder="Start Typing Here..."
            ></textarea>
          </div>
        </div>
        <div className="button">
          <button className="btn btn-primary" onClick={handleOnclick}>
            Back to the main page
          </button>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>Typing Test Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Time's up!</h3>
          <p>You correctly typed {results} words.</p>
          {showGif && (
            <div className="gif-container">
              <img src="/1.gif" alt="Celebration GIF" />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
