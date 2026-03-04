import { useSelector } from "react-redux";
import type { RootState } from "./hooks/redux/store";
import Registration from "./components/register/Registration";

function App() {
  const user = useSelector((state: RootState) => state.user.data);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px",
        padding: "10px",
      }}
    >
      <Registration />
    </div>
  );
}

export default App;
