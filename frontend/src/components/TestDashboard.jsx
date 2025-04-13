import { useState, useEffect } from "react";
import axios from "../axios";

import DashboardNavbar from "./DashboardNavbar";

function TestDashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    color: "",
    dueDate: "",
  });

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTask, setEditTask] = useState({
    title: "",
    description: "",
    color: "",
    dueDate: "",
    state: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setTasks(response.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Error fetching tasks");
      }
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const taskToCreate = {
      title: newTask.title,
      description: newTask.description || null,
      color: newTask.color || undefined,
      dueDate: newTask.dueDate || null,
    };

    try {
      const response = await axios.post("/api/tasks", taskToCreate, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setTasks([...tasks, response.data]);
      setShowForm(false);
      setNewTask({ title: "", description: "", color: "", dueDate: "" });
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Error creating task.");
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditTask({
      title: task.title,
      description: task.description || "",
      color: task.color || "",
      dueDate: task.dueDate || "",
      state: task.state || "",
    });
  };

  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDeleteConfirmation = (taskId) => {
    setConfirmDelete(taskId);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${confirmDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setTasks((prev) => prev.filter((task) => task.id !== confirmDelete));
      setConfirmDelete(null);
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Error deleting task");
      setConfirmDelete(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#131315] relative">
      <div className="absolute w-[500px] h-[500px] bg-[#787bff] opacity-30 rounded-full blur-2xl animate-pulse"></div>

      <DashboardNavbar />

      <h2 className="text-3xl font-bold mb-6 text-white z-10 text-center">
        Your Tasks
      </h2>

      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6 transition duration-300 hover:scale-[1.02]"
            >
              <h3 className="text-xl font-semibold text-white">{task.title}</h3>
              <p className="text-purple-300 mt-2">
                <strong>Description:</strong>{" "}
                {task.description || "No description"}
              </p>
              <p className="text-purple-300 mt-1">
                <strong>Color:</strong>{" "}
                <span
                  className="px-2 py-1 rounded text-white"
                  style={{ backgroundColor: task.color || "#888" }}
                >
                  {task.color || "None"}
                </span>
              </p>
              <p className="text-purple-300 mt-1">
                <strong>Due Date:</strong> {task.dueDate || "No due date"}
              </p>
              <p className="text-purple-300 mt-1">
                <strong>State:</strong>{" "}
                <span className="capitalize">{task.state}</span>
              </p>

              {task.state === "completed" ? (
                <button
                  onClick={() => handleDeleteConfirmation(task.id)}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                >
                  Delete
                </button>
              ) : (
                <button
                  onClick={() => handleEditClick(task)}
                  className="mt-4 w-full bg-[#67d4cf] hover:bg-[#50b7a1] text-white py-2 rounded-lg"
                >
                  Update
                </button>
              )}

              {confirmDelete === task.id && (
                <div className="mt-4 bg-gray-800/60 p-4 rounded-lg text-sm text-purple-100">
                  <p>Are you sure you want to delete this task?</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={handleConfirmDelete}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Yes
                    </button>
                    <button
                      onClick={handleCancelDelete}
                      className="bg-purple-300 text-gray-900 px-3 py-1 rounded"
                    >
                      No
                    </button>
                  </div>
                </div>
              )}

              {editingTaskId === task.id && (
                <form className="mt-4 space-y-4 text-purple-200">
                  <div>
                    <label htmlFor={`edit-title-${task.id}`}>Title</label>
                    <input
                      id={`edit-title-${task.id}`}
                      type="text"
                      value={editTask.title}
                      onChange={(e) =>
                        setEditTask({ ...editTask, title: e.target.value })
                      }
                      className="w-full p-2 bg-white/10 text-white border border-[#67d4cf] rounded"
                    />
                  </div>

                  <div>
                    <label htmlFor={`edit-description-${task.id}`}>
                      Description
                    </label>
                    <textarea
                      id={`edit-description-${task.id}`}
                      value={editTask.description}
                      onChange={(e) =>
                        setEditTask({
                          ...editTask,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2 bg-white/10 text-white border border-[#67d4cf] rounded"
                    />
                  </div>

                  <div>
                    <label htmlFor={`edit-color-${task.id}`}>Color</label>
                    <select
                      id={`edit-color-${task.id}`}
                      value={editTask.color}
                      onChange={(e) =>
                        setEditTask({ ...editTask, color: e.target.value })
                      }
                      className="w-full p-2 bg-white/10 text-white border border-[#67d4cf] rounded"
                    >
                      <option value="">Choose a color</option>
                      {[
                        "red",
                        "orange",
                        "yellow",
                        "green",
                        "mint",
                        "teal",
                        "cyan",
                        "blue",
                        "indigo",
                        "purple",
                        "pink",
                        "brown",
                      ].map((color) => (
                        <option
                          key={color}
                          value={color}
                          style={{ backgroundColor: color, color: "white" }}
                        >
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor={`edit-dueDate-${task.id}`}>Due Date</label>
                    <input
                      id={`edit-dueDate-${task.id}`}
                      type="date"
                      value={editTask.dueDate}
                      onChange={(e) =>
                        setEditTask({ ...editTask, dueDate: e.target.value })
                      }
                      className="w-full p-2 bg-white/10 text-white border border-[#67d4cf] rounded"
                    />
                  </div>

                  <div>
                    <label className="mr-2">Advance state:</label>
                    <input
                      type="checkbox"
                      onChange={() => {
                        if (editTask.state === "pending") {
                          setEditTask({ ...editTask, state: "in progress" });
                        } else if (editTask.state === "in progress") {
                          setEditTask({ ...editTask, state: "completed" });
                        }
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const response = await axios.put(
                          `/api/tasks/${task.id}`,
                          {
                            title: editTask.title,
                            description: editTask.description || null,
                            color: editTask.color || undefined,
                            dueDate: editTask.dueDate || null,
                            state: editTask.state || task.state,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                "authToken"
                              )}`,
                            },
                          }
                        );

                        setTasks((prev) =>
                          prev.map((t) =>
                            t.id === task.id ? response.data.task : t
                          )
                        );
                        setEditingTaskId(null);
                        setEditTask({
                          title: "",
                          description: "",
                          color: "",
                          dueDate: "",
                          state: "",
                        });
                        setError("");
                      } catch (err) {
                        if (err.response) {
                          setError(
                            err.response.data?.error || "Error updating task."
                          );
                        } else {
                          setError("Network error or other issue");
                        }
                      }
                    }}
                    className="bg-purple-600 text-white px-4 py-2 rounded mt-4"
                  >
                    Save Changes
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white">No tasks available.</p>
      )}

<button
  onClick={() => setShowForm(!showForm)}
  className="bg-purple-500 text-white px-4 py-2 rounded mt-4"
  style={{ zIndex: 10 }} 
>
  {showForm ? "Cancel" : "Add Task"}
</button>

{showForm && (
  <form
    onSubmit={handleCreateTask}
    className="mt-4"
    style={{ zIndex: 10 }} 
  >
    <div>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={newTask.title}
        onChange={(e) =>
          setNewTask({ ...newTask, title: e.target.value })
        }
        required
        className="border border-purple-400 p-2 mt-2 w-full text-purple-700"
      />
    </div>

    <div>
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
        className="border border-purple-400 p-2 mt-2 w-full text-purple-700"
      />
    </div>

    <div>
      <label htmlFor="color">Color</label>
      <select
        id="color"
        value={newTask.color}
        onChange={(e) =>
          setNewTask({ ...newTask, color: e.target.value })
        }
        className="border border-purple-400 p-2 mt-2 w-full text-purple-700"
      >
        <option value="">Choose a color</option>
        {[
          "red",
          "orange",
          "yellow",
          "green",
          "mint",
          "teal",
          "cyan",
          "blue",
          "indigo",
          "purple",
          "pink",
          "brown",
        ].map((color) => (
          <option
            key={color}
            value={color}
            style={{ backgroundColor: color, color: "white" }}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label htmlFor="dueDate">Due Date</label>
      <input
        id="dueDate"
        type="date"
        value={newTask.dueDate}
        onChange={(e) =>
          setNewTask({ ...newTask, dueDate: e.target.value })
        }
        className="border border-purple-400 p-2 mt-2 w-full text-purple-700"
      />
    </div>

    <button
      type="submit"
      className="bg-purple-600 text-white px-4 py-2 rounded mt-4"
    >
      Create Task
    </button>
  </form>
)}

    </div>
  );
}

export default TestDashboard;
