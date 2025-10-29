import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { Link } from 'react-router-dom'

const Categories = () => {
  const paramms = new URLSearchParams({
    categoryId: '68fbc61a0981fa072851eb03'
  })
  return (
    <PageWrapper>
      <Link to={`/categories/subjects?${paramms.toString()}`}>Mathematics</Link>
    </PageWrapper>
  )
}

export default Categories
