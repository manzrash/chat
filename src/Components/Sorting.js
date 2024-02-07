import React, { useState } from "react";
import useHelper from "../hooks/useHelper";
import Button from "./Button";

const Sorting = ({ unsortedData, onSorting }) => {
  const [sortType, setSortType] = useState("asc");
  const { sortListByDateAsc, sortListByDateDes } = useHelper();

  const handleSort = () => {
    if (sortType === "asc") {
      const sortedData = sortListByDateDes(unsortedData);
      onSorting(sortedData);
      setSortType("des");
    } else {
      const sortedData = sortListByDateAsc(unsortedData);
      onSorting(sortedData);
      setSortType("asc");
    }
  };
  return (
    <div className="sortContainer">
      <Button
        btnType="sortBtn"
        name={`Sort by: Date and Time ${sortType === "asc" ? "⬇" : "⬆"}`}
        handleClick={handleSort}
      />
    </div>
  );
};

export default Sorting;
