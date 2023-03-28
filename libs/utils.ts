import axios from "axios";
import { ImgurItem } from "@/interfaces/ImgurItem";
import { IMGUR_API_CLIENT_ID } from "./constants";

export const fetchData = async (
  section: string,
  sort: string,
  window: string,
  showViral: boolean,
  page: number,
  perPage: number = 20
) => {
  try {
    const response = await fetch(
      `https://api.imgur.com/3/gallery/${section}/${sort}/${window}/${page}?showViral=${showViral}&perPage=${perPage}`,
      {
        headers: { Authorization: `Client-ID ${IMGUR_API_CLIENT_ID}` },
      }
    );
    const { data } = await response.json();
    return data as Array<ImgurItem>;
  } catch (e) {
    console.log(e);
  }
  return [];
};

export const fetchItem = async (id: string) => {
  try {
    const response = await axios.get(`https://api.imgur.com/3/gallery/${id}`, {
      headers: { Authorization: `Client-ID ${IMGUR_API_CLIENT_ID}` },
    });
    return response.data.data as ImgurItem;
  } catch (e) {
    console.log(e);
  }
  return null;
};
