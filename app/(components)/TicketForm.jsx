"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id !== "new";
  const router = useRouter();
  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };

  const [ticketData, setTicketData] = useState(startingTicketData);

  const handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setTicketData(prevSate => ({
      ...prevSate,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (EDITMODE) {
      const res = await fetch(`../api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ ticketData }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Editing went wrong");
      }
      router.refresh();
      router.push("/");
    } else {
      const res = await fetch("../api/Tickets", {
        method: "POST",
        body: JSON.stringify({ ticketData }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      router.refresh();
      router.push("/");
    }
  };

  if (EDITMODE) {
    startingTicketData.title = ticket.title;
    startingTicketData.description = ticket.description;
    startingTicketData.priority = ticket.priority;
    startingTicketData.progress = ticket.progress;
    startingTicketData.status = ticket.status;
    startingTicketData.category = ticket.category;
  }

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl font-bold">
          {EDITMODE ? "Edit your ticket" : "Create a new ticket"}
        </h3>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={ticketData.title}
          onChange={handleChange}
          required={true}
        />
        <label htmlFor="description">Description</label>
        <textarea
          rows={5}
          name="description"
          id="description"
          value={ticketData.description}
          onChange={handleChange}
          required={true}
        />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          value={ticketData.category}
          onChange={handleChange}
          required={true}
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
          <option value="Network Problem">Network Problem</option>
          <option value="Project">Project</option>
        </select>
        <label htmlFor="priority">Priority</label>
        <div>
          <input
            type="radio"
            name="priority"
            id="priority-1"
            value={1}
            onChange={handleChange}
            checked={ticketData.priority == 1}
          />
          <label htmlFor="priority-1">1</label>
          <input
            type="radio"
            name="priority"
            id="priority-2"
            value={2}
            onChange={handleChange}
            checked={ticketData.priority == 2}
          />
          <label htmlFor="priority-2">2</label>
          <input
            type="radio"
            name="priority"
            id="priority-3"
            value={3}
            onChange={handleChange}
            checked={ticketData.priority == 3}
          />
          <label htmlFor="priority-3">3</label>
          <input
            type="radio"
            name="priority"
            id="priority-4"
            value={4}
            onChange={handleChange}
            checked={ticketData.priority == 4}
          />
          <label htmlFor="priority-4">4</label>
          <input
            type="radio"
            name="priority"
            id="priority-5"
            value={5}
            onChange={handleChange}
            checked={ticketData.priority == 5}
          />
          <label htmlFor="priority-5">5</label>
        </div>
        <label htmlFor="progress">Progress</label>
        <input
          type="range"
          name="progress"
          id="progress"
          value={ticketData.progress}
          onChange={handleChange}
          min="0"
          max="100"
        />
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          value={ticketData.status}
          onChange={handleChange}
          required={true}
        >
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input
          type="submit"
          value={EDITMODE ? "Edit" : "Create"}
          className="btn max-w-xs self-center"
        />
      </form>
    </div>
  );
};

export default TicketForm;
