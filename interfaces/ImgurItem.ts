import { ASSET_TYPE } from "@/libs/constants";

export interface ImgurItem {
  id: string;
  title: string;
  description: string | null;
  datetime: number;
  cover: string;
  cover_width: number;
  cover_height: number;
  views: number;
  link: string;
  ups: number;
  downs: number;
  points: number;
  score: number;
  is_album: boolean;
  section: string;
  comment_count: number;
  favorite_count: number;
  images_count: number;
  images: Array<{
    id: string;
    type: ASSET_TYPE;
    animated: boolean;
    width: number;
    height: number;
    link: string;
  }>;
}
