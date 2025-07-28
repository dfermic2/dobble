import UserListItem from "../UserListItem/UserListItem";
import "./ScoresTable.css";

function ScoresTable({ finalScores }) {
  return (
    <div className="scores-table-container">
      {finalScores.map((user) => (
        <UserListItem username={user.name} score={user.value} />
      ))}
    </div>
  );
}

export default ScoresTable;
