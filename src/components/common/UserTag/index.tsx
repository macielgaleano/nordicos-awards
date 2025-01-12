import { LogIn, LogOut } from "lucide-react";
import "./index.css";

const UserTag = () => {
  let isLogged = true;
  if (isLogged)
    return (
      <div className="tag">
        <div className="tag-image">
          <span>Maciel Galeano</span>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ8ICkia_tCxH0ffJdMDsrzhS_QsDeuD1Avg&s"
            alt=""
          />
        </div>
        <LogOut />
      </div>
    );
  return (
    <div className="tag">
      <span>Iniciar sesión</span>
      <LogIn />
    </div>
  );
};

export default UserTag;
