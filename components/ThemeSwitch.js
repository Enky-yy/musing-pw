import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { HiSun, HiMoon } from 'react-icons/hi'
import useSound from 'use-sound'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const [ThemeSound] = useSound('/static/sounds/switch-on.mp3')

  const toggleTheme = () => {
    setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    return (
      <div className="ml-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-zinc-300 p-2 dark:bg-zinc-700">
        <div className="h-4 w-4" />
      </div>
    )
  }

  return (
    <div className="ml-1 cursor-pointer rounded-full bg-zinc-300 ring-zinc-400 transition-all hover:bg-zinc-300 hover:ring-1 dark:bg-zinc-700 dark:ring-white dark:hover:bg-zinc-800">
      <motion.button
        className="flex h-8 w-8 items-center justify-center p-2"
        whileTap={{
          scale: 0.7,
          rotate: 360,
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2, ease: 'easeIn' }}
        aria-label="Toggle Dark Mode"
        type="button"
        onClick={() => {
          toggleTheme()
          try {
            ThemeSound()
          } catch (e) {
            // Ignore sound play error
          }
        }}
      >
        {theme === 'dark' || resolvedTheme === 'dark' ? (
          <HiSun className="h-4 w-4 hover:animate-spin" />
        ) : (
          <HiMoon className="h-4 w-4 hover:animate-spin" />
        )}
      </motion.button>
    </div>
  )
}

export default ThemeSwitch
