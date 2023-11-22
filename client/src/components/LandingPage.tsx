import { RegistrationModal } from "./RegistrationModal";
import { useNavigate, Link } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();
  function handleSubmit() {
    navigate("/chat");
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mt-48 flex justify-center gap-0.5 lg:ml-[5%]">
        <h1 className="title text-[5rem]">Chatty</h1>
        <span className="ml-1 min-h-[84px] w-[80px]">
          <img src="/images/logo -dark mode.png"></img>
        </span>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
        <label className="flex justify-center gap-3">
          Username
          <input required type="text" size={20} className="pl-1" />
        </label>
        <label className=" flex justify-center gap-4">
          Password
          <input required type="password" size={20} className="pl-1" />
        </label>
        <div className="ml-44 mt-0.5 flex justify-center">
          <button
            className="flex w-20 justify-center rounded-none border-[#fff] bg-[#3d81e0] px-0 py-1 font-black"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
      <div className="mt-2 flex items-center justify-evenly gap-x-20">
        <a className="ml-52 text-xs font-medium underline">Register</a>
      </div>
      <Link className="mt-auto text-xs font-medium underline" to="/chat">
        Log In as Guest
      </Link>
      <RegistrationModal />
    </div>
  );
}
