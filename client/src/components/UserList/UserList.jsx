import UserListItem from "../UserListItem/UserListItem";
import "./UserList.css";

function UserList({ users }) {
  return (
    <div className="user-list-container">
      {users.map((user) => (
        <UserListItem user={user} />
      ))}
    </div>
  );
}

export default UserList;
