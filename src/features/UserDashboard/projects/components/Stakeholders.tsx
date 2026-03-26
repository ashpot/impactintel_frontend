// --- Types ---
interface Stakeholder {
  id: string;
  name: string;
  avatar: string;
}

// --- Data ---
const stakeholders: Stakeholder[] = [
  { id: "1", name: "Michael Femi",  avatar: "/src/assets/images/testimonial_avatar_03.png"  },
  { id: "2", name: "Sarah Johnson", avatar: "/src/assets/images/testimonial_avatar_01.png"   },
  { id: "3", name: "Emily Davis",   avatar: "/src/assets/images/testimonial_avatar_02.png"   },
  { id: "4", name: "David Ibe",     avatar: "/src/assets/images/testimonial_avatar_03.png"   },
  { id: "5", name: "Lisa Anderson", avatar: "/src/assets/images/testimonial_avatar_02.png"    },
  { id: "6", name: "Tobias Monty",  avatar: "/src/assets/images/testimonial_avatar_01.png"  },
];

const VISIBLE_COUNT = 6;
const EXTRA_COUNT = 3;

// --- Props ---
interface KeyStakeholdersProps {
  stakeholders?: Stakeholder[];
  extraCount?: number;
  onMoreClick?: () => void;
}

// --- Component ---
const KeyStakeholders = ({
  stakeholders: items = stakeholders,
  extraCount = EXTRA_COUNT,
  onMoreClick,
}: KeyStakeholdersProps) => {
  const visible = items.slice(0, VISIBLE_COUNT);

  return (
    <div className=" bg-white rounded-2xl border border-line card-shadow p-6 w-[65%]">
      <h2 className="text-lg font-bold text-text-title mb-5">
        Key Stakeholders
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-x-4 gap-y-10">
        {visible.map((person) => (
          <div key={person.id} className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm shrink-0">
              <img
                src={person.avatar}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs font-medium text-text-title text-center leading-tight">
              {person.name}
            </p>
          </div>
        ))}
      </div>

      {/* More */}
      {extraCount > 0 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={onMoreClick}
            className="text-sm text-text-body font-lato hover:text-text-title transition-colors duration-150"
          >
            +{extraCount} more
          </button>
        </div>
      )}
    </div>
  );
};

export default KeyStakeholders;