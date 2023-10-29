import TicketForm from "@/app/(components)/TicketForm";

const getTicketById = async id => {
  const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const data = await res.json();
  return data;
};

const TicketPage = async ({ params }) => {
  const EDITMODE = params.id !== "new";
  let updateTicketData = {};
  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.ticket;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }

  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
