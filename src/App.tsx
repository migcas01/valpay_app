import { Spinner } from "./shared";
import "./App.css";

function App() {
  return (
    <div className="p-10">
      <Spinner text="Loading" color="secondary" size="small" />
    </div>
  );
}

export default App;
