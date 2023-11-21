export function LandingPage() {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center gap-0.5 lg:ml-[5%]">
        <h1 className="title text-[5rem]">Chatty</h1>
        <span className="ml-1 min-h-[84px] w-[80px]">
          <img src="/images/logo -dark mode.png"></img>
        </span>
      </div>
      <form className="mt-12 flex flex-col gap-3">
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
            Sign In
          </button>
        </div>
      </form>
      <div className="flex justify-center">
        <a className=" ml-[18em] mt-2 text-xs font-medium underline">Sign Up</a>
      </div>
    </div>
  );
}
