const ContactLink = ({ title, href, icon }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <li className="duration-250 mr-2 inline cursor-pointer text-2xl transition-colors ease-in hover:text-blush-muted sm:text-3xl md:text-2xl lg:text-3xl">
        <span className="duration-250 transition-colors ease-in hover:text-primary-500 dark:hover:text-primary-400">
          {icon}
        </span>
        <span className="font-light opacity-50">@</span>
        <a className="duration-250 font-mono  transition-colors ease-in hover:text-blush-muted ">
          {title}
        </a>
      </li>
    </a>
  )
}

export default ContactLink
