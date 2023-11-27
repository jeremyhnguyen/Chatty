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
    <div className="flex h-full flex-col items-center justify-center bg-[#242526] text-white">
      <div className="mt-64 h-[300px] rounded-xl border-2 border-[#000] p-8 shadow-md shadow-black lg:my-40 lg:h-[380px]">
        <div className="flex justify-center gap-0.5 lg:mt-10">
          <h1 className="title text-[1.8em] leading-tight md:text-[4rem] lg:text-[5rem]">
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
              className="rounded-md pl-1 text-black"
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
              className="rounded-md pl-1 text-black"
            />
          </label>
          <div className="ml-44 mt-0.5 flex justify-center">
            <button
              className="flex w-20 justify-center rounded-lg rounded-md border border-[#fff] border-transparent bg-[#3d81e0] px-0 py-1.5 text-xs font-black transition duration-500 ease-in-out hover:border-[#fff] hover:bg-[#136eed]"
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
            <span className="cursor-pointer">Register</span>
          </div>
        </div>
        {isOpen && <RegistrationModal onOpen={setIsOpen} />}
      </div>
      <button
        className="mt-56 text-xs font-medium underline lg:mt-64"
        onClick={handleGuestLogin}
      >
        Log In as Guest
      </button>
    </div>
  );
}
