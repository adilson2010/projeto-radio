
import Header from '../../components/feature/Header';
import RadioPlayer from '../../components/feature/RadioPlayer';
import ProgramSchedule from '../../components/feature/ProgramSchedule';
import ChatrollChat from '../../components/feature/ChatrollChat';
import AppDownload from '../../components/feature/AppDownload';
import Footer from '../../components/feature/Footer';
import Button from '../../components/base/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Header />
      
      {/* Hero Section */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('https://readdy.ai/api/search-image?query=Vibrant%20reggae%20music%20festival%20scene%20with%20Rastafarian%20colors%20green%20yellow%20red%2C%20jamaican%20flag%20elements%2C%20sound%20system%20speakers%2C%20tropical%20palm%20trees%2C%20sunset%20golden%20hour%20lighting%2C%20people%20dancing%20and%20celebrating%2C%20authentic%20caribbean%20atmosphere%2C%20warm%20ambient%20lighting%2C%20professional%20photography%20style%2C%20high%20energy%20positive%20vibes%2C%20cultural%20celebration%20background&width=1920&height=1080&seq=hero-reggae&orientation=landscape')`
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-6" style={{ fontFamily: 'Pacifico, serif' }}>
              Ras Reggae Radio
            </h1>
            <p className="text-2xl md:text-3xl mb-8 text-yellow-300">
              A melhor música reggae 24 horas no ar
            </p>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90">
              Transmitindo os melhores sons do reggae roots 
              direto para você. One Love, One Heart!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-xl px-8 py-4">
                <i className="ri-play-circle-line mr-3 text-2xl"></i>
                Ouvir Agora
              </Button>
              <Button variant="outline" size="lg" className="text-xl px-8 py-4 border-white text-white hover:bg-red-500 hover:text-green-800">
                <i className="ri-download-line mr-3 text-2xl"></i>
                Baixar App
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i className="ri-arrow-down-line text-white text-3xl"></i>
        </div>
      </section>

      {/* Player Section */}
      <section id="player" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-green-800 mb-4">Player Ao Vivo</h2>
              <p className="text-xl text-gray-600">
                Ouça nossa web r ao vivo com qualidade HD
              </p>
            </div>
            <RadioPlayer />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-yellow-500">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg">Horas no Ar</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-lg">Ouvintes Mensais</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-lg">Músicas no Acervo</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-lg">DJs Especializados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Programação e Chat */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Programação Discreta */}
            <div id="programacao">
              <ProgramSchedule />
            </div>
            
            {/* Chat Chatroll */}
            <div>
              <ChatrollChat />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-4">Por que escolher a Ras Reggae?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Somos mais que uma rádio, somos uma comunidade reggae
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-music-2-line text-3xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Música Autêntica</h3>
              <p className="text-gray-600">
                Seleção cuidadosa dos melhores artistas de reggae, roots e dub do mundo
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-live-line text-3xl text-yellow-600"></i>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Transmissão HD</h3>
              <p className="text-gray-600">
                Qualidade de áudio superior para você sentir cada batida do reggae
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-heart-line text-3xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Comunidade</h3>
              <p className="text-gray-600">
                Conecte-se com outros amantes do reggae através do nosso chat ao vivo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section id="app" className="py-20">
        <div className="container mx-auto px-4">
          <AppDownload />
        </div>
      </section>

      {/* DJs Section */}
      <section className="py-20 bg-gradient-to-br from-green-800 to-yellow-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Nossos DJs</h2>
            <p className="text-xl text-yellow-200 max-w-2xl mx-auto">
              Conheça os especialistas que selecionam as melhores músicas para você
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'DJ Marley',
                specialty: 'Reggae Clássico',
                image: 'Professional reggae DJ with dreadlocks in recording studio, warm lighting, authentic jamaican atmosphere, vintage vinyl records, sound mixing equipment, cultural reggae aesthetic, professional portrait photography style, vibrant colors green yellow red'
              },
              {
                name: 'DJ Rasta',
                specialty: 'Roots & Culture',
                image: 'Rastafarian DJ with traditional clothing in modern radio studio, cultural elements, reggae music equipment, warm ambient lighting, authentic caribbean style, professional photography, vibrant rastafarian colors'
              },
              {
                name: 'DJ Echo',
                specialty: 'Dub & Electronic',
                image: 'Modern reggae DJ with electronic music equipment, dub mixing console, studio environment, contemporary reggae culture, professional lighting, music production setup, vibrant green and yellow lighting'
              }
            ].map((dj, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <img
                    src={`https://readdy.ai/api/search-image?query=$%7Bdj.image%7D&width=300&height=300&seq=dj-${index}&orientation=squarish`}
                    alt={dj.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-yellow-300 shadow-xl"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    AO VIVO
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{dj.name}</h3>
                <p className="text-yellow-200 text-lg">{dj.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-green-800 mb-8">Entre em Contato</h2>
            <p className="text-xl text-gray-600 mb-12">
              Tem uma sugestão musical? Quer participar de um programa? Fale conosco!
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-mail-line text-3xl text-green-600"></i>
                </div>
                <h3 className="text-lg font-bold text-green-800 mb-2">Email</h3>
                <p className="text-gray-600">contato@radiorasreggae.com.br</p>
              </div>
              
              <div className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-whatsapp-line text-3xl text-green-600"></i>
                </div>
                <h3 className="text-lg font-bold text-green-800 mb-2">WhatsApp</h3>
                <p className="text-gray-600">(11) 99999-9999</p>
              </div>
              
              <div className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-radio-line text-3xl text-green-600"></i>
                </div>
                <h3 className="text-lg font-bold text-green-800 mb-2">Frequência</h3>
                <p className="text-gray-600">24h Online</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
