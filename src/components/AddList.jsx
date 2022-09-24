import styles from "../styles/Lists.module.css";
import { useState, useContext } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import AppContext from "../AppContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

function AddList() {
  const {
    listModal,
    setListModal,
    addList,
    updateList,
    editList,
    setEditList,
  } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (editList) {
      setListModal(true);
      setTitle(editList.title);
      setColor(editList.statusColor);
    } else {
      setListModal(false);
      setTitle("");
      setColor("");
    }
  }, [editList, setListModal]);

  // status colors
  const colorData = ["#ff3838", "#ffb302", "#fce83a", "#56f000", "#2dccff"];

  // handle modal close
  const onClose = () => {
    setTitle("");
    setColor("");
    setListModal(false);
    setEditList(null);
  };

  // handle form submission
  const handleListSubmit = (e) => {
    e.preventDefault();

    if (title === "" && color === "") {
      return toast.warn("Missing Title and Color");
    }

    if (title === "") {
      return toast.warn("Missing Title");
    }

    if (color === "") {
      return toast.warn("Missing Color");
    }

    if (!editList) {
      // create a new list
      const newList = {
        id: uuidv4(),
        title: title,
        statusColor: color,
        tickets: [],
      };

      addList(newList);

      toast.success("List Added");
    } else {
      // update the list
      updateList({
        id: editList.id,
        tickets: editList.tickets,
        statusColor: color,
        title,
      });

      toast.success("List Updated");
    }

    onClose();
  };

  if (!listModal) return null;
  return (
    <div className={styles.modalBg} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{editList ? "Update List" : "New List"}</h3>
          <button onClick={onClose} className="btn">
            <IoCloseOutline fill="#485563" fontSize="2.25rem" />
          </button>
        </div>
        <form onSubmit={handleListSubmit}>
          <label>
            <p>Title</p>
            <input
              type="text"
              placeholder="List Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.titleInput}
              maxLength={40}
            />
          </label>
          <div>
            <p>Status Color</p>
            <div className={styles.colorContainer}>
              {colorData.map((clr, index) => (
                <div
                  key={index}
                  onClick={() => setColor(clr)}
                  style={{
                    backgroundColor: clr,
                    width: "1.35rem",
                    height: "1.35rem",
                    borderRadius: "50%",
                    cursor: "pointer",
                    outline: `${
                      clr === color ? "3px solid #257AFD" : "3px solid #bbb"
                    }`,
                    outlineOffset: "1.75px",
                    padding: "0.5px",
                  }}
                ></div>
              ))}
            </div>
          </div>
          {editList ? (
            <button
              type="submit"
              disabled={
                title === "" ||
                color === "" ||
                (title === editList.title && color === editList.statusColor)
              }
              className={`btn ${styles.btn} ${
                (title === "" ||
                  color === "" ||
                  (title === editList.title &&
                    color === editList.statusColor)) &&
                styles.disabledBtn
              }`}
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              disabled={title === "" || color === ""}
              className={`btn ${styles.btn} ${
                (title === "" || color === "") && styles.disabledBtn
              }`}
            >
              Add
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddList;
