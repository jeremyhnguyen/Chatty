import { RegistrationModal } from "./RegistrationModal";
import { useNavigate } from "react-router-dom";
import { FormEvent, useContext, useState } from "react";
import { signIn } from "../api";
import { AppContext } from "./AppContext";

export function LandingPage() {
  const navigate = useNavigate();
  const { handleSignIn, handleConnections } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  //
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const { username, password } = Object.fromEntries(form.entries());
    console.log(username, password);
    try {
      const auth = await signIn(username as string, password as string);
      if (auth.user && auth.token) {
        handleSignIn(auth);
        handleConnections(true);
        navigate("/chat");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleGuestLogin() {
    handleConnections(true);
    navigate("/chat");
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mt-72 flex justify-center gap-0.5">
        <h1 className="title text-[3rem] md:text-[4rem] lg:text-[5rem]">
          Whispurr
        </h1>
        <span className="ml-1 w-[40px] md:w-[60px] lg:min-h-[84px] lg:w-[80px]">
          <img src="/images/logo -dark mode.png"></img>
        </span>
      </div>
      <form
        id="sign-up-form"
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-3"
      >
        <label className="flex justify-center gap-3">
          Username
          <input
            id="sign-up-username"
            required
            type="text"
            name="username"
            size={20}
            className="pl-1 text-black"
          />
        </label>
        <label className=" flex justify-center gap-4">
          Password
          <input
            id="sign-up-password"
            required
            type="password"
            name="password"
            size={20}
            className="pl-1 text-black"
          />
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
        <div
          className="ml-52 text-xs font-medium underline"
          onClick={() => setIsOpen(true)}
        >
          <span>Register</span>
        </div>
      </div>
      <button
        className="mb-3 mt-auto text-xs font-medium underline"
        onClick={handleGuestLogin}
      >
        Log In as Guest
      </button>
      {isOpen && <RegistrationModal onOpen={setIsOpen} />}
    </div>
  );
}
