import p1 from "../assets/images/p1.jpg";
import p2 from "../assets/images/p2.jpg";

export default function Owner() {
  return (
    <>
      <h2 className="mb-5 text-2xl text-center font-bold">Landlord</h2>
      <div className="flex flex-row justify-center gap-40  0 mb-6">
        {/* Image 1 */}
        <div className="card w-80 bg-base-100 shadow-xl">
          <figure>
            <img src={p1} alt="Owner 1" className="w-full object-cover" />
          </figure>
          <div className="card-body">
            <h2 className="text-center font-semibold">Pornthida Duangkaew</h2>
          </div>
        </div>

        {/* Image 2 */}
        <div className="card w-80 bg-base-100 shadow-xl">
          <figure>
            <img src={p2} alt="Owner 2" className="w-full object-cover" />
          </figure>
          <div className="card-body">
            <h2 className="text-center font-semibold">Namtan Namtan</h2>
          </div>
        </div>
      </div>
    </>
  );
}
