import { PiCrownSimpleLight } from "react-icons/pi";
import "./UserListItem.css";

function UserListItem({ username, isCrown = false, score = "" }) {
  return (
    <div className="user-list-item-container">
      <p>{username}</p>
      <p>{score}</p>
      {isCrown && <PiCrownSimpleLight />}
    </div>
  );
}

export default UserListItem;
