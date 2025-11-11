
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

interface RadioPlayerRef {
  togglePlay: () => void;
}

const RadioPlayer = forwardRef<RadioPlayerRef>((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Pronto para ouvir');
  const [listeners] = useState(1247);
  const audioRef = useRef<HTMLAudioElement>(null);

  // URL principal do streaming
  const streamUrl = 'https://stream.zeno.fm/bbh6u7w8gwzuv';

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setConnectionStatus('Pausado');
      } else {
        setIsLoading(true);
        setConnectionStatus('Conectando...');
        
        // Configurar stream com timestamp para evitar cache
        audioRef.current.src = `${streamUrl}?t=${Date.now()}`;
        audioRef.current.load();
        
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
        setConnectionStatus('Tocando ao vivo');
      }
    } catch (error) {
      console.error('Erro no player:', error);
      setIsLoading(false);
      setIsPlaying(false);
      setConnectionStatus('Erro de conexão');
      
      // Tentar reconectar automaticamente
      setTimeout(() => {
        setConnectionStatus('Pronto para tentar novamente');
      }, 3000);
    }
  };

  // Expor a função togglePlay através do ref
  useImperativeHandle(ref, () => ({
    togglePlay
  }));

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleAudioError = () => {
    setIsPlaying(false);
    setIsLoading(false);
    setConnectionStatus('Erro de conexão');
  };

  const handleAudioLoadStart = () => {
    setIsLoading(true);
    setConnectionStatus('Conectando...');
  };

  const handleAudioCanPlay = () => {
    setIsLoading(false);
    if (isPlaying) {
      setConnectionStatus('Tocando ao vivo');
    }
  };

  const handleAudioWaiting = () => {
    setConnectionStatus('Carregando...');
  };

  const handleAudioPlaying = () => {
    setConnectionStatus('Tocando ao vivo');
    setIsLoading(false);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.preload = 'none';
    }
  }, [volume]);

  return (
    <div className="bg-gradient-to-br from-green-900 via-green-800 to-yellow-700 rounded-3xl p-8 shadow-2xl max-w-md mx-auto">
      <audio 
        ref={audioRef} 
        preload="none"
        onError={handleAudioError}
        onLoadStart={handleAudioLoadStart}
        onCanPlay={handleAudioCanPlay}
        onWaiting={handleAudioWaiting}
        onPlaying={handleAudioPlaying}
        crossOrigin="anonymous"
      >
        Seu navegador não suporta reprodução de áudio.
      </audio>

      {/* Logo e Nome da Rádio */}
      <div className="text-center mb-8">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 via-yellow-400 to-red-400 p-1 shadow-2xl mx-auto">
            <img
              src="https://static.readdy.ai/image/2050551fbb19c229cf27f3c804633125/5a78a9c734517770b4257916fc0f77a3.jpeg"
              alt="Ras Reggae Radio"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
        </div>
        
        <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: 'Pacifico, serif' }}>
          Ras Reggae Radio
        </h3>
        <p className="text-yellow-300 text-sm opacity-90">Reggae • 24/7 • Qualidade HD</p>
      </div>

      {/* Status */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-white font-semibold text-lg">
            {isPlaying ? 'AO VIVO' : 'OFFLINE'}
          </span>
        </div>
        
        <div className="bg-black bg-opacity-30 rounded-lg px-4 py-2 mb-4">
          <p className="text-white text-sm">{connectionStatus}</p>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-white text-sm opacity-75">
          <i className="ri-user-line"></i>
          <span>{listeners.toLocaleString()} ouvintes</span>
        </div>
      </div>

      {/* Controle Principal */}
      <div className="flex justify-center mb-8">
        <button 
          onClick={togglePlay}
          disabled={isLoading}
          className="bg-white text-green-800 rounded-full w-20 h-20 flex items-center justify-center hover:bg-yellow-300 hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <i className="ri-loader-4-line text-4xl animate-spin"></i>
          ) : (
            <i className={`ri-${isPlaying ? 'pause' : 'play'}-fill text-4xl ${isPlaying ? 'ml-0' : 'ml-1'}`}></i>
          )}
        </button>
      </div>

      {/* Controle de Volume */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <i className="ri-volume-down-line text-white text-xl"></i>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-2 bg-green-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${volume}%, #15803d ${volume}%, #15803d 100%)`
              }}
            />
          </div>
          <i className="ri-volume-up-line text-white text-xl"></i>
          <span className="text-white text-sm w-10 text-center font-semibold">{volume}%</span>
        </div>
      </div>

      {/* Informações Técnicas */}
      <div className="flex justify-center items-center space-x-6 mb-6">
        <div className="flex items-center space-x-2 text-white text-sm">
          <i className="ri-hd-line text-lg"></i>
          <span>HD</span>
        </div>
        <div className="flex items-center space-x-2 text-white text-sm">
          <i className="ri-signal-wifi-line text-lg"></i>
          <span>128k</span>
        </div>
        <div className="flex items-center space-x-2 text-white text-sm">
          <i className="ri-time-line text-lg"></i>
          <span>24/7</span>
        </div>
      </div>

      {/* Compartilhar */}
      <div className="flex justify-center space-x-4">
        <button 
          onClick={() => window.open('https://facebook.com/rasreggaeradio', '_blank')}
          className="text-white hover:text-yellow-300 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10"
          title="Facebook"
        >
          <i className="ri-facebook-fill text-xl"></i>
        </button>
        <button 
          onClick={() => window.open('https://twitter.com/rasreggaeradio', '_blank')}
          className="text-white hover:text-yellow-300 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10"
          title="Twitter"
        >
          <i className="ri-twitter-fill text-xl"></i>
        </button>
        <button 
          onClick={() => window.open(`https://wa.me/?text=Escutando a Ras Reggae Radio ao vivo: ${window.location.href}`, '_blank')}
          className="text-white hover:text-yellow-300 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10"
          title="WhatsApp"
        >
          <i className="ri-whatsapp-fill text-xl"></i>
        </button>
        <button 
          onClick={() => {
            const shareData = {
              title: 'Eu estou ouvindo Rádio Ras Reggae pelo site!',
              text: ' Conectando você em https://www.rasreggaeradio.com/ #OuvirReggae via @rasreggaeradio  !',
              url: window.location.href
            };
            
            if (navigator.share) {
              navigator.share(shareData);
            } else {
              navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
              alert('Link copiado para a área de transferência!');
            }
          }}
          className="text-white hover:text-yellow-300 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10"
          title="Compartilhar"
        >
          <i className="ri-share-line text-xl"></i>
        </button>
      </div>
    </div>
  );
});

RadioPlayer.displayName = 'RadioPlayer';

export default RadioPlayer;
