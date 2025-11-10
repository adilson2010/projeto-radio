
import { useState } from 'react';
import Button from '../base/Button';

export default function AppDownload() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [platform, setPlatform] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !platform) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('platform', platform);

    try {
      const response = await fetch('https://readdy.ai/api/form/d47n1ivjsic9gsa4ulrg', {
        method: 'POST',
        body: new URLSearchParams(formData as any)
      });

      if (response.ok) {
        alert('Solicitação enviada! Você receberá o link de download em breve.');
        setEmail('');
        setPhone('');
        setPlatform('');
      } else {
        alert('Erro ao enviar solicitação. Tente novamente.');
      }
    } catch (error) {
      alert('Erro ao enviar solicitação. Tente novamente.');
    }
  };

  const handleStoreDownload = (store: string) => {
    // Simula redirecionamento para as lojas
    if (store === 'google') {
      window.open('https://play.google.com/store/apps', '_blank');
    } else if (store === 'apple') {
      window.open('https://apps.apple.com/', '_blank');
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-800 to-yellow-600 rounded-2xl p-8 text-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Baixe Nosso App</h2>
        <p className="text-lg opacity-90">
          Leve a melhor música reggae para onde você for no seu smartphone!
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Recursos do App */}
        <div>
          <h3 className="text-xl font-bold mb-4">Recursos do App:</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <i className="ri-smartphone-line text-yellow-300 text-xl w-6 h-6 flex items-center justify-center"></i>
              <span>Disponível para iOS e Android</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="ri-radio-line text-yellow-300 text-xl w-6 h-6 flex items-center justify-center"></i>
              <span>Streaming de alta qualidade</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="ri-download-cloud-line text-yellow-300 text-xl w-6 h-6 flex items-center justify-center"></i>
              <span>Funciona offline com favoritos</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="ri-notification-line text-yellow-300 text-xl w-6 h-6 flex items-center justify-center"></i>
              <span>Notificações de programas</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="ri-chat-3-line text-yellow-300 text-xl w-6 h-6 flex items-center justify-center"></i>
              <span>Chat integrado</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="ri-headphone-line text-yellow-300 text-xl w-6 h-6 flex items-center justify-center"></i>
              <span>Controles de áudio avançados</span>
            </div>
          </div>
        </div>

        {/* Download Direto das Lojas */}
        <div className="text-center">
          <h3 className="text-xl font-bold mb-6">Download Direto</h3>
          <div className="space-y-4">
            {/* Google Play Store */}
            <button
              onClick={() => handleStoreDownload('google')}
              className="w-full bg-black hover:bg-gray-800 transition-colors rounded-lg p-4 flex items-center space-x-4 cursor-pointer group"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <i className="ri-google-play-fill text-2xl text-green-400"></i>
              </div>
              <div className="text-left flex-1">
                <div className="text-xs text-gray-300">Disponível no</div>
                <div className="text-lg font-semibold">Google Play</div>
              </div>
              <i className="ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform"></i>
            </button>

            {/* Apple App Store */}
            <button
              onClick={() => handleStoreDownload('apple')}
              className="w-full bg-black hover:bg-gray-800 transition-colors rounded-lg p-4 flex items-center space-x-4 cursor-pointer group"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <i className="ri-apple-fill text-2xl text-white"></i>
              </div>
              <div className="text-left flex-1">
                <div className="text-xs text-gray-300">Baixar na</div>
                <div className="text-lg font-semibold">App Store</div>
              </div>
              <i className="ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>

          <div className="mt-6 p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-sm">
              <i className="ri-shield-check-line text-green-300"></i>
              <span>App oficial e seguro</span>
            </div>
          </div>
        </div>

        {/* Formulário de Solicitação */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4 text-center">Receber Link por Email</h3>
          <form onSubmit={handleSubmit} data-readdy-form id="download-app">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Telefone (opcional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Plataforma *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="platform"
                      value="iOS"
                      checked={platform === 'iOS'}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="text-yellow-300"
                    />
                    <span className="text-sm">iOS (iPhone/iPad)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="platform"
                      value="Android"
                      checked={platform === 'Android'}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="text-yellow-300"
                    />
                    <span className="text-sm">Android</span>
                  </label>
                </div>
              </div>

              <Button 
                type="submit"
                variant="secondary"
                className="w-full whitespace-nowrap"
              >
                <i className="ri-mail-send-line mr-2"></i>
                Enviar Link
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Estatísticas do App */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-300">4.8★</div>
          <div className="text-sm opacity-90">Avaliação</div>
        </div>
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-300">100K+</div>
          <div className="text-sm opacity-90">Downloads</div>
        </div>
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-300">24/7</div>
          <div className="text-sm opacity-90">Streaming</div>
        </div>
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-300">Grátis</div>
          <div className="text-sm opacity-90">Download</div>
        </div>
      </div>
    </div>
  );
}
