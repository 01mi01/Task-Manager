import { useState, useEffect } from "react";
import axios from "../axios";

import DashboardNavbar from "./DashboardNavbar";

function Dashboard() {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#131315] relative">
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-[#787bff] opacity-30 rounded-full blur-2xl animate-pulse transform -translate-x-1/2 -translate-y-1/2"></div>

      <DashboardNavbar />

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-24 sm:mt-32 md:mt-32 lg:mt-28 lg:mb-4 text-white z-10 text-center">
        Your Tasks
      </h2>

      <button
        onClick={() => setShowForm(!showForm)}
        className="text-white px-6 py-2 rounded mt-4 sm:mt-6 mb-4 sm:mb-8 z-10"
      >
        {showForm ? "Go back" : "Add Task"}
      </button>

      {showForm && (
        <form
          onSubmit={handleCreateTask}
          className="mt-4 w-full max-w-xl z-10 space-y-4 mx-68 sm:mx-6 md:mx-12 lg:mx-24"
        >
          <div>
            <label htmlFor="title" className="text-white">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              required
              className="border p-2 mt-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="description" className="text-white">
              Description
            </label>
            <textarea
              id="description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="border p-2 mt-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="color" className="text-white">
              Color
            </label>
            <select
              id="color"
              value={newTask.color}
              onChange={(e) =>
                setNewTask({ ...newTask, color: e.target.value })
              }
              className="border p-2 mt-2 w-full "
            >
              <option
                value=""
                style={{ backgroundColor: "#0f1011", color: "white" }}
              >
                Choose a color
              </option>
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
                  style={{ backgroundColor: "#0f1011", color: "white" }}
                >
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dueDate" className="text-white">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
              className="border p-2 mt-2 w-full"
            />
          </div>

          <button
            type="submit"
            className="text-white px-6 py-2 rounded mt-6 mb-12 z-10"
          >
            Create Task
          </button>
        </form>
      )}

      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10 w-full max-w-7xl">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl mx-2 mb-6 shadow-xl p-4 sm:p-6 transition duration-300 hover:scale-[1.02]"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                {task.title}
              </h3>
              <p className="mt-2">
                <strong>Description:</strong>{" "}
                {task.description || "No description"}
              </p>
              <p className="mt-1">
                <strong>Color:</strong>{" "}
                <span
                  className="px-2 py-1 rounded text-white"
                  style={{ backgroundColor: task.color || "#888" }}
                >
                  {task.color || "None"}
                </span>
              </p>
              <p className="mt-1">
                <strong>Due Date:</strong> {task.dueDate || "No due date"}
              </p>
              <p className="mt-1">
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
                  className="mt-4 w-full text-white py-2 rounded-lg"
                >
                  Update
                </button>
              )}

              {confirmDelete === task.id && (
                <div className="mt-4 p-4 rounded-lg text-sm flex flex-col items-center justify-center">
                  <p>Are you sure you want to delete this task?</p>
                  <div className="mt-2 flex flex-col sm:flex-row gap-2 justify-center items-center">
                    <button
                      onClick={handleConfirmDelete}
                      className="text-white px-3 py-1 rounded"
                    >
                      Yes
                    </button>
                    <button
                      onClick={handleCancelDelete}
                      className="text-white px-3 py-1 rounded"
                    >
                      No
                    </button>
                  </div>
                </div>
              )}

              {editingTaskId === task.id && (
                <form className="mt-4 space-y-4">
                  <div>
                    <label htmlFor={`edit-title-${task.id}`}>Title</label>
                    <input
                      id={`edit-title-${task.id}`}
                      type="text"
                      value={editTask.title}
                      onChange={(e) =>
                        setEditTask({ ...editTask, title: e.target.value })
                      }
                      className="w-full p-2 bg-white/10 text-white border rounded"
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
                      className="w-full p-2 bg-white/10 text-white border rounded"
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
                      className="w-full p-2 bg-white/10 text-white border rounded"
                    >
                      <option
                        value=""
                        style={{ backgroundColor: "#0f1011", color: "white" }}
                      >
                        Choose a color
                      </option>
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
                          style={{ backgroundColor: "#0f1011", color: "white" }}
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
                      className="w-full p-2 bg-white/10 text-white border rounded"
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
                        setError(
                          err.response?.data?.error || "Error updating task."
                        );
                      }
                    }}
                    className="text-white px-4 py-2 rounded mt-4"
                  >
                    Save Changes
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white z-10 max-w-md">
          You don't have any tasks yet. Create a new one.
        </p>
      )}
    </div>
  );
}

export default Dashboard;
