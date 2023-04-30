import { useCallback, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Result from "./components/result";

function App() {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState(false);
  return (
    <div className="App">
      <Search value={value} setValue={setValue} setSearch={setSearch} />
      <Result value={value} search={search} setSearch={setSearch} />
    </div>
  );
}

export default App;
