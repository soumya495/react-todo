import styles from "../styles/List.module.css";
import styles2 from "../styles/Lists.module.css";
import { useState, useContext, useEffect } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useReducer } from "react";
import AppContext from "../AppContext";
import { toast } from "react-toastify";
import AddTicket from "./AddTicket";
import Tickets from "./Tickets";

function List({ list, forceUpdate }) {
  const { getList, setEditList, deleteList, getTickets } =
    useContext(AppContext);

  const [showMenuPopup, setShowMenuPopup] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (list === null) return null;

  const { title, statusColor } = list;

  // handle modal close
  const onClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        className={styles.listContainer}
        style={{
          borderTop: `6px solid ${statusColor}`,
        }}
      >
        <div className={styles.listHeader}>
          <p>{title}</p>
          <HiOutlineDotsHorizontal
            fill="#171c22"
            fontSize="1.25rem"
            cursor="pointer"
            onClick={() => setShowMenuPopup((prev) => !prev)}
          />
          <div
            className={`${styles.popup} ${!showMenuPopup && styles.hidePopup}`}
          >
            {/* set edit list data to context */}
            <p
              onClick={() => {
                setEditList(list);
                setShowMenuPopup(false);
              }}
            >
              Edit List <FiEdit2 fontSize="1rem" color="#171c22" />{" "}
            </p>
            <p
              onClick={() => {
                setShowDeleteModal(true);
                setShowMenuPopup(false);
              }}
            >
              Delete List
              <MdOutlineDeleteOutline fontSize="1rem" fill="#171c22" />{" "}
            </p>
          </div>
        </div>
        {list.tickets.length > 0 && (
          <Tickets
            tickets={list.tickets}
            forceUpdate={forceUpdate}
            // fetchTickets={fetchTickets}
          />
        )}
        <AddTicket list={list} forceUpdate={forceUpdate} />
      </div>
      {showDeleteModal && (
        <div className={styles2.modalBg} onClick={onClose}>
          <div className={styles2.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Delete List</h3>
            </div>
            <p className={styles.smallPara}>
              Are you sure you want to delete the list ? All the tickets and the
              list will be permanently deleted.
            </p>
            <div className={styles.modalBtnContainer}>
              <button
                className={`btn ${styles.delBtn}`}
                onClick={() => {
                  setShowDeleteModal(false);
                  deleteList(list.id);
                  forceUpdate();
                  toast.success("List Deleted");
                }}
              >
                Confirm
              </button>
              <button className={`btn ${styles.cnrfBtn}`} onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default List;
