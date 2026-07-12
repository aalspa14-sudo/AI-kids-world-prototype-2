import CosmicBackground from "./components/decor/CosmicBackground";
import Navbar from "./components/Navbar";
import NavTagline from "./components/NavTagline";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import FeatureTiles from "./components/FeatureTiles";
import Characters from "./components/Characters";
import ForParents from "./components/ForParents";
import BookPreview from "./components/BookPreview";
import ActivitiesGrid from "./components/ActivitiesGrid";
import CertificateTeaser from "./components/CertificateTeaser";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";
import DroneBot from "./components/DroneBot";

export default function App() {
  return (
    <>
      <CosmicBackground />
      <div className="relative">
        <Navbar />
        <NavTagline />
        <main>
          <Hero />
          <StatsBar />
          <FeatureTiles />
          <Characters />
          <ForParents />
          <BookPreview />
          <ActivitiesGrid />
          <CertificateTeaser />
          <Waitlist />
        </main>
        <Footer />
      </div>
      {/* Byte keeps his playful orange maker-drone character design. */}
      <DroneBot />
    </>
  );
}
