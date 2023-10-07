import React, { useState } from "react";
import { FeedbackProps } from "./interfaces";


export const Feedback = (props: FeedbackProps) => {
//     return <div className="feedback-container">
//         Leave a rating
//         s s s s 
//     </div> 
// }
const [rating, setRating] = useState(0);
const [hover, setHover] = useState(0);
return (
  <div className="star-rating" style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px'}}>
    <div style={{ fontWeight: 'bold' ,fontSize: '15px'}}>Rate our demo</div>
    <style>
        {`
          button {
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
          }
          .on {
            color: #FFA500;
          }
          .off {
            color: #ccc;
          }
        `}
      </style>
    {[...Array(5)].map((star, index) => {
      index += 1;
      return (
        <button
          type="button"
          key={index}
          className={index <= (hover || rating) ? "on" : "off"}
          onClick={() => setRating(index)}
          onMouseEnter={() => setHover(index)}
          onMouseLeave={() => setHover(rating)}
        >
          <span className="star">&#9733;</span>
        </button>
      );
    })}
  </div>
)}