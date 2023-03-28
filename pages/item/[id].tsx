import Loading from "@/components/Loading";
import { ImgurItem } from "@/interfaces/ImgurItem";
import { fetchItem } from "@/libs/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ItemPage() {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [item, setItem] = useState<ImgurItem | null>(null);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const itemId = id.toString();
      fetchItem(itemId)
        .then((item) => {
          if (item) {
            setItem(item);
          } else {
            router.push("/");
          }

          setIsLoading(false);
        })
        .catch((_) => {
          setIsLoading(false);
        });
    }
  }, [id]);

  return (
    <div className="relative container mx-auto my-4 px-5">
      <div className="w-full h-16 flex justify-start items-center px-10">
        <svg
          onClick={() => router.push("/")}
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-arrow-left-circle text-black cursor-pointer"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
          />
        </svg>
      </div>
      {item != null && (
        <div className="w-full flex flex-col justify-start items-center p-5">
          <div className="w-full p-2 mb-10 border-b border-gray-300">
            <p className="text-2xl font-bold text-center mb-1">{item.title}</p>
            <p className="text-center text-gray-500 mb-5">
              {item.description ?? "No description"}
            </p>
            <p className="text-center text-gray-500 mb-1">
              Upvotes: {item.ups}
            </p>
            <p className="text-center text-gray-500 mb-1">
              Downvotes: {item.downs}
            </p>
            <p className="text-center text-gray-500 mb-1">
              Score: {item.score}
            </p>
          </div>
          <div className="w-full flex justify-center items-center">
            {item.images && item.images.length > 0 ? (
              item.images[0].type == "video/mp4" ? (
                <video
                  width={item.images[0].width}
                  height={item.images[0].height}
                  controls
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
              <div className="w-full h-full min-h-[100px] flex flex-col justify-center items-center bg-gray-300">
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
        </div>
      )}

      {isLoading && (
        <div className="w-full flex justify-center items-center my-10">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default ItemPage;
