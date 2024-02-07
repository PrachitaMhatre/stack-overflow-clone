import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import "./css/AllQuestion.css";
import ReactHtmlParser from "react";

function AllQuestions({ question }) {
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  let tags = JSON.parse(question?.tags[0]);
  return (
    <div className="all-questions">
      <div className="all=questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="all-option">
              <p>0</p>
              <span>Votes</span>
            </div>
            <div className="all-option">
              <p>{question?.answerDetails?.length}</p>
              <span>Answers</span>
            </div>
            <div className="all-option">
              <small>0 Views</small>
            </div>
          </div>
          <div className="question-answer">
            <Link to={`/question?q=${question?._id}`}>{question?.title}</Link>
            <div
              style={{
                width: "90%",
              }}
            >
              <div>{ReactHtmlParser(truncate(question?.body, 200))}</div>
            </div>
          </div>
          {tags.map((_tag) => (
            <>
              <div
                style={{
                  display: "flex",
                }}
              >
                {}
                <span className="questions-tags">{_tag}</span>
              </div>
            </>
          ))}

          <div className="author">
            <small>{new Date(question?.created_at).toLocaleString()}</small>
            <div className="author-details">
              <Avatar src={question?.user?.photo} />
              <p>
                {question?.user?.displayName
                  ? question?.user?.displayName
                  : String(question?.user?.email).split("@")[0]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllQuestions;
