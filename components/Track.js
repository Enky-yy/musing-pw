import Image from 'next/image'
export default function Track(track) {
  return (
    <div className="group mt-8 flex w-full max-w-3xl transform flex-row items-baseline border-b border-blush-border transition-all hover:scale-[1.03] dark:border-gray-800">
      <p className="text-sm font-bold text-blush-muted dark:text-gray-600">{track.ranking}</p>
      <div className="flex justify-self-auto">
        <div className="flex flex-col pl-3">
          {track.imageUrl ? (
            <Image className="rounded-lg" src={track.imageUrl} width={48} height={48} alt="" />
          ) : (
            <Image
              className="rounded-lg"
              src="/static/images/spotify.jpeg"
              width={48}
              height={48}
              alt=""
              placeholder="blur"
              blurDataURL="/static/images/SVG-placeholder.png"
            />
          )}
        </div>
        <div className="flex flex-col pl-3">
          <a
            className="w-60 truncate font-medium text-blush-ink group-hover:text-[#1bd760] dark:text-gray-100 group-hover:dark:text-[#1bd760] sm:w-96 md:w-full"
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {track.title}
          </a>
          <p className="mb-4 w-60 truncate text-blush-muted sm:w-96 md:w-full " color="gray.500">
            {track.artist}
          </p>
        </div>
      </div>
    </div>
  )
}
