"use server";

export const getAllDestinations = async () => {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_ENDPOINT
    }/destination`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const data = await response.json();

  return {
    data: data?.rows ?? [],
    error: data?.error || null,
  };
};

export const getDestinationBySlug = async (slug: string) => {
  if (!slug) {
    throw new Error("Destination slug is required");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/destination/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch transport details for ID: ${slug}`);
  }

  const data = await response.json();

  return {
    data: data?.row ?? null,
    error: data.error ?? null,
  };
};
