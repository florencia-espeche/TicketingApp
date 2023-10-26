import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const DeleteBlock = () => {
  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-gray-800 hover:cursor-pointer hover: text-gray-600"
    />
  );
};

export default DeleteBlock;
