import styles from "../styles/Tickets.module.css";
import styles2 from "../styles/Lists.module.css";
import { FiEdit2 } from "react-icons/fi";
import { useContext } from "react";
import AppContext from "../AppContext";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

function Tickets({ tickets, forceUpdate }) {
  const { ticketEditModal, setTicketEditModal, lists, updateTicket } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    listId: "",
    listName: "",
  });

  const getListName = (id) => {
    lists.forEach((list) => {
      if (list.id === id) {
        return list.title;
      }
    });
  };

  useEffect(() => {
    if (ticketEditModal) {
      setFormData({
        title: ticketEditModal.title,
        desc: ticketEditModal.desc,
        listId: ticketEditModal.listInfo.listId,
        listName: ticketEditModal.listInfo.listTitle,
      });
    }
  }, [ticketEditModal]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const currentListId = ticketEditModal.listInfo.listId;
    // console.log(currentListId);
    const currentList = lists.find((l) => l.id === currentListId);

    updateTicket(currentList, {
      id: ticketEditModal.id,
      title: formData.title,
      desc: formData.desc,
      listInfo: {
        listId: formData.listId,
        listTitle: formData.listName,
      },
    });

    forceUpdate();
    setFormData({ title: "", desc: "", listId: "", listName: "" });
    setTicketEditModal(false);
  };

  const onClose = () => {
    setTicketEditModal(null);
  };

  if (tickets.length <= 0) return null;

  return (
    <>
      <div className={styles.ticketContainer}>
        {tickets.map((ticket, index) => (
          <div
            className={styles.ticket}
            key={index}
            onClick={() => setTicketEditModal(ticket)}
          >
            <p>{ticket.title}</p>
            <FiEdit2 fontSize="1rem" color="#171c22" />
          </div>
        ))}
      </div>
      {ticketEditModal && (
        <div className={styles2.modalBg} onClick={onClose}>
          <div className={styles2.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles2.modalHeader}>
              <h3>Ticket Details</h3>
              <button onClick={onClose} className="btn">
                <IoCloseOutline fill="#485563" fontSize="2.25rem" />
              </button>
            </div>
            <form onSubmit={handleOnSubmit}>
              <label>
                <p>Title</p>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Ticket Title"
                  className={styles2.titleInput}
                  maxLength={40}
                />
              </label>
              <label>
                <p>Description</p>
                <textarea
                  placeholder="Add Ticket Description ..."
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      desc: e.target.value,
                    }))
                  }
                  className={styles2.titleInput}
                />
              </label>
              <label>
                <p>List</p>
                <select
                  value={formData.listId}
                  className={styles2.titleInput}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      listId: e.target.value,
                      listName: getListName(e.target.value),
                    }))
                  }
                >
                  {lists.map((l, index) => (
                    <option key={index} value={l.id}>
                      {l.title}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                disabled={
                  formData.title === ticketEditModal.title &&
                  formData.desc === ticketEditModal.desc &&
                  formData.listId === ticketEditModal.listInfo.listId
                }
                className={`btn ${styles2.btn} ${
                  formData.title === ticketEditModal.title &&
                  formData.desc === ticketEditModal.desc &&
                  formData.listId === ticketEditModal.listInfo.listId &&
                  styles2.disabledBtn
                }`}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Tickets;
