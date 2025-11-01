import { useEffect, useRef, useState } from 'react'
import { Response, ServiceFunction } from '~/types'
import useAxios from './use-axios'

type UsePaginationProps<Data> = {
  service: ServiceFunction<Response<Data>, Params>
}

type Return<Data> = {
  loading: boolean
  page: number
  totalPages: number
  list: Data[]
  isExpandable?: boolean
  loadMore?: () => void
  resetData: () => void
}

export type Params = {
  page: number
}

export type PaginationService<Data> = ServiceFunction<Response<Data>, Params>

function usePagination<Data>({
  service
}: UsePaginationProps<Data>): Return<Data> {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [list, setList] = useState<Data[]>([])
  const initialized = useRef(false)

  const { loading, response, fetchData } = useAxios<Response<Data>, Params>({
    service,
    fetchOnMount: false,
    defaultResponse: { data: [] }
  })

  // const loadMore = () => {
  //   initialized.current = false
  //   setPage((prevPage) => prevPage + 1)
  // }

  const resetData = () => {
    initialized.current = false
    setPage(1)
    setList([])
    setTotalPages(1)
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      void fetchData({ page })
    }
  }, [fetchData, page])

  useEffect(() => {
    // setList((prevList) => [...prevList, ...(response?.data ?? [])])
    setList(response?.data ?? [])
    setTotalPages(response?.totalPages || 1)
  }, [response])

  return {
    loading,
    page,
    totalPages,
    list,
    //isExpandable: page < totalPages,
    //loadMore,
    resetData
  }
}

export default usePagination
