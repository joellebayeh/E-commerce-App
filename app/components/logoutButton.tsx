import React from "react";
import { clearUserState } from "../redux/slices/userSlice";
import { logout } from "../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const LogoutButton: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(clearUserState());
    dispatch(logout());
    if(localStorage.getItem("cart")){
        localStorage.removeItem("cart"); // Clear cart
    }
    router.replace("/"); // Redirect to login screen after logout
  };

  return (
    <div className="fixed bottom-0 right-0 shadow-lg m-10">
      <button
        onClick={handleLogout}
        className="py-2 px-4 bg-blue-300 text-white rounded-tl-lg rounded-br-lg hover:bg-blue-600"
      >
        Log-out
      </button>
    </div>
  );
};

export default LogoutButton;
