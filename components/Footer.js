import { useState, useEffect } from 'react'
import { currentDayName } from '@/lib/utils/dateUtils'
import Link from './Link'
import NowPlayingFooter from './NowPlayingFooter'

export default function Footer() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const year = mounted ? new Date().getFullYear() : 2026
  const dayName = mounted ? currentDayName() : 'day'

  return (
    <footer>
      <div className="mt-10 flex flex-col items-center">
        <div className="">
          <NowPlayingFooter />
        </div>
        <div className="mb-2 hidden text-sm text-gray-500 dark:text-gray-400 md:flex">
          <div className="mx-1">
            <Link href="https://harsh-shah.me/" className="link-underline">
              Harsh Shah {` © ${year}`}
            </Link>
          </div>
          {`•`}
          <div className="mx-1">
            <Link href="https://qod.shakiltech.com/" className="link-underline">
              Have a good {dayName}!
            </Link>
          </div>
          {`•`}
          <div className="mx-1">
            <Link href="/contact" className="link-underline">
              Contact
            </Link>
          </div>
        </div>
        <div className="mb-2 text-sm text-gray-500 dark:text-gray-400 sm:block md:hidden lg:hidden">
          <div className="mx-1">
            <Link href="https://harsh-shah.me/" className="link-underline">
              Parth{` © ${year}`}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
