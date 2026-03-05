import Accounts from "../components/account/Accounts";
import { useState, useEffect } from "react";
import Registration from "../components/register/Registration";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { saveUser } from "../hooks/redux/user";
import type { User } from "../interface/user";
import { saveHealth } from "../hooks/redux/health";
import type { HealthPlanResponse } from "../interface/health";
import type { RootState } from "../hooks/redux/store";

export default function Homepage() {
  const [register, setRegister] = useState(false);
  const user = useSelector((root: RootState) => root.user.data);
  const llmProcess = useSelector((root: RootState) => root.llm);
  const dispatch = useDispatch();
  const location = useLocation();

  console.log("llmProcess:", llmProcess);

  useEffect(() => {
    setRegister(llmProcess);
  }, [location.key, llmProcess]);

  return (
    <div>
      {register ? (
        <Registration />
      ) : (
        <Accounts
          onAddProfile={() => {
            setRegister(true);
            dispatch(saveUser((user?.id ?? "") !== "" ? ({} as User) : user));
            dispatch(saveHealth({} as HealthPlanResponse));
          }}
        />
      )}
    </div>
  );
}
