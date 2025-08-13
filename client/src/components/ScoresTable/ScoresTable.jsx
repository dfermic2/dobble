import UserListItem from "../UserListItem/UserListItem";
import "./ScoresTable.css";

function ScoresTable({ finalScores }) {
  return (
    <div className="scores-table">
      {finalScores.map((user, i) => (
        <UserListItem key={i} user={user} score={user.score} />
      ))}
    </div>
  );
}

export default ScoresTable;
