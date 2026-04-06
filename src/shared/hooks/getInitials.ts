export const getInitials = (name: string | undefined): string => {
  if (typeof name === "string") {
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  } 
  return ""; 
};