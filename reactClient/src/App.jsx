import { useState } from "react";
import "./App.css";
import Tdo from "./Tdo";
const myTodo = [
  {
    id: 1,
    todo: "asdasd",
    done: true,
  },
  {
    id: 3,
    todo: "addsdasd",
    done: false,
  },
  {
    id: 2,
    todo: "asasdasd",
    done: true,
  },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        -
      </button>
      <div>
        <h1>Todos</h1>
        <div>
          {myTodo.map((t) => {
            return <Tdo {...t} />;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
