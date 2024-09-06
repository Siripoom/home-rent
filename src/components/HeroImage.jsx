import heroImage from "../assets/images/hero-image.jpg";
// eslint-disable-next-line react/prop-types
export default function Hero({ title }) {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${heroImage})`, // Fix here
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{title}</h1>
          {/* <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p> */}
          <button
            className="btn  rounded-badge"
            style={{ background: "F9DBBA" }}
          >
            Accommodation
          </button>
        </div>
      </div>
    </div>
  );
}
