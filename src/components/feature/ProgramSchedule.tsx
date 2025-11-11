
import { useState } from 'react';

interface Program {
  id: number;
  time: string;
  title: string;
  dj: string;
  description: string;
  isLive?: boolean;
}

export default function ProgramSchedule() {
  const [selectedDay, setSelectedDay] = useState('hoje');

  const programs: Program[] = [
    {
      id: 1,
      time: '06:00',
      title: 'Roots Morning',
      dj: 'DJ Auto',
      description: 'Comece o dia com reggae clássico',
      isLive: false
    },
    {
      id: 2,
      time: '09:00',
      title: 'Reggae Vibes',
      dj: 'DJ Auto',
      description: 'Os melhores hits reggae',
      isLive: false
    },
    {
      id: 3,
      time: '14:00',
      title: 'Live Session',
      dj: 'DJ Auto',
      description: 'Transmissão ao vivo com interação',
      isLive: true
    },
    {
      id: 4,
      time: '18:00',
      title: 'Sunset Reggae',
      dj: 'DJ Auto',
      description: 'Reggae para o fim de tarde',
      isLive: false
    },
    {
      id: 5,
      time: '21:00',
      title: 'Reggae Night',
      dj: 'DJ Auto',
      description: 'Reggae roots',
      isLive: false
    }
  ];

  const days = [
    { key: 'hoje', label: 'Hoje' },
    { key: 'amanha', label: 'Amanhã' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-96 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-green-800">Programação</h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600">Ao Vivo</span>
        </div>
      </div>

      {/* Seletor de Dia */}
      <div className="flex space-x-1 mb-4">
        {days.map((day) => (
          <button
            key={day.key}
            onClick={() => setSelectedDay(day.key)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              selectedDay === day.key
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-green-100'
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>

      {/* Lista de Programas */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {programs.map((program) => (
          <div
            key={program.id}
            className={`p-3 rounded-lg border transition-all ${
              program.isLive
                ? 'bg-green-50 border-green-200 shadow-sm'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-bold text-green-700">{program.time}</span>
                  {program.isLive && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                      AO VIVO
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">{program.title}</h4>
                <p className="text-xs text-gray-600 mb-1">{program.dj}</p>
                <p className="text-xs text-gray-500">{program.description}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center ml-2">
                <i className={`ri-${program.isLive ? 'live' : 'music-2'}-line text-green-600 text-sm`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rodapé */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Programação sujeita a alterações
        </p>
      </div>
    </div>
  );
}
