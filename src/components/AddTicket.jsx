import { HiOutlinePlus } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import styles from "../styles/List.module.css";
import { useState, useContext } from "react";
import AppContext from "../AppContext";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

function AddTicket({ list, forceUpdate }) {
  const [ticketForm, setTicketForm] = useState(false);
  const [ticketTitle, setTicketTitle] = useState("");
  const { addTicket } = useContext(AppContext);

  const handleTicketSubmit = (e) => {
    e.preventDefault();

    if (ticketTitle === "") {
      return toast.warn("Missing Ticket Title");
    }

    const newTicket = {
      id: uuidv4(),
      title: ticketTitle,
      desc: "",
      listInfo: {
        listId: list.id,
        listTitle: list.title,
      },
    };

    console.log(newTicket);

    addTicket(list, newTicket);
    setTicketTitle("");
    setTicketForm(false);
    // to re-render parent component
    forceUpdate();

    toast.success("Ticket Added");
  };

  if (!ticketForm) {
    return (
      <div
        className={styles.addTicketContainer}
        onClick={() => setTicketForm(true)}
      >
        <HiOutlinePlus fill="#f0ffff" fontSize="1rem" />
        <p>Add Ticket</p>
      </div>
    );
  } else {
    return (
      <form className={styles.ticketForm} onSubmit={handleTicketSubmit}>
        <textarea
          placeholder="Ticket title"
          value={ticketTitle}
          onChange={(e) => setTicketTitle(e.target.value)}
          maxLength={40}
        />
        <div className={styles.btnContainerBottom}>
          <button type="submit" className="btn">
            Add
          </button>
          <IoCloseOutline
            fill="#f0ffff"
            fontSize="1.5rem"
            cursor="pointer"
            onClick={() => setTicketForm(false)}
          />
        </div>
      </form>
    );
  }
}

export default AddTicket;
