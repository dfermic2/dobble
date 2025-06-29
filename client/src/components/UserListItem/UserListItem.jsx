import { PiCrownSimpleLight } from "react-icons/pi";
import "./UserListItem.css";

function UserListItem({ username, isCrown = false }) {
  return (
    <div className="user-list-item-container">
      <p>{username}</p>
      {isCrown && <PiCrownSimpleLight />}
    </div>
  );
}

export default UserListItem;
