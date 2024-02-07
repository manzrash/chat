const useUpdateComment = () => {
  const addComment = function (list, item) {
    list.push({
      id: item.id,
      date: Date.now(),
      type: "comment",
      author: item.author,
      comment: item.post,
      items: [],
    });
    return list;
  };

  const addReply = function (list, commentId, item) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === commentId) {
        list[i].items.push({
          id: item.id,
          author: item.author,
          comment: item.post,
          date: Date.now(),
          type: "reply",
        });
        return list;
      }
    }
  };

  const edit = (list, commentId, value) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === commentId) {
        list[i].comment = value;
        return list;
      }
      list[i].items?.length && edit(list[i].items, commentId, value);
    }
    return [...list];
  };

  const remove = (list, id) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list.splice(i, 1);
      } else {
        list[i].items && remove(list[i].items, id);
      }
    }
    return [...list];
  };

  return { addComment, addReply, edit, remove };
};

export default useUpdateComment;
