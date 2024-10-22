import { Link } from "react-router-dom";

function AccountDeletedPage() {
  return (
    <div className="h-screen w-full bg-black flex flex-col justify-center items-center">
      <div className="flex flex-col w-full max-w-lg gap-4 items-center pt-5 text-center">
        <h2 className="text-white text-4xl font-bold">
          Your Account has been successfully deleted
        </h2>
        <p className="text-[#a6a6a6] text-xl">We're sad to see you leave</p>

        <div className="mt-4">
          <Link to="/login" className="btn btn-primary bg-[#282828] hover:bg-[#404040] text-white">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccountDeletedPage;
