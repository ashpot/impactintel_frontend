import Hero from "@/features/public/components/Hero"
import TrustedSection from "@/features/public/components/TrustedSection"
import Features from "@/features/public/components/Features"
import HowItWorks from "@/features/public/components/HowItWorks"
import Testimonials from "@/features/public/components/Testimonials"
import CTA from "@/features/public/components/CTA"
import Footer from "@/features/public/components/Footer"
// import PageTransition from "@/shared/components/PageTransition"

const LandingPage = () => {
  return (
    <>
    {/* <PageTransition> */}
      <Hero />
      <TrustedSection />
      <Features />
      <HowItWorks />
      <Testimonials />
      <div id="contact">
      <CTA />
      <Footer/>
      </div>
    {/* </PageTransition> */}
    </>
  )
}
export default LandingPage
