import Image from "next/image";
import { ImgurItem } from "@/interfaces/ImgurItem";
import { useRouter } from "next/router";

type Props = {
  item: ImgurItem;
};

const ImgurCard = ({ item }: Props) => {
  const router = useRouter();

  return (
    <div
      className="w-full flex flex-col justify-start items-center p-1 rounded-md border border-gray-300 cursor-pointer"
      onClick={() => router.push(`/item/${item.id}`)}
    >
      <div className="w-full h-64 rounded-md overflow-hidden">
        {item.images && item.images.length > 0 ? (
          item.images[0].type == "video/mp4" ? (
            <video
              width={item.images[0].width}
              height={item.images[0].height}
              controls={false}
            >
              <source src={item.images[0].link} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={item.images[0].link}
              width={item.images[0].width}
              height={item.images[0].height}
              alt={item.title}
            />
          )
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center bg-gray-300">
            <p className="text-sm text-gray-500">No cover image</p>
            <a
              href={item.link}
              rel="noreferrer"
              target="_blank"
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              View Content
            </a>
          </div>
        )}
      </div>
      <div className="w-full p-2 overflow-hidden">
        <p className="font-bold text-center mb-1">{item.title}</p>
        <p className="text-center text-gray-500 whitespace-pre-wrap">
          {item.description ?? "No description"}
        </p>
      </div>
    </div>
  );
};

export default ImgurCard;
