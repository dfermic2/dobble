import { PiCrownSimpleLight } from "react-icons/pi";
import "./UserListItem.css";

function UserListItem({ user, isCrown = false, score = "" }) {
  return (
    <div className="user-list-item-container">
      <div className="username-avatar">
        <img src={user.circleAvatar} alt="avatar" />
        <p>{user.username}</p>
      </div>
      <p>{score}</p>
      {isCrown && <PiCrownSimpleLight />}
    </div>
  );
}

export default UserListItem;
