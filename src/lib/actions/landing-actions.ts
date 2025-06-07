export const getFeaturedCards = async (category: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${category}/featured`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return { data: data?.rows };
  } catch (error) {
    console.error("Failed to fetch tour featured cards:", error);
    return { data: [] };
  }
};
