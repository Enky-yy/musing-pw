import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.SECRET || process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId:
        process.env.OAUTH_CLIENT_KEY || process.env.GITHUB_ID || process.env.GITHUB_CLIENT_ID || '',
      clientSecret:
        process.env.OAUTH_CLIENT_SECRET ||
        process.env.GITHUB_SECRET ||
        process.env.GITHUB_CLIENT_SECRET ||
        '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
}

export default NextAuth(authOptions)
