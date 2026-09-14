export default function Container(props) {
  const { children } = props

  return (
    <div className="bg-blush-page dark:bg-gray-900">
      <main id="skip" className="flex flex-col justify-center bg-blush-page px-8 dark:bg-gray-900">
        {children}
      </main>
    </div>
  )
}
