import React, { useState, useRef } from "react";
import "./styles.css";

const DailyTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [activity, setActivity] = useState([]);
  const inputRef = useRef(null);
  const days = 30;
  const todayIndex = new Date().getDate() - 1; // Get today's index

  //  Determine the day's completion status for shading
  const toggleActivity = (dayIndex) => {
    const completedTasks = activity.map((task) => task[dayIndex]);
    const completedCount = completedTasks.filter(Boolean).length;
    const totalTasks = tasks.length;

    if (totalTasks === 0) return "no-work"; // No tasks exist
    return completedCount === totalTasks
      ? "full-day" // All tasks completed
      : completedCount > 0
      ? "partial-day" // Some tasks completed
      : "no-work"; // No tasks completed
  };

  //  Toggle the task completion for today
  const toggleTaskActivity = (taskIndex) => {
    setActivity((prev) => {
      const newActivity = [...prev];
      newActivity[taskIndex] = [...newActivity[taskIndex]]; // Copy array to avoid mutation
      newActivity[taskIndex][todayIndex] = !newActivity[taskIndex][todayIndex]; // Toggle only today’s value
      return newActivity;
    });
  };

  //  Add a new task
  const addTask = () => {
    setTasks((prev) => [...prev, ""]);
    setActivity((prev) => [...prev, Array(days).fill(false)]); // New task starts with all days unchecked
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  //  Update task name
  const updateTask = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  //  Delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    setActivity(activity.filter((_, i) => i !== index));
  };

  //  Handle Enter key to add a task
  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div className="container">
      <h1 className="title">Daily Activity Tracker</h1>
      <div className="tracker-box">
        <div className="task-grid">
          {/* Task List */}
          <div className="tasks-section">
            <h2>Tasks</h2>
            {tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="task-item">
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={activity[taskIndex]?.[todayIndex] || false} // ✅ Check only today's status
                  onChange={() => toggleTaskActivity(taskIndex)}
                />
                <input
                  type="text"
                  ref={taskIndex === tasks.length - 1 ? inputRef : null}
                  value={task}
                  onChange={(e) => updateTask(taskIndex, e.target.value)}
                  className="task-input"
                  placeholder="Enter task..."
                  onKeyDown={handleKeyDown}
                />
                <button className="delete-btn" onClick={() => deleteTask(taskIndex)}>❌</button>
              </div>
            ))}
            <button onClick={addTask} className="add-task-btn">+ Add Task</button>
          </div>

          {/* Activity Grid */}
          <div className="activity-section">
            <h2>Activity</h2>
            <div className="grid">
              {Array.from({ length: days }).map((_, dayIndex) => (
                <div key={dayIndex} className={`day-box ${toggleActivity(dayIndex)}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTracker;



