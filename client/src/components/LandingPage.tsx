export function LandingPage() {
  return (
    <div className="flex flex-col justify-center gap-10">
      <div className="flex justify-center gap-0.5 lg:ml-[5%]">
        <h1 className="title text-[6rem]">Chatty</h1>
        <span className="ml-1 min-h-[84px] w-[6rem]">
          <img src="/images/logo -dark mode.png"></img>
        </span>
      </div>
      <form className="flex flex-col gap-3">
        <label className="flex justify-center gap-3">
          Username
          <input required type="text" />
        </label>
        <label className="flex justify-center gap-3">
          Password
          <input required type="password" />
        </label>
        <button type="submit">Sign In</button>
      </form>
      <a className="underline">Sign Up</a>
    </div>
  );
}
