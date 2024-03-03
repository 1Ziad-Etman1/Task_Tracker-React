import logo from "./logo.svg";
import AddTask from "./components/AddTask";
import React, { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
function App() {
  const [taskList, setTaskList] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    let array = localStorage.getItem("taskList");

    if (array) {
      setTaskList(JSON.parse(array));
    }
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) =>
      addToCompleted(
        item.id,
        item.projectName,
        item.taskDescription,
        item.timestamp,
        item.duration
      ),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToCompleted = (
    id,
    projectName,
    taskDescription,
    timestamp,
    duration
  ) => {
    const moveTask = taskList.filter((task) => id === task.id);
    setCompleted((completed) => [
      ...completed,
      { moveTask, projectName, taskDescription, timestamp, duration },
    ]);
  };

  return (
    <>
      <h1 className="text-2xl font-bold py-6 pl-6">Task Tracker</h1>
      <p className="text-xl pl-6">hi there</p>
      <div className="flex flex-row items-center">
        <p className="text-xl pl-6">click</p>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
        <p className="text-xl my-2">to add task</p>
      </div>
      <div className="flex flex-row">
        <div className="w-full">
          <h2 className="ml-6 text-xl w-3/4 max-w-lg font-semibold w-max-lg py-2 px-4 bg-gray-300">
            To Do:
          </h2>
          {taskList.map((task, i) => (
            <ToDo
              key={i}
              task={task}
              index={i}
              taskList={taskList}
              setTaskList={setTaskList}
            />
          ))}
        </div>
        <div className="w-full flex flex-col" ref={drop}>
          <h2 className="text-xl w-3/4 max-w-lg font-semibold w-max-lg py-2 px-4 bg-gray-300">
            Completed:
          </h2>
          {completed.map((task, i) => (
            <ToDo
              key={i}
              task={task}
              index={i}
              taskList={taskList}
              setTaskList={setTaskList}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
