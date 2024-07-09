import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image1 from "./lady.svg"; 
import Image2 from "./gentleman.svg"; 

export default function Window1() {
  const [testdifficulty, settestdifficulty] = useState("Easy");
  const navigate = useNavigate();

  const handledifficultychange = (event) => {
    settestdifficulty(event.target.value);
  };

  const handleOnclick = ()=>{
    navigate("/Window2");
  };

  return (
    <>
      <div className="container my-5">
        <div className="header my-10">
          <h2>Check your typing skills in a minute</h2>
        </div>
        <div className="row align-items-center">
          <div className="col-md-4">
            <img src={Image1} alt="" className="img-fluid" />
          </div>
          <div className="col-md-4 text-center">
            <div className="test-options">
              <label><h4>Select Level</h4></label>
              <select
                value={testdifficulty}
                onChange={handledifficultychange}
                className="form-select"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <div className="buttons">
              <button className="btn btn-primary my-3" onClick={handleOnclick}>
                Start Test
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <img src={Image2} alt="" className="img-fluid" />
          </div>
        </div>
      </div>
    </>
  );
}
