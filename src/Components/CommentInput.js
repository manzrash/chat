import { useState } from "react";
import Button from "./Button";

const CommentInput = ({ type, addComment, commentId = undefined, btn }) => {
  const [author, setAuthor] = useState("");
  const [post, setPost] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const nameRgex = /^[a-zA-Z]{3,15}$/;
    const name = nameRgex.test(author);
    if (!name) {
      setErrors({
        name: "Name must consist of alphabetical characters and have a minimum length of 3 and a maximum length of 15.",
      });
      return;
    }
    if (post.length < 2 && post.length > 151) {
      setErrors({
        comment:
          "Comment/Reply must have minimum length of 3 and a maximum length of 150",
      });
      return;
    }
    setErrors({});
    const newId = Date.now() + Math.random();
    const data = {
      id: newId,
      author,
      post,
    };
    type === "Comment" ? addComment(data) : addComment(commentId, data);
    console.log("Form submitted successfully!");
    setAuthor("");
    setPost("");
  };

  return (
    <div className="boxContainer">
      <span className="inputBoxHeading">{type}</span>
      <form onSubmit={onSubmit} className="formAlign">
        <div className="formElement">
          <input
            type="text"
            autoFocus
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Name"
          />
          {errors.name && <span className="errorText">{errors.name}</span>}
        </div>
        <div className="formElement">
          <textarea
            rows="3"
            name="comment"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder="Comment"
          />
          {errors.comment && (
            <span className="errorText">{errors.comment}</span>
          )}
        </div>
        <Button btnType="postBtn" name="Post" handleClick={onSubmit} />
      </form>
    </div>
  );
};

export default CommentInput;
