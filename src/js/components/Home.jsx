import React, { useState, useEffect } from "react";
import Todos from "./Todos.jsx";

//include images into your bundle
import todolight from "../../img/todolight.png";
import tododark from "../../img/tododark.png";
import todologolight3 from "../../img/todologolight3.png";
import todologodark from "../../img/todologodark.png";

//create your first component

const Home = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    createUser();
  }, []);
  {
    /* useEffect runs on load of the app, here we use it to create the user every time */
  }

  const createUser = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/todo/users/phoenixreynolds",
      { method: "POST" }
    );
    const data = await response.json();
    getTodos();
    return data;
  };

  const getTodos = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/todo/users/phoenixreynolds"
    );
    const data = await response.json();
    setTodos(data.todos);
    return data;
  };

  const postTodo = async (event) => {
    if (event.key === "Enter") {
      const response = await fetch(
        "https://playground.4geeks.com/todo/todos/phoenixreynolds",
        {
          method: "POST",
          body: JSON.stringify({
            label: inputValue,
            is_done: false,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setInputValue("");
      getTodos();
      return data;
    }
  };

  const deleteAllTodos = async () => {
  while (todos.length > 0) {
    const todo = todos[0];
    await fetch(`https://playground.4geeks.com/todo/todos/${todo.id}`, {
      method: "DELETE",
    });
    todos.shift();
  }
  getTodos();
};

  return (
    <div
      className={`d-flex flex-column ${isDarkTheme ? "text-light" : "text-dark"
        }`}
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${isDarkTheme ? tododark : todolight})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex-grow-1">
        {" "}
        {/* Content */}
        <div className="container">
          <div className="mx-auto" style={{ height: "15rem", width: "15rem" }}>
            <img
              src={isDarkTheme ? todologodark : todologolight3}
              alt="Site Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block"
              }}
            />
          </div>
        </div>
        <div className="container">
          <div
            className="row align-items-center"
          >
            <div className="col-6 d-flex flex-column justify-content-center">

              <div
                className="rounded"
                style={{
                  backdropFilter: "blur(10px)",
                  backgroundColor: isDarkTheme
                    ? "rgba(80, 0, 145, 0.5)"
                    : "rgba(255, 190, 40, 0.5)",
                  overflow: "hidden",
                }}
              >
                {" "}
                <input
                  className={`form-control ${isDarkTheme ? "dark-placeholder" : ""} border-0 focus-ring-0 px-3`}
                  style={{
                    backgroundColor: "rgba(255,255,255,0)",
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                    "::placeholder": {color: isDarkTheme ? "lightgrey" : "gray"}
                  }}
                  value={inputValue}
                  placeholder="I need to..."
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={(event) => postTodo(event)}
                ></input>{" "}
              </div>
              <div>
              <button
              title={isDarkTheme ? "It's too dark!" : "It's too bright!"}
                className={`btn rounded-circle ${isDarkTheme ? "btn-dark" : "btn-light"
                  } border-0 mt-1`}
                style={{
                  height: "2.5rem",
                  width: "2.5rem",
                  backgroundColor: isDarkTheme
                    ? "rgba(80, 0, 145, 0.5)"
                    : "rgba(255, 190, 40, 0.5)",
                }}
                onClick={() => setIsDarkTheme(!isDarkTheme)}
              >
                {isDarkTheme ? (
                  <i className="fas fa-regular fa-moon"></i>
                ) : (
                  <i className="fas fa-regular fa-sun"></i>
                )}
              </button>
              <button
                title="Delete all todos"
                className={`btn rounded-circle ${isDarkTheme ? "btn-dark" : "btn-light"
                  } border-0 mt-1 ms-1`}
                style={{
                  height: "2.5rem",
                  width: "2.5rem",
                  backgroundColor: isDarkTheme
                    ? "rgba(80, 0, 145, 0.5)"
                    : "rgba(255, 190, 40, 0.5)",
                }}
                onClick={() => deleteAllTodos()}
              >
                {isDarkTheme ? (
                  <i className="fas fa-regular fa-trash"></i>
                ) : (
                  <i className="fas fa-regular fa-trash"></i>
                )}
              </button>
              </div>
            </div>
            <div className="col-6">
              {" "}
              {/* Right side of the page */}
              {todos.map((todo, index) => (
                <Todos
                  isDarkTheme={isDarkTheme}
                  getTodos={getTodos}
                  todo={todo}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer
        className="d-flex justify-content-center align-items-center py-3 border-0"
        style={{
          backdropFilter: "blur(10px)",
          height: "12px", // increase height so it's visible
        }}
      >
        <span>© 2025 Phoenix Reynolds</span>
      </footer>
    </div>
  );
};

export default Home;
