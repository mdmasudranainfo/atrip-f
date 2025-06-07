import { useState, useEffect } from "react";
import { getFeaturedCards } from "@/lib/actions/landing-actions";

export interface RateScore {
  title: string;
  total: number;
  percent: number;
}

export interface ReviewData {
  score_total: string;
  score_text: string;
  total_review: number;
  rate_score: {
    [key: number]: RateScore;
  };
}

export interface LandingCardDataTypes {
  id: number;
  title: string;
  sub_title: string;
  slug: string;
  address: string;
  map_lat: string;
  map_lng: string;
  map_zoom: number;
  price: string;
  duration: number;
  service_including: string[] | null;
  image_url: string;
  review_data: ReviewData;
  review_score?: ReviewData;
  sale_price?: number | string;
}

export interface VisaDataType {
  id: number;
  title: string;
  working_day: number;
  express_working_day: number;
  slug: string;
  seller_id: number;
  country_id: number;
  overview: string | null;
  documents: string | null;
  how_to_apply: string | null;
  terms_conditions: string | null;
  faqs: string;
  image_id: number;
  banner_image_id: number;
  is_featured: number;
  gallery: string;
  video: string | null;
  review_score: string;
  status: string;
  default_state: number;
  price: string;
  sale_price?: number | string;
  create_user: number;
  update_user: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  image_url: string;
  review_data?: {
    score_text?: string;
    score_total?: number;
    total_review?: number;
    rate_score?: Record<number, any>;
  };
}

export interface LandingVisaResponse {
  current_page: number;
  data: VisaDataType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: { url: string | null; label: string; active: boolean }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

//

const useFeaturedCards = (category: string) => {
  const [featuredCards, setFeaturedCards] = useState<LandingCardDataTypes[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedCards = async () => {
      try {
        const result = await getFeaturedCards(category);
        if (result?.data) {
          setFeaturedCards(result?.data);
        } else {
          setError("Failed to load featured cards.");
        }
      } catch (err) {
        setError("An error occurred while fetching featured cards.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCards();
  }, [category]);

  return { featuredCards, loading, error };
};

export default useFeaturedCards;
