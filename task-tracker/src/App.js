import logo from "./logo.svg";
import AddTask from "./components/AddTask";
import React, { useState } from "react";
import ToDo from "./components/ToDo";

function App() {
  const [taskList, setTaskList] = useState([]);
  console.log(taskList);
  return (
    <>
      <h1 className="text-2xl font-bold py-6 pl-6">Task Tracker</h1>
      <p className="text-xl pl-6">hi there</p>
      <div className="flex flex-row items-center">
        <p className="text-xl pl-6">click</p>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
        <p className="text-xl my-2">to add task</p>
      </div>
      <div>
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
    </>
  );
}

export default App;
