// utils/sessionCache.ts

export const getActivitiesFromSession = ({
  name,
}: {
  name: string;
}): {
  activitiesData: any[];
  activitiesTotal: number;
  scrollPosition: number;
  activitiesPage: string;
} | null => {
  try {
    const raw = sessionStorage.getItem(name);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    // Validation
    if (
      !parsed ||
      !Array.isArray(parsed.activitiesData) ||
      typeof parsed.activitiesTotal !== "number" ||
      typeof parsed.scrollPosition !== "number" ||
      typeof parsed.activitiesPage !== "string"
    ) {
      return null;
    }

    return parsed;
  } catch (error) {
    console.error("Error reading session data for", name, ":", error);
    return null;
  }
};

export const getTransportFromSession = ({
  name,
}: {
  name: string;
}): {
  transportData: any[];
  transportTotal: number;
  scrollPosition: number;
  transportPage: string;
} | null => {
  try {
    const raw = sessionStorage.getItem(name);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    // Validation
    if (
      !parsed ||
      !Array.isArray(parsed.transportData) ||
      typeof parsed.transportTotal !== "number" ||
      typeof parsed.scrollPosition !== "number" ||
      typeof parsed.transportPage !== "string"
    ) {
      return null;
    }

    return parsed;
  } catch (error) {
    console.error("Error reading session data for", name, ":", error);
    return null;
  }
};

export const removeSessionData = (name: string) => {
  {
    /*
    activitiesData
    transportData
    */
  }
  try {
    sessionStorage.removeItem(name);
  } catch (error) {
    console.error("Error clearing session data:", error);
  }
};
