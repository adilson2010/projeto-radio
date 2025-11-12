
import { useRef } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import RadioPlayer from '../../components/feature/RadioPlayer';
import ChatrollChat from '../../components/feature/ChatrollChat';
import ProgramSchedule from '../../components/feature/ProgramSchedule';
import AppDownload from '../../components/feature/AppDownload';
import Button from '../../components/base/Button';

export default function Home() {
  const radioPlayerRef = useRef<{ togglePlay: () => void }>(null);

  const handlePlayNow = () => {
    // Scroll para o player e iniciar reprodução
    const playerElement = document.getElementById('player');
    if (playerElement) {
      playerElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Aguardar scroll e então iniciar reprodução
      setTimeout(() => {
        if (radioPlayerRef.current) {
          radioPlayerRef.current.togglePlay();
        }
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Header />
      
      {/* Hero Section */}
      <section 
        id="home"
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://readdy.ai/api/search-image?query=Vibrant%20reggae%20music%20festival%20scene%20with%20colorful%20Rastafarian%20flags%2C%20musical%20instruments%20like%20guitars%20and%20drums%2C%20tropical%20palm%20trees%2C%20warm%20sunset%20lighting%2C%20people%20dancing%20and%20celebrating%2C%20Bob%20Marley%20style%20atmosphere%2C%20green%20yellow%20red%20colors%2C%20peaceful%20unity%20vibe%2C%20outdoor%20concert%20stage%2C%20speakers%20and%20sound%20equipment%2C%20Caribbean%20island%20setting%2C%20joyful%20community%20gathering%2C%20authentic%20reggae%20culture%20celebration&width=1920&height=1080&seq=hero-reggae-bg&orientation=landscape')`
        }}
      >
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'Pacifico, serif' }}>
              Ras Reggae Radio
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              A melhor música reggae 24 horas por dia, Conosco é só paz, amor e boas vibrações!
            </p>
            <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto">
              Conecte-se com a cultura reggae autêntica. Ouça os clássicos do Roots Reggae, e descubra novos talentos do reggae mundial.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handlePlayNow}
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xl font-bold whitespace-nowrap transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                <i className="ri-play-fill mr-3 text-2xl"></i>
                Tocar Agora
              </Button>
              
              <Button 
                onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
                variant="secondary" 
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-xl font-bold whitespace-nowrap transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                <i className="ri-chat-3-fill mr-3 text-2xl"></i>
                Chat Ao Vivo
              </Button>
            </div>

            {/* Estatísticas em destaque */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="text-3xl font-bold text-yellow-300">24/7</div>
                <div className="text-sm opacity-90">Streaming</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="text-3xl font-bold text-yellow-300">HD</div>
                <div className="text-sm opacity-90">Qualidade</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="text-3xl font-bold text-yellow-300">1.2K+</div>
                <div className="text-sm opacity-90">Ouvintes</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="text-3xl font-bold text-yellow-300">Grátis</div>
                <div className="text-sm opacity-90">Sempre</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i className="ri-arrow-down-line text-white text-3xl opacity-70"></i>
        </div>
      </section>

      {/* Player e Chat Section */}
      <section id="player" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Radio Player */}
            <div className="flex justify-center">
              <RadioPlayer ref={radioPlayerRef} />
            </div>

            {/* Chat em Destaque */}
            <div id="chat-section" className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-green-800 mb-4">
                  <i className="ri-chat-3-fill mr-3 text-green-600"></i>
                  Converse Conosco
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Participe da nossa comunidade! Converse com outros fãs de reggae, peça suas músicas favoritas e compartilhe sua paixão pela cultura rastafári.
                </p>
                
                {/* Benefícios do Chat */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <i className="ri-music-2-line text-green-600 text-xl w-6 h-6 flex items-center justify-center"></i>
                    <span>Peça suas músicas</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <i className="ri-group-line text-green-600 text-xl w-6 h-6 flex items-center justify-center"></i>
                    <span>Comunidade ativa</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <i className="ri-time-line text-green-600 text-xl w-6 h-6 flex items-center justify-center"></i>
                    <span>Moderação 24/7</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <i className="ri-smartphone-line text-green-600 text-xl w-6 h-6 flex items-center justify-center"></i>
                    <span>Funciona em todos os dispositivos</span>
                  </div>
                </div>
              </div>

              {/* Chat Component */}
              <ChatrollChat />
            </div>
          </div>
        </div>
      </section>

      {/* Program Schedule */}
      <section id="programacao" className="py-20 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-800 mb-4">Programação</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Confira nossa programação especial com os melhores DJs e programas temáticos de reggae
            </p>
          </div>
          <ProgramSchedule />
        </div>
      </section>

      {/* App Download */}
      <section id="app" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <AppDownload />
        </div>
      </section>

      {/* About Section */}
      <section id="contato" className="py-20 bg-gradient-to-br from-green-800 to-yellow-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Sobre a Ras Reggae Radio</h2>
              <p className="text-lg mb-6 opacity-90">
                Desde 2010, a Ras Reggae Radio tem sido a voz autêntica do reggae no Brasil e no mundo. 
                Nossa missão é espalhar a mensagem de amor, paz e humildade através da música reggae.
              </p>
              <p className="text-lg mb-8 opacity-90">
                Com uma programação cuidadosamente selecionada, apresentamos desde os clássicos atemporais 
                até os novos talentos do reggae contemporâneo, sempre mantendo a essência e a qualidade 
                que nossos ouvintes merecem.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">15+</div>
                  <div className="text-sm opacity-90">Anos no ar</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">50K+</div>
                  <div className="text-sm opacity-90">Fãs no mundo</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20reggae%20radio%20studio%20setup%20with%20vintage%20microphones%2C%20mixing%20console%2C%20vinyl%20records%2C%20Bob%20Marley%20posters%2C%20Rastafarian%20colors%2C%20warm%20lighting%2C%20broadcasting%20equipment%2C%20headphones%2C%20speakers%2C%20cozy%20atmosphere%2C%20authentic%20reggae%20culture%20elements%2C%20green%20yellow%20red%20decorations%2C%20peaceful%20vibe%2C%20music%20production%20environment&width=600&height=400&seq=studio-about&orientation=landscape"
                alt="Estúdio da Ras Reggae Radio"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
