import useSWR from 'swr'
import fetcher from 'lib/fetcher'
import MetricCard from 'components/metrics/Card'

export default function GithubPersonalCard() {
  const { data } = useSWR('/api/github-stats', fetcher)

  const repos = data?.repos !== undefined ? Number(data.repos) : null
  const gists = data?.gists !== undefined ? Number(data.gists) : null
  const link1 = 'https://github.com/Enky-yy?tab=repositories'
  const link2 = 'https://gist.github.com/Enky-yy'

  return (
    <div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <MetricCard header="Github Repos" link={link1} metric={repos} isCurrency={false} />
      <MetricCard header="Github Gists" link={link2} metric={gists} isCurrency={false} />
    </div>
  )
}
