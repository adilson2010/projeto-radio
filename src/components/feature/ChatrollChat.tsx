
import { useEffect } from 'react';

declare global {
  interface Window {
    Chatroll?: {
      init: (options: {
        id: string;
        width: string;
        height: string;
        theme: string;
      }) => void;
    };
  }
}

export default function ChatrollChat() {
  useEffect(() => {
    // Carregar script do Chatroll
    const script = document.createElement('script');
    script.src = 'https://chatroll.com/embed/chat/chatrasreggae?id=ukTmEbbUQET';
    script.async = true;
    script.id = 'chatroll-script';
    
    // Configurações do Chatroll
    script.onload = () => {
      // Configurar o chat após carregar
      if (window.Chatroll) {
        window.Chatroll.init({
          id: 'ras-reggae-radio',
          width: '100%',
          height: '350px',
          theme: 'green'
        });
      }
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Limpar script ao desmontar componente
      const existingScript = document.getElementById('chatroll-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 h-96 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-green-800">Chat Ao Vivo</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Online</span>
        </div>
      </div>

      {/* Container do Chatroll */}
      <div className="flex-1 overflow-hidden rounded-lg border border-gray-200">
        <iframe
          src="https://chatroll.com/embed/chat/chatrasreggae?id=ukTmEbbUQET&platform=html"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          allow="autoplay; encrypted-media"
          title="Chat Ao Vivo - Ras Reggae Radio"
          className="w-full h-full"
        />
      </div>

      {/* Informações do Chat */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Powered by Chatroll</span>
          <div className="flex items-center space-x-1">
            <i className="ri-shield-check-line text-green-600"></i>
            <span>Chat moderado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
