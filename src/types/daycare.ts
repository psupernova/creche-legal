export interface DaycareReview {
  text: string;
  rating: number;
  author: string;
  date: string;
}

export interface Daycare {
  id: string;
  name: string;
  distance: number;
  duration: number;
  rating: number;
  features: string[];
  image: string;
  address: string;
  latestReview: DaycareReview;
  website?: string;
  phone?: string;
}