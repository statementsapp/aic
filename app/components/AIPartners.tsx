import Image from 'next/image'
import { useTheme } from '../contexts/ThemeContext'

export function AIPartners() {
  const { theme } = useTheme()

  const getThemeClasses = () => {
    switch (theme) {
      case 'modern':
        return 'bg-gray-800 text-white'
      case 'vibrant':
        return 'bg-purple-600 text-white'
      default:
        return 'bg-blue-100 text-gray-800'
    }
  }

  return (
    <section className={`py-16 ${getThemeClasses()} transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Powered by Leading AI</h2>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {[
            { name: 'OpenAI', logo: '/openai.png' },
            { name: 'Claude', logo: '/claude.jpg' },
            { name: 'Midjourney', logo: '/midjourney.svg' },
          ].map((partner) => (
            <div key={partner.name} className="group">
              <div className={`relative w-24 h-24 overflow-hidden rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110 ${partner.name === 'Midjourney' ? 'bg-white' : ''}`}>
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  layout="fill"
                  objectFit="contain"
                  className="transition-opacity duration-300 group-hover:opacity-90"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AIPartners