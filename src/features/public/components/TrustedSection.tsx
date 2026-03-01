import type { Logo } from "../type";
import Marquee from "../ui/Marquee";
const TrustedSection = () => {
   const logos: Logo[] = [
    { src: "/src/assets/logo/acme_corp.svg", alt: "Acme" },
    { src: "/src/assets/logo/spherule.svg", alt: "Spherule" },
    { src: "/src/assets/logo/bolt_shift.svg", alt: "Boltshift" },
    { src: "/src/assets/logo/constellation.svg", alt: "Constellation" },
    { src: "/src/assets/logo/command.svg", alt: "Command+R" },
    { src: "/src/assets/logo/four_points.svg", alt: "Fourpoints" },
    { src: "/src/assets/logo/launch_simple.svg", alt: "LaunchSimple" },
    { src: "/src/assets/logo/god_well.svg", alt: "Goodwell" },
    { src: "/src/assets/logo/alpha_wave.svg", alt: "AlphaWave" },
    { src: "/src/assets/logo/luminary.svg", alt: "Luminary" },
  ];
  return (
    <section className="bg-bg-main py-20">
      <div className="max-w-7xl mx-auto text-center px-10">
        <h2 className="text-text-title font-bold text-4xl font-jakarta tracking-wide mb-12">
          Trusted by forward-thinking organizations
        </h2>

        {/* Top Row */}
        <Marquee logos={logos} duration={40} />

        <div className="h-7" />

        {/* Bottom Row (opposite direction) */}
        <Marquee logos={logos} duration={40} reverse />

        <p className="mt-12 font-medium font-lato text-2xl tracking-wide">
          Join 12,000+ companies already growing
        </p>
      </div>
    </section>
  )
}

export default TrustedSection
