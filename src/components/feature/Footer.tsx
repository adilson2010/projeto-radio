
export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-900 via-green-800 to-yellow-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-1 shadow-lg">
                <img 
                  src="https://static.readdy.ai/image/2050551fbb19c229cf27f3c804633125/5a78a9c734517770b4257916fc0f77a3.jpeg" 
                  alt="Ras Reggae Radio Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ fontFamily: 'Pacifico, serif' }}>Ras Reggae Radio</h3>
                <p className="text-sm opacity-90">A Sua Rádio 24h</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              A melhor rádio reggae online do Brasil. Transmitindo 24 horas por dia 
              os melhores sons do reggae roots e cultura jamaicana.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/rasreggaeradio" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300 transition-colors w-8 h-8 flex items-center justify-center">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="https://instagram.com/rasreggaeradio" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300 transition-colors w-8 h-8 flex items-center justify-center">
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="https://youtube.com/radiorasreggae" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300 transition-colors w-8 h-8 flex items-center justify-center">
                <i className="ri-youtube-fill text-xl"></i>
              </a>
              <a href="https://twitter.com/rasreggaeradio" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300 transition-colors w-8 h-8 flex items-center justify-center">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-yellow-300 transition-colors cursor-pointer">Início</a></li>
              <li><a href="#programacao" className="text-gray-300 hover:text-yellow-300 transition-colors cursor-pointer">Programação</a></li>
              <li><a href="#player" className="text-gray-300 hover:text-yellow-300 transition-colors cursor-pointer">Player</a></li>
              <li><a href="#app" className="text-gray-300 hover:text-yellow-300 transition-colors cursor-pointer">Baixar App</a></li>
              <li><a href="#contato" className="text-gray-300 hover:text-yellow-300 transition-colors cursor-pointer">Contato</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contato</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <i className="ri-mail-line w-4 h-4 flex items-center justify-center"></i>
                <span>norespo@radiorasreggae.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-whatsapp-line w-4 h-4 flex items-center justify-center"></i>
                <span>(00) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-radio-line w-4 h-4 flex items-center justify-center"></i>
                <span>24h no ar</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2010 - 2025 Ras Reggae Radio. Todos os direitos reservados.
          </p>
          <a 
            href="#" 
            className="text-gray-400 hover:text-yellow-300 transition-colors text-sm mt-2 md:mt-0"
          >
            Powered by Roots Reggae
          </a>
        </div>
      </div>
    </footer>
  );
}
