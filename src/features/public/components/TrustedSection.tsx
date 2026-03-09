import type { Logo } from "../type";
import Marquee from "../ui/Marquee";
import acme from "@/assets/logo/acme_corp.svg";
import spherule from "@/assets/logo/spherule.svg"
import bolt_shift from "@/assets/logo/bolt_shift.svg"
import constellation from "@/assets/logo/constellation.svg"
import command from "@/assets/logo/command.svg"
import four_points from "@/assets/logo/four_points.svg"
import launch_simple from "@/assets/logo/launch_simple.svg"
import good_well from "@/assets/logo/god_well.svg"
import alpha_wave from "@/assets/logo/alpha_wave.svg"
import luminary from "@/assets/logo/luminary.svg"
const TrustedSection = () => {
   const logos: Logo[] = [
    { src: acme, alt: "Acme" },
    { src: spherule, alt: "Spherule" },
    { src: bolt_shift, alt: "BoltShift" },
    { src: constellation, alt: "Constellation" },
    { src: command, alt: "Command+R" },
    { src: four_points, alt: "FourPoints" },
    { src: launch_simple, alt: "LaunchSimple" },
    { src: good_well, alt: "GoodWell" },
    { src: alpha_wave, alt: "AlphaWave" },
    { src: luminary, alt: "Luminary" },
  ];
  return (
    <section className="bg-bg-main py-20">
      <div className="md:global-p text-center">
        <h2 className="text-text-title font-bold md:text-4xl text-[20px] font-jakarta tracking-wide mb-12 mx-auto md:max-w-full max-w-[90%]">
          Trusted by forward-thinking organizations
        </h2>

        <Marquee logos={logos} duration={40} reverse/>

        <div className="md:h-7 h-4" />

        <Marquee logos={logos} duration={40} />

        <p className="mt-12 font-medium font-lato md:text-2xl text-xl tracking-wide md:max-w-full max-w-[90%] mx-auto">
          Join 12,000+ companies already growing
        </p>
      </div>
    </section>
  )
}

export default TrustedSection
