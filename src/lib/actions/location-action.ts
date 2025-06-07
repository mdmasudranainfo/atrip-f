import { z } from "zod";
export interface Location {
  id: number;
  title: string;
  image: string;
  content: string;
  parent_name: string;
}

interface PaginatedResponse {
  data: Location[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  service_name: string;

  //   total_pages
}

const LocationSearchSchema = z.object({
  page: z.number().default(1),
  per_page: z.number().default(10),
  search: z.string().optional(),
  service_name: z.string().optional(),
});

export async function getAllLocations(
  params: z.infer<typeof LocationSearchSchema>
) {
  try {
    const queryParams = new URLSearchParams({
      service_name: params.service_name || "",
      page: params.page.toString(),
      per_page: params.per_page.toString(),
    });

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_ENDPOINT
      }/locations?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return { data: [] };
    }

    const data: PaginatedResponse = await response.json();
    return data;
  } catch (error) {
    return { data: [] };
  }
}

export async function getLocationsWithType(
  type: string,
  params: z.infer<typeof LocationSearchSchema>
) {
  try {
    const queryParams = new URLSearchParams({
      service_name: params.service_name || "",
      page: params.page.toString(),
      per_page: params.per_page.toString(),
    });

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_ENDPOINT
      }/locations/${type}?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return { data: [] };
    }

    const data: PaginatedResponse = await response.json();
    return data;
  } catch (error) {
    return { data: [] };
  }
}

export async function getSelectedLocation(selectedIds: number[]) {
  try {
    const queryParams = new URLSearchParams();

    selectedIds.forEach((id) =>
      queryParams.append("custom_ids[]", id.toString())
    );

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_ENDPOINT
      }/locations?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data: PaginatedResponse = await response.json();

    return (data?.data || []) as Location[];
  } catch (error) {
    return [];
  }
}
