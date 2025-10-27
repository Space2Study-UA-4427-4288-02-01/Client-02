import { useEffect, useRef, useState } from 'react'
import { Response } from '~/types'

type UseLoadMoreProps<Data> = {
  fetcher: () => Promise<void>
  response: Response<Data>
  deps?: (string | boolean)[]
}

type Return<Data> = {
  page: number
  totalPages: number
  list: Data[]
  isExpandable: boolean
  loadMore: () => void
  resetData: () => void
}

function useLoadMore<Data>({
  deps = [],
  fetcher,
  response
}: UseLoadMoreProps<Data>): Return<Data> {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [list, setList] = useState<Data[]>([])
  const initialized = useRef(false)

  const loadMore = () => {
    initialized.current = false
    setPage((prevPage) => prevPage + 1)
  }

  const resetData = () => {
    initialized.current = false
    setPage(1)
    setList([])
    setTotalPages(1)
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      void fetcher()
    }
  }, [page, ...deps])

  useEffect(() => {
    setList((prevList) => [...prevList, ...(response?.data ?? [])])

    setTotalPages(response?.totalPages || 1)
  }, [response])

  return {
    page,
    totalPages,
    list,
    isExpandable: page < totalPages,
    loadMore,
    resetData
  }
}

export default useLoadMore
