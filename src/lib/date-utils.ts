import { differenceInMonths, parse } from "date-fns";

export function calculateDuration(period: string): string {
  const [startStr, endStr] = period.split(" - ");
  
  const parseDate = (dateStr: string): Date => {
    if (dateStr.toLowerCase() === "present") {
      return new Date();
    }
    // Parse "Month Year" format (e.g., "July 2023")
    return parse(dateStr, "MMMM yyyy", new Date());
  };

  try {
    const startDate = parseDate(startStr.trim());
    const endDate = parseDate(endStr.trim());
    
    const totalMonths = differenceInMonths(endDate, startDate);
    
    if (totalMonths < 1) {
      return "< 1 month";
    }
    
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    const parts: string[] = [];
    if (years > 0) {
      parts.push(`${years} ${years === 1 ? "year" : "years"}`);
    }
    if (months > 0) {
      parts.push(`${months} ${months === 1 ? "month" : "months"}`);
    }
    
    return parts.join(" ");
  } catch {
    return "";
  }
}

// A role is a "promotion" only when it's the first role of a later role group
// (i.e. the group order represents sequential title changes, not concurrent roles).
export function isPromotedRole(roleGroupIndex: number, roleWithinGroupIndex: number): boolean {
  return roleGroupIndex > 0 && roleWithinGroupIndex === 0;
}
