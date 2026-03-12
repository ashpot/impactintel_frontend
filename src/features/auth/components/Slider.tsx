import { useState, useEffect, useCallback } from "react";

interface Slide {
  id: number;
  image: string;
  headline: string;
  subtext: string;
  accent: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    headline: "Streamline",
    subtext: "your impact.",
    accent: "hsl(45, 100%, 51%)",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    headline: "Accelerate",
    subtext: "your growth.",
    accent: "hsl(45, 100%, 51%)",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    headline: "Amplify",
    subtext: "your reach.",
    accent: "hsl(45, 100%, 51%)",
  },
];

const SLIDE_INTERVAL = 4000;

const Slider= () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [textVisible, setTextVisible] = useState(true);

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setAnimating(true);
      setTextVisible(false);

      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
        setTextVisible(true);
      }, 500);
    },
    [animating, current]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = slides[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&family=DM+Sans:wght@300;400&display=swap');
        @keyframes progress-fill {
          from { width: 0% }
          to   { width: 100% }
        }
        .progress-bar-anim {
          animation: progress-fill ${SLIDE_INTERVAL}ms linear forwards;
        }
      `}</style>

      <div
        className="w-1/2 relative overflow-hidden rounded-[28px] bg-black select-none shadow-2xl"
      >

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: `url(${slide.image})`,
            opacity: animating ? 0 : 1,
            transform: animating ? "scale(1.04)" : "scale(1)",
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-7 pb-9">
          {/* Animated text */}
          <div
            className="font-lato"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0px)" : "translateY(14px)",
              transition: "opacity 0.35s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <p
              className="text-[42px] font-bold leading-none tracking-wide mb-1"
              style={{
                color: slide.accent,
              }}
            >
              {slide.headline}
            </p>
            <p
              className="text-lg font-light text-white/80 tracking-wide mb-6"
            >
              {slide.subtext}
            </p>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="h-2 rounded-full border-none cursor-pointer transition-all duration-300 ease-in-out p-0"
                style={{
                  width: i === current ? 22 : 8,
                  backgroundColor:
                    i === current ? slide.accent : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Slider;