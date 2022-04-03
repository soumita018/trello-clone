import "./App.css";
// import SingleItem from "./components/SingleItem";
import { useRef, useState } from "react";
import SingleItem from "./components/SingleItem";

function App() {
  const [taskMainList, setTaskMainList] = useState([
    {
      task: "one",
      description: "This is one",
      status: "created",
    },
    {
      task: "two",
      description: " This is two",
      status: "done",
    },
    {
      task: "three",
      description: " This is three",
      status: "created",
    },
  ]);
  const dragId = useRef();
  function dragStart(event) {
    console.log(event.target.dataset.index);
    dragId.current = event.target.dataset.index;
    event.target.style.border = "8px solid blue";
  }
  function dragEnter(event) {
    // console.log(event.target.className, "gjghghjghfjh,dragEnter");
    if (event.target.className.includes("droptarget")) {
      document.getElementById("demo").innerHTML = "Entered the dropzone";
      event.target.style.border = "8px solid red";
    }
  }

  function dragLeave(event) {
    document.getElementById("demo").innerHTML = event.target.className;
    // // console.log(event.target.className, "gjghghjghfjh,dragleave");
    if (event.target.className.includes("droptarget")) {
      document.getElementById("demo").innerHTML = "Left the dropzone";
      event.target.style.border = "8px solid purple";
    }
  }

  function allowDrop(event) {
    event.preventDefault();
    document.getElementById("demo").innerHTML = "allow zone";
  }
  function drop(event) {
    event.preventDefault();
    let copyMainList = [...taskMainList];
    let dragIndex = dragId.current;
    copyMainList[dragIndex].status =
      copyMainList[dragIndex].status === "done" ? "created" : "done";
    console.log(copyMainList);
    event.target.style.border = "8px solid purple";
    setTaskMainList(copyMainList);
  }

  return (
    <>
      <div className="container">
        <div
          className="toDoContainer droptarget"
          onDragEnter={(e) => dragEnter(e)} //fires when drag the item(draggable element selection enters a valid drop target)(r<-l)
          onDragLeave={dragLeave} // fires when drag leave(draggable element is about to enter or leave a drop target. )(l->r)
          onDragOver={(e) => allowDrop(e)} //occurs when the dragged element is over the drop target(r<-l)
          onDrop={(e) => drop(e)} //occurs when the dragged element is over the drop target(r<-l)
        >
          <h4>Todo List</h4>
          {/* <div
            onDrag={(e) => dragStart(e)}
            draggable
            id="dragtarget"
            ref={dragItem}
          >
            <div className="itemHeader"> drag</div>
            <div className="itemDescription">
              Lorem ipsum dolor, sit amet consectetur adit inventore libero
              deleniti iusto quasi beatae, minima eveniet?
            </div>
          </div> */}
          {taskMainList.map((item, index) =>
            item.status === "created" ? (
              <SingleItem
                key={index}
                onDrag={dragStart}
                index={index}
                item={item}
              />
            ) : (
              ""
            )
          )}
        </div>
        <div className="verticalLine"></div>
        <div
          className="doneContainer droptarget"
          onDragLeave={(e) => dragLeave(e)} // fires when drag leave(draggable element is about to enter or leave a drop target. )(r->l)
          onDragEnter={(e) => dragEnter(e)} //fires when drag the item(draggable element selection enters a valid drop target)(l->r)
          onDragOver={(e) => allowDrop(e)} //occurs when the dragged element is over the drop target(l->r)
          onDrop={(e) => drop(e)} //occurs when the dragged element is over the drop target(l->r)
        >
          <h4>Done List</h4>
          {taskMainList.map((item, index) =>
            item.status === "done" ? (
              <SingleItem
                key={index}
                onDrag={dragStart}
                index={index}
                item={item}
              />
            ) : (
              ""
            )
          )}
        </div>
        <p id="demo"></p>
      </div>
    </>
  );
}

export default App;
