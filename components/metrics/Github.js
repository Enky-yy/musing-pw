import useSWR from 'swr'
import fetcher from 'lib/fetcher'
import MetricCard from 'components/metrics/Card'

export default function GithubCard() {
  const { data } = useSWR('/api/github-stats', fetcher)

  const stars = data?.stars !== undefined ? Number(data.stars) : null
  const followers = data?.followers !== undefined ? Number(data.followers) : null
  const link = 'https://github.com/Enky-yy'

  return (
    <div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <MetricCard header="GitHub Stars" link={link} metric={stars} isCurrency={false} />
      <MetricCard header="Github Followers" link={link} metric={followers} isCurrency={false} />
    </div>
  )
}
