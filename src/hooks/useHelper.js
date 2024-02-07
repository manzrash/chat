const useHelper = () => {
  const dateFormate = (date) => {
    const userDate = new Date(date);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    return userDate.toLocaleDateString("en-GB", options);
  };

  const storeToLocalStorage = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
  };

  const getDataFromLocalStorage = () => {
    const jsonData = localStorage.getItem("userData");
    if (jsonData) {
      return JSON.parse(jsonData);
    }
    return [];
  };

  const sortListByDateAsc = (items) => {
    const sortedItems = [...items].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    sortedItems.forEach((item) => {
      item.items.sort((a, b) => new Date(a.date) - new Date(b.date));
    });
    return sortedItems;
  };

  const sortListByDateDes = (items) => {
    const sortedItems = [...items].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    sortedItems.forEach((item) => {
      item.items.sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    return sortedItems;
  };

  return {
    dateFormate,
    storeToLocalStorage,
    getDataFromLocalStorage,
    sortListByDateAsc,
    sortListByDateDes,
  };
};

export default useHelper;
