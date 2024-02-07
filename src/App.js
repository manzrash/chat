import { useState, useEffect } from "react";
import useUpdateComment from "./hooks/useUpdateComment";
import useHelper from "./hooks/useHelper";
import CommentList from "./Components/CommentList";
import CommentInput from "./Components/CommentInput";
import "./index.css";
import Sorting from "./Components/Sorting";

const App = () => {
  const [commentsData, setCommentsData] = useState([]);

  const { addComment, addReply, edit, remove } = useUpdateComment();
  const { getDataFromLocalStorage, storeToLocalStorage } = useHelper();

  useEffect(() => {
    const newData = getDataFromLocalStorage();
    setCommentsData(newData);
    // eslint-disable-next-line
  }, []);

  const newComment = (data) => {
    const updatedcommentlist = addComment(commentsData, data);
    storeToLocalStorage(updatedcommentlist);
    setCommentsData([...updatedcommentlist]);
  };

  const newReply = (commentId, data) => {
    const updatedcommentlist = addReply(commentsData, commentId, data);
    storeToLocalStorage(updatedcommentlist);
    setCommentsData([...updatedcommentlist]);
  };

  const editPost = (commentId, data) => {
    const updatedcommentlist = edit(commentsData, commentId, data);
    storeToLocalStorage(updatedcommentlist);
    setCommentsData([...updatedcommentlist]);
  };

  const deletePost = (commentId) => {
    const updatedcommentlist = remove(commentsData, commentId);
    storeToLocalStorage(updatedcommentlist);
    setCommentsData([...updatedcommentlist]);
  };

  const handleSorting = (data) => {
    setCommentsData([...data]);
  };


  return (
    <div className="App">
      <CommentInput type="Comment" addComment={newComment} />
      <Sorting unsortedData={commentsData} onSorting={handleSorting} />
      {commentsData?.map((cmnt) => {
        return (
          <CommentList
            key={cmnt.id}
            comment={cmnt}
            addReply={newReply}
            editComment={editPost}
            deleteComment={deletePost}
          />
        );
      })}
    </div>
  );
};

export default App;
