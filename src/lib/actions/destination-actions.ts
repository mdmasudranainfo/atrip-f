"use server";

interface Params {
  featured?: number;
  page?: number;
  per_page?: number;
}

export const getAllDestinations = async (params:{params:Params}) => {
  const {featured, page, per_page} = params.params;

  const queryParams = new URLSearchParams();
  
  if (featured) queryParams.append('featured', featured.toString());
  if (page) queryParams.append('page', page.toString());
  if (per_page) queryParams.append('per_page', per_page.toString());

  const query = queryParams.toString() ? `?${queryParams.toString()}` : "";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/destination${query}`,
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
