import { RegistrationModal } from "./RegistrationModal";
import { useNavigate, Link } from "react-router-dom";
import { FormEvent } from "react";
import { signIn, signUp } from "../api";

export function LandingPage() {
  const navigate = useNavigate();
  //
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    async function handleSignUp(username: string, password: string) {
      await signUp(username, password);
      navigate("/");
    }
    async function handleSignIn(username: string, password: string) {
      const auth = await signIn(username, password);
      if (auth.user && auth.token) {
        onSignIn(auth);
        navigate("/chat");
      }
    }
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
      <Link className="mb-3 mt-auto text-xs font-medium underline" to="/chat">
        Log In as Guest
      </Link>
      <RegistrationModal />
    </div>
  );
}
