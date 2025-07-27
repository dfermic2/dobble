function ScoresTable({ finalScores }) {
  return (
    <div>
      {finalScores.map((user) => (
        <p>
          {user.name} {user.value}
        </p>
      ))}
    </div>
  );
}

export default ScoresTable;
