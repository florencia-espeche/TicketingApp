const StatusDisplay = ({ status }) => {
  const getColor = status => {
    switch (status) {
      case "done":
        return "bg-green-300";
      case "in progress":
        return "bg-yellow-300";
      case "not started":
        return "bg-gray-300";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-default-text ${getColor(
        status
      )}`}
    >
      {status.toUpperCase()}
    </div>
  );
};

export default StatusDisplay;
