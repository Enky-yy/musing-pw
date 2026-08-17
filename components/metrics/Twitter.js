import useSWR from 'swr'
import fetcher from 'lib/fetcher'
import MetricCard from 'components/metrics/Card'

export default function TwitterCard({ type }) {
  const { data } = useSWR('/api/twitter-user', fetcher)

  if (!data) {
    return null
  }

  let followers = data?.user?.public_metrics?.followers_count ?? 0
  let following = data?.user?.public_metrics?.following_count ?? 0
  let count = data?.user?.public_metrics?.tweet_count ?? 0
  let username = data?.user?.username || 'HarshShah1510'

  const link = 'https://twitter.com/HarshShah1510'

  return (
    <>
      {type == 'followers' && (
        <MetricCard header="Twitter Followers" link={link} metric={followers} isCurrency={false} />
      )}
      {type == 'following' && (
        <MetricCard header="Twitter Following" link={link} metric={following} isCurrency={false} />
      )}
      {type == 'total_tweets' && (
        <MetricCard header="Tweet Count" link={link} metric={count} isCurrency={false} />
      )}
    </>
  )
}
