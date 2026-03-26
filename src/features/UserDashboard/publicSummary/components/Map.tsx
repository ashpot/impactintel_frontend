import { useState, useCallback, useEffect } from "react";
import {
  MapContainer,
  CircleMarker,
  ZoomControl,
  GeoJSON,
  Pane,
} from "react-leaflet";
import type { PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import { AnimatePresence, motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectType = "Water" | "Education" | "Healthcare" | "Women Empowerment";

interface MapPin {
  id:            string;
  city:          string;
  lat:           number;
  lng:           number;
  type:          ProjectType;
  projects:      number;
  beneficiaries: number;
}

// ─── Mock data — swap with API call when backend is ready ─────────────────────

const PINS: MapPin[] = [
  { id: "1", city: "Lagos",   lat:  6.5244, lng:  3.3792, type: "Education",         projects: 5, beneficiaries: 2156 },
  { id: "2", city: "Kano",    lat: 12.0022, lng:  8.5920, type: "Education",         projects: 3, beneficiaries: 1480 },
  { id: "3", city: "Sokoto",  lat: 13.0059, lng:  5.2476, type: "Water",             projects: 2, beneficiaries:  870 },
  { id: "4", city: "Abuja",   lat:  9.0579, lng:  7.4951, type: "Healthcare",        projects: 4, beneficiaries: 3200 },
  { id: "5", city: "Makurdi", lat:  7.7340, lng:  8.5227, type: "Women Empowerment", projects: 2, beneficiaries:  960 },
  { id: "6", city: "Enugu",   lat:  6.4584, lng:  7.5464, type: "Healthcare",        projects: 3, beneficiaries: 1100 },
  { id: "7", city: "Ibadan",  lat:  7.3776, lng:  3.9470, type: "Women Empowerment", projects: 2, beneficiaries:  740 },
  { id: "8", city: "Warri",   lat:  5.5167, lng:  5.7500, type: "Education",         projects: 2, beneficiaries:  620 },
  { id: "9", city: "Calabar", lat:  4.9757, lng:  8.3417, type: "Water",             projects: 1, beneficiaries:  410 },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const TYPE_COLORS: Record<ProjectType, string> = {
  "Water":             "#3b82f6",
  "Education":         "#ef4444",
  "Healthcare":        "#22c55e",
  "Women Empowerment": "#1e3a5f",
};

const NIGERIA_STYLE: PathOptions = {
  fillColor:   "#f5e9a0",
  fillOpacity: 1,
  color:       "#d4b84a",
  weight:      1,
};

const MAP_CENTER: [number, number] = [9.082, 8.6753];

// ─── Sub-components ───────────────────────────────────────────────────────────

const Legend = ({
  activeType,
  onToggle,
}: {
  activeType: ProjectType | null;
  onToggle:   (t: ProjectType) => void;
}) => (
  <div className="absolute bottom-10 left-4 z-[1000] bg-white rounded-2xl border border-line px-4 py-3 font-lato">
    <p className="text-xs font-semibold text-text-primary01 mb-2.5">
      Project Types
    </p>
    <div className="flex flex-col gap-2">
      {(Object.entries(TYPE_COLORS) as [ProjectType, string][]).map(
        ([type, color]) => (
          <button
            key={type}
            onClick={() => onToggle(type)}
            className={`flex items-center gap-2 transition-opacity ${
              activeType && activeType !== type ? "opacity-30" : "opacity-100"
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-text-body">{type}</span>
          </button>
        )
      )}
    </div>
  </div>
);

// Fixed overlay card — top-left of parent container
const HoverCard = ({ pin }: { pin: MapPin }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10}}
    animate={{ opacity: 1, y: 0}}
    exit={{opacity: 0, y: 10}}
    transition={{ duration: 0.35, ease: "easeOut" }}
  className="absolute top-4 right-4 z-[1000] bg-white rounded-2xl border border-line shadow-md px-4 py-3 font-lato min-w-[180px] pointer-events-none">
    <div className="flex items-center gap-2 mb-2">
      <span
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{ backgroundColor: TYPE_COLORS[pin.type] }}
      />
      <span className="text-sm font-semibold text-text-primary01">
        {pin.city}, Nigeria
      </span>
    </div>
    <div className="flex flex-col gap-0.5 mb-3">
      <p className="text-xs text-text-body">
        <span className="font-semibold text-text-primary01">{pin.projects}</span>{" "}
        projects
      </p>
      <p className="text-xs text-text-body">
        <span className="font-semibold text-text-primary01">
          {pin.beneficiaries.toLocaleString()}
        </span>{" "}
        beneficiaries
      </p>
    </div>
    <span
      className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium"
      style={{
        backgroundColor: `${TYPE_COLORS[pin.type]}20`,
        color:            TYPE_COLORS[pin.type],
      }}
    >
      {pin.type}
    </span>
  </motion.div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const NigeriaProjectMap = () => {
  const [activeType,  setActiveType]  = useState<ProjectType | null>(null);
  const [hoveredPin,  setHoveredPin]  = useState<MapPin | null>(null);
  const [geoData,     setGeoData]     = useState<object | null>(null);
  const [geoError,    setGeoError]    = useState(false);

  useEffect(() => {
    const loadGeo = async () => {
      try {
        const res  = await fetch("/nigeria-states.json");
        const json = await res.json();
        setGeoData(json);
      } catch {
        setGeoError(true);
      }
    };
    loadGeo();
  }, []);

  const toggleFilter = useCallback((type: ProjectType) => {
    setActiveType((prev) => (prev === type ? null : type));
  }, []);

  const visiblePins = activeType
    ? PINS.filter((p) => p.type === activeType)
    : PINS;

  return (
    <div className="border border-line p-8 bg-white rounded-2xl">
      <div className="relative w-full rounded-xl border-2 border-brand-primary/40 bg-nav-active overflow-hidden">

      {/* Hover card — fixed to top-left of this container */}
      <AnimatePresence>
        {hoveredPin && <HoverCard pin={hoveredPin} />}
      </AnimatePresence>

      <MapContainer
        center={MAP_CENTER}
        zoom={6}
        minZoom={5}
        maxZoom={9}
        zoomControl={false}
        scrollWheelZoom={false}
        style={{ height: "520px", width: "100%" }}
      >
        {geoData && (
          <GeoJSON
            key={JSON.stringify(geoData).slice(0, 20)}
            data={geoData as GeoJSON.GeoJsonObject}
            style={() => NIGERIA_STYLE}
          />
        )}

        {geoError && (
          <div className="absolute inset-0 flex items-center justify-center z-[500]">
            <p className="text-sm text-text-body bg-white px-4 py-2 rounded-xl border border-line">
              Could not load map boundaries
            </p>
          </div>
        )}

        <Pane name="markers" style={{ zIndex: 650 }}>
          {visiblePins.map((pin) => (
            <CircleMarker
              key={pin.id}
              center={[pin.lat, pin.lng]}
              pane="markers"
              radius={pin.city === "Lagos" ? 18 : 10}
              pathOptions={{
                fillColor:   TYPE_COLORS[pin.type],
                fillOpacity: 1,
                color:       "#ffffff",
                weight:      2.5,
              }}
              eventHandlers={{
                mouseover: () => setHoveredPin(pin),
                mouseout:  () => setHoveredPin(null),
              }}
            />
          ))}
        </Pane>

        <ZoomControl position="bottomright" />
      </MapContainer>

      <Legend activeType={activeType} onToggle={toggleFilter} />

    </div>
    </div>
      );
};

export default NigeriaProjectMap;