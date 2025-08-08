import UserListItem from "../UserListItem/UserListItem";
import "./ScoresTable.css";

function ScoresTable({ finalScores }) {
  console.log("FINAL SCORES: ", finalScores);
  return (
    <div className="scores-table-container">
      {finalScores.map((user, i) => (
        <UserListItem key={i} username={user.name} score={user.value} />
      ))}
    </div>
  );
}

export default ScoresTable;
