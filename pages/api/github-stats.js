export default async function handler(req, res) {
  try {
    const userResponse = await fetch('https://api.github.com/users/Enky-yy')
    const userReposResponse = await fetch('https://api.github.com/users/Enky-yy/repos?per_page=100')

    const user = await userResponse.json()
    const repositories = await userReposResponse.json()

    const mine = Array.isArray(repositories) ? repositories.filter((repo) => !repo.fork) : []
    const stars = mine.reduce((accumulator, repository) => {
      return accumulator + (repository['stargazers_count'] || 0)
    }, 0)

    res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')

    return res.status(200).json({
      followers: user.followers || 0,
      stars,
      repos: user.public_repos || 0,
      gists: user.public_gists || 0,
    })
  } catch (error) {
    return res.status(200).json({
      followers: 0,
      stars: 0,
      repos: 0,
      gists: 0,
    })
  }
}
