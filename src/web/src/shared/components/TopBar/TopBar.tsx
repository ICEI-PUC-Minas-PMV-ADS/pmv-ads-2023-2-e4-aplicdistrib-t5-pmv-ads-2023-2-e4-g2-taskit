import { TbLogout } from "react-icons/tb";

import { useAuth } from "@/shared/auth/context/AuthContext";
import { TopBarContainer } from "./TopBar.style";
import { Button } from "../Button";

export function TopBar() {
  const { userData, Logout, sessionId } = useAuth();

  return (
    <TopBarContainer>
      <span>Olá, <b>{userData.name}</b></span>
      <div>
        <Button onClick={() => Logout(sessionId, userData.id)}>Logout <TbLogout /></Button>
      </div>
    </TopBarContainer>
  );
}
