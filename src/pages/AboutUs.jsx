export default function AboutUs() {
  return (
    <>
      <div className="p-6 text-center">
        {/* Main heading */}
        <h1
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: "'Inknut Antiqua', serif" }}
        >
          This website is governed by or operates under
        </h1>

        {/* Company name and description */}
        <div>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "'Inknut Antiqua', serif" }}
          >
            RIEN NOK TIAO NOK OVERSEAS CO., LTD.
          </h2>
          <p className="text-base">
            Operate a business providing information services, acting as a
            consultant and offering advice on educational programs and courses
            of various educational institutions and academies.
          </p>
        </div>

        {/* Additional description */}
        <div className="mt-6">
          <h3
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: "'Inknut Antiqua', serif" }}
          >
            NokEdu
          </h3>
          <p className="text-base">Education/Stationery/Book/Science Tool</p>
        </div>
      </div>
    </>
  );
}
