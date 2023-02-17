import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";

export const PostNewMessage = () => {
  const { authState } = useOktaAuth();

  // required fields for posting a message
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");

  // flag of show warning prompt, show success prompt
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  return (
    <div className="card mt-3">
      <div className="card-header">Ask question to Ants Route Admin</div>
      <div className="card-body"></div>
      <form method="POST">
        {/* Show different message based on user's input */}
        {displayWarning && (
          <div className="alert alert-danger" role="alert">
            All fields must be filled out
          </div>
        )}
        {displaySuccess && (
          <div className="alert alert-success" role="alert">
            Question added successfully
          </div>
        )}
        {/* input for title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        {/* 3 rows textarea for question */}
        <div className="mb-3">
          <label className="form-label">Question</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
          ></textarea>
        </div>
        {/* Submit button */}
        <div>
          <button type="button" className="btn btn-primary mt-3">
            Submit Question
          </button>
        </div>
      </form>
    </div>
  );
};
