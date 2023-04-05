import { useEffect, useState } from "react";

const useHandleLoadMore = (initData = []) => {
  const [data, setData] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    setData(initData);
    setPage(1)
  }, [initData]);

  const handleLoadMore = () => {
    setLoadingMore(true);

    setTimeout(() => {
      setPage((prev) => prev + 1);
      setLoadingMore(false)
    }, 1000)
  };

  return {
    data,
    handleLoadMore,
    loadingMore,
  };
};

export default useHandleLoadMore;
