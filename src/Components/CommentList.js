import { useState, useRef, useEffect } from "react";
import useHelper from "../hooks/useHelper";
import Button from "./Button";
import CommentInput from "./CommentInput";
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";

const Comment = ({ addReply, editComment, deleteComment, comment }) => {
  const [isEdit, setEdit] = useState(false);
  const [isReply, setReply] = useState(false);
  const { dateFormate } = useHelper();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [isEdit]);

  const onEditClick = () => {
    setEdit(!isEdit);
  };

  const onReply = () => {
    setReply(!isReply);
  };

  const onSaveEdit = () => {
    editComment(comment.id, inputRef?.current?.innerText);
    setEdit(!isEdit);
  };

  const onDeleteClick = () => {
    deleteComment(comment.id);
  };

  return (
    <div>
      <div className="boxContainer">
        <div>
          <div className="autherAndDate">
            <div className="author"> {comment.author}</div>
            <div className="date">{dateFormate(comment.date)}</div>
          </div>
        </div>
        <span
          contentEditable={isEdit}
          suppressContentEditableWarning={isEdit}
          ref={inputRef}
          className={isEdit ? "editInput" : "commentContainer"}
          style={{ wordWrap: "break-word" }}
        >
          {comment.comment}
        </span>
        <div>
          {!isEdit ? (
            <>
              {comment.type !== "reply" && (
                <Button name="Reply" handleClick={onReply} btnType="textBtn" />
              )}
              <Button name="Edit" handleClick={onEditClick} btnType="textBtn" />
            </>
          ) : (
            <>
              <Button name="Save" handleClick={onSaveEdit} btnType="textBtn" />
              <Button
                name="Cancel"
                btnType="textBtn"
                handleClick={() => {
                  if (inputRef.current) {
                    inputRef.current.innerText = comment.comment;
                  }
                  setEdit(!isEdit);
                }}
              />
            </>
          )}
        </div>
        <div className="delIcon" onClick={onDeleteClick}>
          <DeleteIcon width="18px" height="18px" />
        </div>
      </div>

      <div style={{ paddingLeft: 25 }}>
        {isReply ? (
          <CommentInput
            type="Reply"
            addComment={addReply}
            commentId={comment.id}
          />
        ) : null}
        {comment?.items?.map((cmnt) => {
          return (
            <Comment
              key={cmnt.id}
              addReply={addReply}
              editComment={editComment}
              deleteComment={deleteComment}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
