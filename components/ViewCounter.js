import { useEffect } from 'react'
import useSWR from 'swr-old'
import fetcher from 'lib/fetcher'

export default function ViewCounter({ slug, className, blogPage = false }) {
  let { data } = useSWR(`/api/views/${slug}`, fetcher)
  let views = data?.total !== undefined ? Number(data.total) : null

  useEffect(() => {
    let registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      })

    if (blogPage) {
      registerView()
    }
  }, [blogPage, slug])

  return <span className={className}>{views && views > 0 ? views.toLocaleString() : '–––'}</span>
}
