import React from "react";

const SingleItem = ({ item, onDrag, index }) => {
  return (
    <>
      <div
        key={item}
        className="itemContainer"
        draggable
        onDrag={onDrag}
        data-index={index}
      >
        <div className="itemHeader"> {item.task}</div>
        <div className="itemDescription">{item.description}</div>
      </div>
    </>
  );
};

export default SingleItem;
