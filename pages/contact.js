import siteMetadata from '@/data/siteMetadata'
import ContactLink from '@/components/ContactLink'
import { PageSEO } from '@/components/SEO'

const Contact = () => {
  return (
    <>
      <PageSEO title={`Contact - ${siteMetadata.author}`} description="All my contacts" />
      <div className="mx-auto max-w-3xl overflow-hidden">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Contact
        </h1>
        <div className="pb-8 pt-10">
          <ul className="font-semi-bold flex flex-col space-y-4">
            <ContactLink href="mailto:shahharsh4653@gmail.com" title="gmail" icon="shahharsh4653" />
            <ContactLink href="https://github.com/Enky-yy" title="github" icon="Enky-yy" />
            <ContactLink
              href="https://twitter.com/HarshShah1510"
              title="twitter"
              icon="HarshShah1510"
            />
            <ContactLink
              href="https://www.linkedin.com/in/harshvardhanshah1510/"
              title="linkedin"
              icon="harshvardhanshah1510"
            />
          </ul>
        </div>
      </div>
    </>
  )
}

export default Contact
