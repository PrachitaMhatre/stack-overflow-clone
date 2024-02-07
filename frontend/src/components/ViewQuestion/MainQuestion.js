import { Avatar } from "@mui/material";
import React, { useEffect, comment, setComment, question } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HistoryIcon from "@mui/icons-material/History";
import { Link } from "react-router-dom";
import { ReactQuill, Editor } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import { useState } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
//import { useSelector } from "react-redux";
//import { selectUser } from "../../features/userSlice";
//import Editor from "react-quill/lib/toolbar";
//import Editor from "react-quill/api/toolbar";

function MainQuestion() {
  const [show, setShow] = useState(false);
  const [answer, setAnswer] = useState("");
  const [comment, setComment] = useState("");
  const user = useSelector(selectUser);

  const [questionData, setQuestionData] = useState();

  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");

  const handleQuill = (value) => {
    setAnswer(value);
  };

  useEffect(() => {
    async function getQuestionDetails() {
      await axios
        .get(`/api/question/${id}`)
        .then((res) => {
          console.log(res.data[0]);
          setQuestionData(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getQuestionDetails();
  }, [id]);

  async function getUpdatedAnswer() {
    await axios
      .get(`/api/question/${id}`)
      .then((res) => {
        console.log(res.data[0]);
        setQuestionData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // console.log(questionData);
  const handleSubmit = async () => {
    if (answer !== "") {
      const body = {
        question_id: id,
        answer: answer,
        user: user,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios
        .post("/api/answer", body, config)
        .then((res) => {
          console.log(res.data);
          alert("Answer added successfully");
          setAnswer("");
          getUpdatedAnswer();
        })
        .catch((err) => console.log(err));
    }

    const handleComment = async () => {
      if (comment !== "") {
        const body = {
          question_id: id,
          comment: comment,
          user: user,
        };

        await axios.post(`/api/comment/${id}, body`).then((res) => {
          console.log(res.data);
          setComment("");
          setShow(false);
          getUpdatedAnswer();
        });
      }
    };

    return (
      <div className="main">
        <div className="main-container">
          <div className="main-top">
            <h2 className="main-question">{questionData?.title} </h2>
            <Link to="/add-question">
              <button>Ask Question</button>
            </Link>
            {/* <a href="/add-question">
            <button>Ask Question</button>
          </a> */}
          </div>
          <div className="main-desc">
            <div className="info">
              <p>
                <span>
                  {new Date(questionData?.created_at).toLocaleString()}
                </span>
              </p>
              <p>
                Active<span>today</span>
              </p>
              <p>
                Viewed<span>43times</span>
              </p>
            </div>
          </div>
          <div className="all-questions">
            <div className="all-questions-container">
              <div className="all-questions-left">
                <div className="all-options">
                  <p className="arrow">▲</p>

                  <p className="arrow">0</p>

                  <p className="arrow">▼</p>

                  <BookmarkIcon />

                  <HistoryIcon />
                </div>
              </div>
              <div className="question-answer">
                <p>{ReactHtmlParser(questionData?.body)}</p>

                <div className="author">
                  <small>
                    asked{" "}
                    {new Date(questionData?.created_at).toLocaleDateString()}
                  </small>
                  <div className="auth-details">
                    <Avatar src={questionData?.user?.photo} />
                    <p>
                      {questionData?.user?.displayName
                        ? questionData?.user?.displayName
                        : String(question?.user?.email).split("@")[0]}
                    </p>
                  </div>
                </div>
                <div className="comments">
                  <div className="comment">
                    {questionData?.comments &&
                      questionData?.comments?.map((_qd) => (
                        <p>
                          {_qd?.comment} -{" "}
                          <span>
                            {_qd?.user?.displayName
                              ? _qd?.user?.displayName
                              : String(_qd?.user?.email).split("@")[0]}
                          </span>
                          <small>
                            {new Date(_qd?.created_at).toLocaleTimeString()}
                          </small>
                        </p>
                      ))}
                  </div>
                  <p onClick={() => setShow(!show)}>Add a comment</p>
                  {show && (
                    <div className="title">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        style={{
                          margin: "5px 0px",
                          padding: "10px",
                          border: "1px solid rgba(0, 0, 0, 0.2)",
                          borderRadius: "3px",
                          outline: "none",
                        }}
                        type="text"
                        placeholder="Add your comment..."
                        rows={5}
                      />
                      <button
                        onClick={handleComment}
                        style={{
                          maxWidth: "fit-content",
                        }}
                      >
                        Add comment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              flexDirection: "column",
            }}
            className="all-questions"
          >
            <p
              style={{
                marginBottom: "20px",
                fontSize: "1.3rem",
                fontWeight: "300",
              }}
            ></p>
            {questionData?.answerDetails?.length} Answer(s)
            {questionData?.answerDetails?.map((_q) => (
              <div key={_q?._id} className="all-questions-container">
                <div className="all-questions-left">
                  <div className="all-options">
                    <p className="arrow">▲</p>

                    <p className="arrow">0</p>

                    <p className="arrow">▼</p>

                    <BookmarkIcon />

                    <HistoryIcon />
                  </div>
                </div>
                <div className="question-answer">
                  <p>{ReactHtmlParser(_q?.answer)}</p>
                  <div className="author">
                    <small>
                      asked {new Date(_q?.created_at).toLocaleString()}
                    </small>
                    <div className="auth-details">
                      <Avatar src={_q?.user?.photo} />
                      <p>
                        {_q?.user?.displayName
                          ? _q?.user?.displayName
                          : String(_q?.user?.email).split("@")[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="questions">
          <div className="question">
            <AllQuestions />
            <AllQuestions />
            <AllQuestions />
            <AllQuestions />
          </div>
        </div> */}
        </div>
        <div className="main-answer">
          <h3
            style={{
              fontSize: "22px",
              margin: "10px 0",
              fontWeight: "400",
            }}
          >
            Your Answer
          </h3>
          <ReactQuill
            value={answer}
            onChange={handleQuill}
            modules={Editor.modules}
            className="react-quill"
            theme="snow"
            style={{
              height: "200px",
            }}
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          style={{
            marginTop: "100px",
            maxWidth: "fit-content",
          }}
        >
          Post your answer
        </button>
      </div>
    );
  };
}
export default MainQuestion;
