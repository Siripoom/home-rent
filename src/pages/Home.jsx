import KrabiPage from "../components/KrabiPage";
import Owner from "../components/Owner";
import WelcomePopup from "../components/WelcomePopup";

export default function Home() {
  return (
    <>
      {/* Popup will show first */}
      <WelcomePopup />
      <KrabiPage />
      <Owner />
    </>
  );
}
