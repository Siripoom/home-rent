import { Link } from "react-router-dom";
export default function Page404() {
  return (
    <div className="text-center my-20">
      <label className="swap swap-flip text-9xl">
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" />

        <div className="swap-on">😈</div>
        <div className="swap-off">😇</div>
      </label>
      <h1 className="text-3xl">Page Not Found</h1>
      <Link to="/">click here back to Home</Link>
    </div>
  );
}
