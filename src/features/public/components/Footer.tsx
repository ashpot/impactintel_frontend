import logo from "@/assets/brand/brand_logo.png"
import cta_bg from "@/assets/images/cta_bg.png"
import type { Logo } from "../type";
import facebook from "@/assets/icons/facebook.svg"
import linkedIn from "@/assets/icons/linkedIn.svg"
import instagram from "@/assets/icons/instagram.svg"
import twitter from "@/assets/icons/twitter.svg"

const socialLinks:Logo[] = [
  { src: facebook, alt: "Facebook" },
  { src: linkedIn, alt: "LinkedIn" },
  { src: instagram, alt: "Instagram" },
  { src: twitter, alt: "Twitter" },
];

const footerLinks = [
  {
    heading: "Product",
    links: ["Product Features", "How To Use", "Pricing", "Testimonials", "Security", "Updates"],
  },
  {
    heading: "Access",
    links: ["Client Login", "Request a Demo", "Documentation", "FAQ's", "Support"],
  },
  {
    heading: "Contact",
    links: ["info@impactintel.com", "+234 800 360 0000", "Lagos, Nigeria"],
    isContact: true,
  },
];

const Footer = () => {

  return (
    <footer
      className="bg-bg-dark font-lato"
    >
      <div
        className="bg-no-repeat"
        style={{
            backgroundImage: `url(${cta_bg})`,
            backgroundBlendMode: 'overlay',
            backgroundSize: 'cover',
        }}
      >
      <div className="global-p pt-20 pb-8 text-text-muted">
        {/* Main footer grid */}
        <div className="grid grid-cols-12 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-12 md:col-span-4">
            <div className="max-w-[260px]">
                <img 
                    src={logo} 
                    alt="brand logo" 
                />
            </div>
            <p className="mt-5 text-lg leading-relaxed max-w-[220px]">
              A centralized platform for managing and reporting CSR initiatives.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-7">
              {socialLinks.map(({ src, alt }) => (
                <button
                  key={alt}
                  aria-label={alt}
                  className="group w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer
                                backdrop-blur-xl bg-bg-socials"
                >
                  <img 
                    src={src} 
                    alt={alt} 
                    className=""
                />
                </button>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="col-span-12 md:col-span-8 grid grid-cols-3 gap-8 text-text-muted">
            {footerLinks.map(({ heading, links }) => (
              <div key={heading}>
                <h4
                  className="text-text-on-dark text-base font-medium uppercase mb-5"
                >
                  {heading}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm transition-all duration-200 block text-text-muted
                                    hover:text-brand-primary hover:translate-x-1"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-6"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />

        {/* Bottom bar */}
        <div className="text-base flex flex-col sm:flex-row items-center justify-between gap-4 font-lato">
          <p className="text-text-footer hover:text-brand-primary">
            © 2025 Impact Intel. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Services"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-text-footer transition-colors duration-200 hover:text-brand-primary"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      </div>
    </footer>
  );
}
export default Footer