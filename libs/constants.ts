export type ASSET_TYPE = "image/jpeg" | "image/png" | "image/gif" | "video/mp4";
export const IMGUR_API_CLIENT_ID = process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID!;
export const SECTIONS = [
  {
    label: "Hot",
    value: "hot",
  },
  {
    label: "Top",
    value: "top",
  },
  {
    label: "User",
    value: "user",
  },
];
export const SORTS = [
  {
    label: "Viral",
    value: "viral",
  },
  {
    label: "Top",
    value: "top",
  },
  {
    label: "Time",
    value: "time",
  },
];
export const WINDOWS = [
  {
    label: "Day",
    value: "day",
  },
  {
    label: "Week",
    value: "week",
  },
  {
    label: "Year",
    value: "year",
  },
  {
    label: "All",
    value: "all",
  },
];
