export default async function handler(req, res) {
  try {
    const headers = {
      'User-Agent': 'musing-pw-portfolio',
      ...(process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {}),
    }

    const [userResponse, userReposResponse] = await Promise.all([
      fetch('https://api.github.com/users/Enky-yy', { headers }),
      fetch('https://api.github.com/users/Enky-yy/repos?per_page=100', { headers }),
    ])

    const user = userResponse.ok ? await userResponse.json() : {}
    const repositories = userReposResponse.ok ? await userReposResponse.json() : []

    const mine = Array.isArray(repositories) ? repositories.filter((repo) => !repo.fork) : []
    const stars = mine.reduce((accumulator, repository) => {
      return accumulator + (repository['stargazers_count'] || 0)
    }, 0)

    res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')

    return res.status(200).json({
      followers: user.followers ?? 0,
      stars,
      repos: user.public_repos ?? 0,
      gists: user.public_gists ?? 0,
    })
  } catch (error) {
    console.error('GitHub Stats API Error:', error)
    return res.status(200).json({
      followers: 0,
      stars: 0,
      repos: 0,
      gists: 0,
    })
  }
}
