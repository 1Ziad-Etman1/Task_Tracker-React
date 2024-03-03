import EditTask from "./EditTask";

import { useEffect, useState } from "react";

const ToDo = ({ task, index, taskList, setTaskList }) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleDelete = (e) => {
    e.preventDefault();
    let tasks = taskList.filter((t) => t !== task);
    setTaskList(tasks);
  };

  return (
    <>
      <div className="flex flex-col flex-wrap items-start justify-start bg-white my-4 ml-6 py-4 px-6 w-3/4 max-w-lg">
        <div className="w-full flex flex-row justify-between">
          <p className="font-semibold text-xl ">{task.projectName}</p>
          <EditTask
            task={task}
            index={index}
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
        <p className="text-lg py-2">{task.taskDescription}</p>
        <div className="w-full flex sm:flex-col md:flex-row items-center justify-between">
          <div className="w-1/4 text-xl font-semibold py-4">
            <span>{("0" + Math.floor((time / 3600000) % 24)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
            <span className="text-sm">
              {("0" + Math.floor((time / 10) % 100)).slice(-2)}
            </span>
          </div>
          <div className=" flex flex-row justify-evenly gap-4">
            {running ? (
              <>
                <button
                  className="border rounded-lg py-1 px-3"
                  onClick={() => {
                    setRunning(false);
                  }}
                >
                  Stop
                </button>
              </>
            ) : (
              <>
                <button
                  className="border rounded-lg py-1 px-3"
                  onClick={() => {
                    setRunning(true);
                  }}
                >
                  Start
                </button>
              </>
            )}
            <button
              className="border rounded-lg py-1 px-3"
              onClick={() => {
                setTime(0);
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            className="bg-red-500 text-white text-sm uppercase font-semibold mt-6 mb-1 py-1.5 px-3 rounded-lg"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ToDo;
