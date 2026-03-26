import Button from "@/shared/ui/Button";
import { useState } from "react";

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  onEditBannerImage?: () => void;
  onEditText?: () => void;
}

const EditIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const HeroBanner = ({
  title = "Transparency in Action",
  subtitle = "View our community impact and commitment to sustainable development.",
  backgroundImage = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
  onEditBannerImage,
  onEditText,
}: HeroBannerProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [heroTitle, setHeroTitle] = useState(title)

  return (
    <div className="relative w-full rounded-2xl overflow-hidden min-h-70">
      {/* Background image */}
      <img
        src={backgroundImage}
        alt="hero background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* yellow image overlay */}
      <div className="absolute inset-0 pointer-events-none" 
        style={{
            background: "linear-gradient( hsla(44, 100%, 52%, 0.85), hsla(46, 76%, 35%, 0.85))",
        }}
      />

      {/* Top-right button */}
      <div className="absolute top-4 right-4 z-200">
        {isEditing ? (
            <div className="flex gap-2">
                <Button 
                    variant="primary"
                    className="bg-white hover:bg-gray-50 shadow-sm cursor-pointer"
                    onClick={onEditBannerImage}
                    leftIcon={<EditIcon className="w-4 h-4 text-text-body" />}
                >
                    Edit Banner Image
                </Button>

                <Button 
                    variant="primary"
                    className="bg-white hover:bg-gray-50 shadow-sm cursor-pointer"
                    onClick={()=>setIsEditing(false)}
                >
                    Back
                </Button>
            </div>
        ) : (
            <Button 
                variant="ghost"
                className="px-6 border-white/70 text-white text-sm bg-white/15 backdrop-blur-md hover:bg-white/10 cursor-pointer"
                onClick={()=>setIsEditing(true)}
            >
                Edit Page
            </Button>
        )}
      </div>

      {/* Centered text */}
      <div className="relative z-10 min-h-70 flex flex-col items-center justify-center text-center px-6">
        {isEditing ? (
          // Edit mode — text block with border and edit icon badge
          <div className="relative border border-white/60 rounded-xl px-6 py-4 max-w-lg w-full">
            <Button 
                variant="primary"
                className="bg-white hover:bg-gray-50 w-7 h-7 p-2 cursor-pointer absolute -top-3 -right-3 rounded-full
                    justify-center items-center shadow-md"
                onClick={onEditText}
            >
                <EditIcon className="w-4 h-4 text-text-body" />
            </Button>

            <textarea 
                value={heroTitle}
                onChange={(e)=>setHeroTitle(e.target.value)}
                className="focus:border text-center w-full outline-none resize-none text-[28px] font-medium font-lato text-white tracking-[0.2em] drop-shadow-sm" />
            <p className="mt-2 text-sm text-white font-lato">
              {subtitle}
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-[28px] font-medium font-lato text-white tracking-[0.2em] drop-shadow-sm">
              {heroTitle}
            </h1>
            <p className="mt-2 text-sm text-white font-lato">
              {subtitle}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;