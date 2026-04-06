import { useEffect, useState } from "react";

export const SECTIONS = [
  { id: "general", label: "General" },
  { id: "roles_permissions", label: "Roles and Permissions" },
  { id: "organization_rules", label: "Organization Rules" },
  { id: "approval_rules", label: "Approval Rules" },
  { id: "security_access", label: "Security & Access" },
  { id: "notifications", label: "Notifications" },
  { id: "data_compliance", label: "Data & Compliance" },
  { id: "danger_zone", label: "Danger Zone" },
];

export const useScrollNav = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        {
          threshold: 0,
          rootMargin: "-40% 0px -40% 0px",
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return { activeSection,  scrollTo, SECTIONS };
};