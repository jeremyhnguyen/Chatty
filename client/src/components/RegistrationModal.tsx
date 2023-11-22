export function RegistrationModal() {
  return (
    <div className="absolute inset-0 flex hidden items-center justify-center bg-gradient-to-t from-[#242039] from-20% to-[#b47468] backdrop-blur-sm">
      <div className=" absolute z-50 flex h-96 w-80 flex-col justify-center rounded-xl bg-[#242526] p-10 shadow-md shadow-[#000]">
        <div className="lg:ml-[5% mt-3 flex justify-center gap-0.5">
          <h1 className="title text-[3rem]">Chatty</h1>
          <span className="ml-1 min-h-[40px] w-[50px]">
            <img src="/images/logo -dark mode.png"></img>
          </span>
        </div>
        <form className="mt-8 flex flex-col gap-3 px-8">
          <label className="flex flex-col justify-center gap-3">
            Username
            <input required type="text" size={20} className="rounded-md pl-1" />
          </label>
          <label className=" flex flex-col justify-center gap-4">
            Password
            <input
              required
              type="password"
              size={20}
              className="rounded-md pl-1"
            />
          </label>
          <div className="mt-0.5 flex justify-center">
            <button
              className="mt-3 flex w-28 justify-center rounded-md border-[#fff] bg-[#ac6f65] px-0 py-1 font-black"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="flex justify-center">
          <a className="mt-6 text-xs font-medium underline">
            Already have an account?
          </a>
        </div>
      </div>
    </div>
  );
}
