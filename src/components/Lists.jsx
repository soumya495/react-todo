import styles from "../styles/Lists.module.css";
import { useContext } from "react";
import AppContext from "../AppContext";
import { TbMoodEmpty } from "react-icons/tb";

function Lists() {
  const { lists } = useContext(AppContext);

  if (lists.length <= 0) {
    return (
      <div className={styles.notFoundContainer}>
        <p>No Lists Added !</p>
        <p>Add Your Lists</p>
      </div>
    );
  }
}

export default Lists;
