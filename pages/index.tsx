import ImgurCard from "@/components/ImgurCard";
import Loading from "@/components/Loading";
import Select from "@/components/Select";
import { ImgurItem } from "@/interfaces/ImgurItem";
import { SECTIONS, SORTS, WINDOWS } from "@/libs/constants";
import { fetchData } from "@/libs/utils";
import { useEffect, useState } from "react";

function IndexPage() {
  const [section, setSection] = useState<string>("hot");
  const [sort, setSort] = useState<string>("viral");
  const [timeWindow, setTimeWindow] = useState<string>("day");
  const [showViral, setShowViral] = useState<boolean>(true);
  const [data, setData] = useState<Array<ImgurItem>>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);

  const handleScroll = () => {
    if (isLoading || reachedEnd) return;

    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      const newPage = page + 1;
      setPage(newPage);
      setIsLoading(true);
      fetchData(section, sort, timeWindow, showViral, newPage)
        .then((newData) => {
          const addedData = newData.filter((item) => {
            return data.findIndex((itemData) => itemData.id == item.id) < 0;
          });
          if (addedData.length == 0) {
            setReachedEnd(true);
            return;
          }
          const tempData = data.slice();
          tempData.push(...addedData);
          setData(tempData);
          setIsLoading(false);
        })
        .catch((_) => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const page = 1;
    setPage(page);
    setReachedEnd(false);

    setIsLoading(true);
    fetchData(section, sort, timeWindow, showViral, page)
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((_) => {
        setIsLoading(false);
      });
  }, [section, sort, timeWindow, showViral]);

  return (
    <div className="relative container mx-auto my-4 px-5">
      <div className="flex flex-wrap justify-center items-center gap-5 p-5 mb-10 border-b border-gray-200">
        <Select
          label="Section"
          value={section}
          onChange={(value: string) => setSection(value)}
          options={SECTIONS}
        />
        <Select
          label="Sort"
          value={sort}
          onChange={(value: string) => setSort(value)}
          options={SORTS}
        />
        <Select
          label="Window"
          value={timeWindow}
          onChange={(value: string) => setTimeWindow(value)}
          options={WINDOWS}
        />
        <div>
          <label htmlFor="viral" className="mr-2 font-bold">
            Show Viral Images:
          </label>
          <input
            id="viral"
            type="checkbox"
            checked={showViral}
            onChange={(e) => setShowViral(e.target.checked)}
            className="border rounded py-1 px-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.map((item) => {
          return <ImgurCard key={item.id} item={item} />;
        })}
      </div>

      {isLoading && (
        <div className="fixed left-0 top-0 w-screen h-screen flex justify-center items-center bg-[#00000013] backdrop-blur-sm">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default IndexPage;
