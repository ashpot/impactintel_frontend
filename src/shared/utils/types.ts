export type NavItem = {
  id: string;
  label: string;
  path: string;
  icon: React.FC<{ className?: string }>;
};
