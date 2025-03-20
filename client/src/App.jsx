import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return (
    <div>
      <h2>{JSON.stringify(data.message)}</h2>
    </div>
  );
}

export default App;
