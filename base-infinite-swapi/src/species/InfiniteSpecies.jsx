import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery(
    "sw-species",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );
  // TODO: get data for InfiniteScroll via React Query

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error ! {error.toString()}</div>;
  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((specy) => {
            return (
              <Species
                key={specy.name}
                name={specy.name}
                averageLifespan={specy.average_lifespan}
                language={specy.language}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
