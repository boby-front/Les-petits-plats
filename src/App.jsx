import { useState } from "react";
import "./App.css";
import Header from "./containers/Header";
import Main from "./containers/Main";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => setSearchValue(value);

  return (
    <>
      <Header onSearch={handleSearch} />
      <Main onSearchValue={searchValue} />
    </>
  );
}

export default App;
