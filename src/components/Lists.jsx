import styles from "../styles/Lists.module.css";
import { useContext, useReducer } from "react";
import AppContext from "../AppContext";
import List from "./List";

function Lists() {
  const { lists } = useContext(AppContext);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // console.log(lists);

  if (lists.length <= 0) {
    return (
      <div className={styles.notFoundContainer}>
        <p>No Lists Added !</p>
        <p>Add Your Lists</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.listsContainer}>
        {lists.map((list, index) => (
          <List key={index} list={list} forceUpdate={forceUpdate} />
        ))}
      </div>
    </div>
  );
}

export default Lists;
