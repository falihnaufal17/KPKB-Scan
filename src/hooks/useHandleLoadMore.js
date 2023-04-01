import { useEffect, useState } from 'react'

const useHandleLoadMore = (initData = []) => {
  const [data, setData] = useState([])
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    setData(initData.slice(0, 10))
  }, [initData])

  const handleLoadMore = () => {
    const total = initData.length
    let limit = 10

    console.log("LIMIT", limit)
    if (data.length < total) {
      setLoadingMore(true)
      limit += 10

      setTimeout(() => {
        const newData = initData.slice(limit+1, limit)
        setData([...data, ...newData])

        setLoadingMore(false)
      }, 1000)
    }
  }

  return {
    data,
    handleLoadMore,
    loadingMore
  }
}

export default useHandleLoadMore