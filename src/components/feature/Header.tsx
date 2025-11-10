
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-green-800 via-yellow-600 to-red-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-1 shadow-lg">
              <img 
                src="https://static.readdy.ai/image/2050551fbb19c229cf27f3c804633125/5a78a9c734517770b4257916fc0f77a3.jpeg" 
                alt="Ras Reggae Radio Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold" style={{ fontFamily: 'Pacifico, serif' }}>Ras Reggae Radio</h1>
              <p className="text-sm opacity-90 font-medium">Compartilhe sua positividade com a gente!</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-yellow-300 transition-colors cursor-pointer font-medium">Início</a>
            <a href="#programacao" className="text-white hover:text-yellow-300 transition-colors cursor-pointer font-medium">Programação</a>
            <a href="#player" className="text-white hover:text-yellow-300 transition-colors cursor-pointer font-medium">Player</a>
            <a href="#app" className="text-white hover:text-yellow-300 transition-colors cursor-pointer font-medium">App</a>
            <a href="#contato" className="text-white hover:text-yellow-300 transition-colors cursor-pointer font-medium">Contato</a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white w-6 h-6 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/20 backdrop-blur-sm rounded-lg mt-2 mb-4">
            <nav className="flex flex-col space-y-2 p-4">
              <a href="#home" className="text-white hover:text-yellow-300 transition-colors py-2 cursor-pointer font-medium">Início</a>
              <a href="#programacao" className="text-white hover:text-yellow-300 transition-colors py-2 cursor-pointer font-medium">Programação</a>
              <a href="#player" className="text-white hover:text-yellow-300 transition-colors py-2 cursor-pointer font-medium">Player</a>
              <a href="#app" className="text-white hover:text-yellow-300 transition-colors py-2 cursor-pointer font-medium">App</a>
              <a href="#contato" className="text-white hover:text-yellow-300 transition-colors py-2 cursor-pointer font-medium">Contato</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
