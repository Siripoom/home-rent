import image1 from "../assets/images/m1.jpg";
const KrabiPage = () => {
  return (
    <>
      {/* About Krabi Section */}
      <section className="py-10 px-5">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2">
            <img
              src={image1}
              alt="Krabi scenery"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-10 mt-5 lg:mt-0">
            <h2 className="text-4xl font-bold">Discover Krabi</h2>
            <p className="mt-3 text-lg">
              Krabi is a province located in the southern part of Thailand,
              renowned for its stunning beaches, emerald green waters, and
              towering limestone cliffs. This natural beauty makes Krabi a
              popular destination for travelers from around the world.
            </p>
            <button className="mt-5 btn btn-secondary">More</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default KrabiPage;
