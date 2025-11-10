import { useState, useRef, useEffect } from 'react';
import Button from '../base/Button';

interface StreamMetadata {
  title?: string;
  artist?: string;
  album?: string;
}

interface ZenoMetadata {
  streamTitle?: string;
  title?: string;
  artist?: string;
  song?: string;
  listeners?: number;
  status?: string;
}

export default function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentSong, setCurrentSong] = useState('Carregando...');
  const [listeners, setListeners] = useState(1247);
  const [isLive, setIsLive] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('Conectado');
  const [metadata, setMetadata] = useState<StreamMetadata>({});
  const audioRef = useRef<HTMLAudioElement>(null);

  // URL de streaming ao vivo da Ras Reggae Radio
  const streamingUrl = 'https://stream-175.zeno.fm/bbh6u7w8gwzuv';
  
  // API específica da Zeno.FM para metadados
  const zenoApiUrl = 'https://api.zeno.fm/mounts/metadata/?mount=/bbh6u7w8gwzuv';
  const zenoStationUrl = 'https://zeno.fm/api/stations/rasreggaeradio';

  // Função principal para buscar metadados da API Zeno.FM
  const fetchZenoMetadata = async (): Promise<boolean> => {
    try {
      // Tentar API oficial da Zeno.FM primeiro
      const response = await fetch(zenoApiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          'User-Agent': 'RasReggaeRadio/1.0'
        }
      });

      if (response.ok) {
        const data: ZenoMetadata = await response.json();
        console.log('Metadados Zeno.FM:', data);
        
        let title = '';
        let artist = '';
        
        // Processar diferentes formatos de resposta da Zeno.FM
        if (data.streamTitle) {
          const parts = data.streamTitle.split(' - ');
          if (parts.length >= 2) {
            artist = parts[0].trim();
            title = parts[1].trim();
          } else {
            title = data.streamTitle;
          }
        } else if (data.title && data.artist) {
          title = data.title;
          artist = data.artist;
        } else if (data.song) {
          const parts = data.song.split(' - ');
          if (parts.length >= 2) {
            artist = parts[0].trim();
            title = parts[1].trim();
          } else {
            title = data.song;
          }
        }

        if (title) {
          const fullSong = artist ? `${artist} - ${title}` : title;
          setCurrentSong(fullSong);
          setMetadata({ title, artist });
          
          // Atualizar número de ouvintes se disponível
          if (data.listeners) {
            setListeners(data.listeners);
          }
          
          return true;
        }
      }
    } catch (error) {
      console.log('Erro na API principal Zeno.FM:', error);
    }
    
    return false;
  };

  // Função alternativa para buscar da estação específica
  const fetchStationMetadata = async (): Promise<boolean> => {
    try {
      const response = await fetch(zenoStationUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Dados da estação:', data);
        
        if (data.current_song || data.nowplaying) {
          const songInfo = data.current_song || data.nowplaying;
          setCurrentSong(songInfo);
          
          const parts = songInfo.split(' - ');
          if (parts.length >= 2) {
            setMetadata({ artist: parts[0].trim(), title: parts[1].trim() });
          }
          
          if (data.listeners) {
            setListeners(data.listeners);
          }
          
          return true;
        }
      }
    } catch (error) {
      console.log('Erro na API da estação:', error);
    }
    
    return false;
  };

  // Função com proxy CORS como fallback
  const fetchMetadataWithProxy = async (): Promise<boolean> => {
    try {
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const targetUrl = encodeURIComponent('https://stream-175.zeno.fm/bbh6u7w8gwzuv/status-json.xsl');
      
      const response = await fetch(proxyUrl + targetUrl);
      const data = await response.json();
      
      if (data.contents) {
        const jsonData = JSON.parse(data.contents);
        if (jsonData.icestats && jsonData.icestats.source) {
          const source = jsonData.icestats.source;
          if (source.title) {
            setCurrentSong(source.title);
            const parts = source.title.split(' - ');
            if (parts.length >= 2) {
              setMetadata({ artist: parts[0].trim(), title: parts[1].trim() });
            }
            return true;
          }
        }
      }
    } catch (error) {
      console.log('Erro no proxy CORS:', error);
    }
    
    return false;
  };

  // Função principal para buscar metadados
  const fetchStreamMetadata = async () => {
    try {
      // Tentar métodos em ordem de prioridade
      const success = await fetchZenoMetadata() || 
                     await fetchStationMetadata() || 
                     await fetchMetadataWithProxy();
      
      if (!success) {
        console.log('Nenhum método de metadados funcionou');
        // Manter música atual se nenhum método funcionar
      }
    } catch (error) {
      console.error('Erro geral ao buscar metadados:', error);
    }
  };

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
          setConnectionStatus('Pausado');
        } else {
          // Recarregar o stream para garantir transmissão ao vivo
          audioRef.current.src = `${streamingUrl}?t=${Date.now()}`;
          audioRef.current.load();
          await audioRef.current.play();
          setIsPlaying(true);
          setConnectionStatus('Conectado');
          
          // Buscar metadados quando começar a tocar
          setTimeout(() => {
            fetchStreamMetadata();
          }, 2000);
        }
      } catch (error) {
        console.error('Erro ao reproduzir stream:', error);
        setConnectionStatus('Erro de conexão');
        setIsPlaying(false);
        
        // Tentar com URL alternativa
        try {
          audioRef.current.src = `${streamingUrl}?retry=${Date.now()}`;
          await audioRef.current.play();
          setIsPlaying(true);
          setConnectionStatus('Conectado');
        } catch (retryError) {
          console.error('Erro na segunda tentativa:', retryError);
          setConnectionStatus('Erro de conexão');
        }
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleAudioError = () => {
    setIsPlaying(false);
    setConnectionStatus('Erro de conexão');
    console.error('Erro no stream de áudio');
  };

  const handleAudioLoadStart = () => {
    setConnectionStatus('Conectando...');
  };

  const handleAudioCanPlay = () => {
    if (isPlaying) {
      setConnectionStatus('Conectado');
    }
  };

  const handleAudioWaiting = () => {
    setConnectionStatus('Carregando...');
  };

  const handleAudioPlaying = () => {
    setConnectionStatus('Tocando ao vivo');
    setIsLive(true);
    
    // Buscar metadados quando começar a tocar
    fetchStreamMetadata();
  };

  const refreshStream = () => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.pause();
      audioRef.current.src = `${streamingUrl}?refresh=${Date.now()}`;
      audioRef.current.load();
      
      if (wasPlaying) {
        audioRef.current.play().catch(handleAudioError);
      }
      
      // Buscar metadados após refresh
      setTimeout(() => {
        fetchStreamMetadata();
      }, 3000);
    }
  };

  useEffect(() => {
    // Buscar metadados periodicamente quando estiver tocando
    let metadataInterval: NodeJS.Timeout;
    
    if (isPlaying) {
      // Buscar metadados a cada 15 segundos (otimizado para Zeno.FM)
      metadataInterval = setInterval(() => {
        fetchStreamMetadata();
      }, 15000);
      
      // Buscar imediatamente
      fetchStreamMetadata();
    }

    return () => {
      if (metadataInterval) {
        clearInterval(metadataInterval);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    // Simular atualização de ouvintes
    const interval = setInterval(() => {
      setListeners(prev => Math.max(1000, prev + Math.floor(Math.random() * 20) - 10));
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Configurar volume inicial
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.preload = 'none';
      
      // Configurar MediaSession para capturar metadados
      if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', togglePlay);
        navigator.mediaSession.setActionHandler('pause', togglePlay);
      }
    }
  }, [volume]);

  return (
    <div className="bg-gradient-to-br from-green-900 via-green-800 to-yellow-700 rounded-2xl p-8 shadow-2xl">
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
        <source src={streamingUrl} type="audio/mpeg" />
        Seu navegador não suporta o elemento de áudio.
      </audio>

      {/* Status e Informações */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-white font-semibold">{isLive ? 'AO VIVO' : 'OFFLINE'}</span>
          </div>
          <div className="text-white text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
            {connectionStatus}
          </div>
        </div>
        <div className="flex items-center space-x-2 text-white">
          <i className="ri-user-line"></i>
          <span>{listeners.toLocaleString()} ouvintes</span>
        </div>
      </div>

      {/* Logo e Informações da Rádio */}
      <div className="text-center mb-6">
        <h3 className="text-white text-2xl font-bold mb-1" style={{ fontFamily: 'Pacifico, serif' }}>
          Ras Reggae Radio
        </h3>
        <p className="text-yellow-300 text-sm opacity-90">Qualidade HD • A Sua • Rádio Reggae</p>
      </div>

      {/* Logo Centralizada */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 via-yellow-400 to-red-400 p-1 shadow-2xl">
            <img
              src="https://static.readdy.ai/image/2050551fbb19c229cf27f3c804633125/5a78a9c734517770b4257916fc0f77a3.jpeg"
              alt="Ras Reggae Radio Logo"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
        </div>
      </div>

      {/* Música Atual */}
      <div className="text-center mb-8">
        <h4 className="text-white text-xl font-bold mb-2">Tocando Agora</h4>
        <div className="bg-black bg-opacity-30 rounded-lg p-4 mb-3">
          <p className="text-yellow-300 text-lg font-semibold">{currentSong}</p>
          {metadata.artist && metadata.title && (
            <div className="text-white text-sm opacity-75 mt-2">
              <p>Artista: {metadata.artist}</p>
              <p>Música: {metadata.title}</p>
            </div>
          )}
        </div>
        <div className="flex justify-center items-center space-x-2">
          <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
          <span className="text-white text-sm opacity-75">Stream ao vivo 24 horas por dia</span>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Controles Principais */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <button 
          onClick={refreshStream}
          className="text-white hover:text-yellow-300 transition-colors w-12 h-12 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10"
          title="Atualizar stream"
        >
          <i className="ri-refresh-line text-2xl"></i>
        </button>
        
        <button 
          onClick={togglePlay}
          className="bg-white text-green-800 rounded-full w-20 h-20 flex items-center justify-center hover:bg-yellow-300 hover:scale-105 transition-all duration-200 shadow-lg relative overflow-hidden"
        >
          <i className={`ri-${isPlaying ? 'pause' : 'play'}-fill text-4xl ${isPlaying ? 'ml-0' : 'ml-1'} z-10`}></i>
          {isPlaying && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400 opacity-20 animate-pulse"></div>
          )}
        </button>
        
        <button 
          className="text-white hover:text-yellow-300 transition-colors w-12 h-12 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10"
          title="Atualizar metadados da Zeno.FM"
          onClick={fetchStreamMetadata}
        >
          <i className="ri-music-2-line text-2xl"></i>
        </button>
      </div>

      {/* Controle de Volume */}
      <div className="flex items-center space-x-4 mb-6">
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

      {/* Informações do Stream */}
      <div className="flex justify-center items-center space-x-6 mb-6">
        <div className="flex items-center space-x-2 text-white text-sm">
          <i className="ri-hd-line text-lg"></i>
          <span>Qualidade HD</span>
        </div>
        <div className="flex items-center space-x-2 text-white text-sm">
          <i className="ri-signal-wifi-line text-lg"></i>
          <span>128 kbps</span>
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
          title="Compartilhar no Facebook"
        >
          <i className="ri-facebook-fill text-xl"></i>
        </button>
        <button 
          onClick={() => window.open('https://twitter.com/rasreggaeradio', '_blank')}
          className="text-white hover:text-yellow-300 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10"
          title="Compartilhar no Twitter"
        >
          <i className="ri-twitter-fill text-xl"></i>
        </button>
        <button 
          onClick={() => window.open(`https://wa.me/?text=Escute a Ras Reggae Radio ao vivo: ${window.location.href}`, '_blank')}
          className="text-white hover:text-yellow-300 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10"
          title="Compartilhar no WhatsApp"
        >
          <i className="ri-whatsapp-fill text-xl"></i>
        </button>
        <button 
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Ras Reggae Radio - Ao Vivo',
                text: `Escutando: ${currentSong} na melhor rádio reggae!`,
                url: window.location.href
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
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
}
