import React, { useState } from "react";

const Todos = ({ isDarkTheme, todo, getTodos }) => {
  const deleteTodo = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/todo/todos/" + todo.id,
      { method: "DELETE" }
    );
    const data = response.json();
    getTodos();
    return data;
  };

  const changeDone = async () => {
    const toggle = !todo.is_done;
    const response = await fetch(
      `https://playground.4geeks.com/todo/todos/${todo.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ label: todo.label, is_done: toggle }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    getTodos();
    return data;
  };

  return (
    <div
      className="rounded row"
      style={{
        backdropFilter: "blur(10px)",
        backgroundColor: isDarkTheme
          ? "rgba(80, 0, 145, 0.5)"
          : "rgba(255, 190, 40, 0.5)",
        overflow: "hidden",
      }}
    >
      <div className="col-2" onClick={changeDone}>
        {todo.is_done ? "☑" : "☐"}
      </div>
      <div className="col-8 d-flex justify-content-center">{todo.label}</div>
      <div className="col-2" onClick={deleteTodo}>
        X
      </div>
    </div>
  );
};

export default Todos;
