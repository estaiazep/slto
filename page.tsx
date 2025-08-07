'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Wifi } from 'lucide-react'

interface Slot {
  id: string
  name: string
  rtp: string
  image: string
}

const slots: Slot[] = [
  { id: '1', name: 'Luck of Tiger', rtp: '98.41%', image: '/placeholder.svg?height=60&width=60' },
  { id: '2', name: 'Coin Up', rtp: '96.75%', image: '/placeholder.svg?height=60&width=60' },
  { id: '3', name: 'Santa Mummy', rtp: '96.94%', image: '/placeholder.svg?height=60&width=60' },
  { id: '4', name: 'Sun of Egypt 3', rtp: '98.34%', image: '/placeholder.svg?height=60&width=60' },
  { id: '5', name: 'Bonanza Billion', rtp: '98.18%', image: '/placeholder.svg?height=60&width=60' },
  { id: '6', name: 'Sweet Bonanza 1000', rtp: '97.23%', image: '/placeholder.svg?height=60&width=60' }
]

export default function GamblingBot() {
  const [currentPage, setCurrentPage] = useState<'main' | 'slots' | 'signals'>('main')
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [signalData, setSignalData] = useState({
    winChance: '73%',
    spinsCount: 52,
    lastUpdate: '24:56:16'
  })

  const MainPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            MaxWIN <span className="text-green-400">Radar</span>
          </h1>
          <Badge variant="secondary" className="bg-gray-700">BETA</Badge>
        </div>

        <div className="flex items-center justify-between mb-6 bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm">Online 201</span>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400">До обновления</div>
            <div className="text-green-400 font-mono">{signalData.lastUpdate}</div>
          </div>
          <div className="flex items-center gap-1 text-green-400">
            <Wifi className="w-4 h-4" />
            <span className="text-sm">Connected</span>
          </div>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 p-6 mb-6">
          <div className="text-center">
            <img 
              src="/placeholder.svg?height=200&width=300" 
              alt="Win Signals" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">WIN SIGNALS</h2>
            <div className="bg-gradient-to-r from-green-600 to-green-400 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2">RTP PREDICTION</h3>
              <div className="text-3xl font-bold">⚡</div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Button 
            onClick={() => setCurrentPage('slots')}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
          >
            BONUS PREDICTOR
          </Button>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-3">Последние выигрыши</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">1530****</span>
                <span className="text-green-400 font-bold">+119980₽</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Fruit Party</span>
                <span className="text-gray-500">23:23</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const SlotsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setCurrentPage('main')}
            className="text-white hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Bonus <span className="text-green-400">Predictor</span>
          </h1>
          <p className="text-gray-400">ТОП 5 слотов с высоким RTP</p>
        </div>

        <div className="space-y-3">
          {slots.map((slot) => (
            <Card 
              key={slot.id}
              className="bg-gray-800/50 border-gray-700 p-4 cursor-pointer hover:bg-gray-700/50 transition-colors"
              onClick={() => {
                setSelectedSlot(slot)
                setCurrentPage('signals')
              }}
            >
              <div className="flex items-center gap-4">
                <img 
                  src={slot.image || "/placeholder.svg"} 
                  alt={slot.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-white">{slot.name}</h3>
                  <p className="text-green-400 font-semibold">RTP: {slot.rtp}</p>
                </div>
                <div className="text-gray-400">→</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const SignalsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setCurrentPage('slots')}
            className="text-white hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
        </div>

        {selectedSlot && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">
                MaxWIN <span className="text-green-400">Radar</span>
              </h1>
              <Badge variant="secondary" className="bg-gray-700">BETA</Badge>
            </div>

            <Card className="bg-gray-800/50 border-gray-700 p-4 mb-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold">{selectedSlot.name}</h2>
              </div>
              
              <div className="relative">
                <img 
                  src="/placeholder.svg?height=200&width=300" 
                  alt="Slot Machine"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-yellow-400 text-2xl font-bold mb-2">ШАНС {signalData.winChance}</div>
                    <div className="text-white text-lg">ЧЕРЕЗ {signalData.spinsCount}</div>
                    <div className="text-yellow-400 text-lg font-bold">СПИНОВ</div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <Button 
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3"
                onClick={() => {
                  // Simulate signal analysis
                  setSignalData({
                    winChance: `${Math.floor(Math.random() * 30 + 60)}%`,
                    spinsCount: Math.floor(Math.random() * 50 + 20),
                    lastUpdate: new Date().toLocaleTimeString('ru-RU', { hour12: false })
                  })
                }}
              >
                Анализ
              </Button>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center gap-2"
                onClick={() => {
                  // Simulate getting new signal
                  setSignalData({
                    winChance: `${Math.floor(Math.random() * 30 + 60)}%`,
                    spinsCount: Math.floor(Math.random() * 50 + 20),
                    lastUpdate: new Date().toLocaleTimeString('ru-RU', { hour12: false })
                  })
                }}
              >
                <Users className="w-4 h-4" />
                Получить сигнал
              </Button>
            </div>

            <Card className="bg-gray-800/50 border-gray-700 p-4 mt-6">
              <h3 className="text-lg font-bold mb-3">Статистика</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">RTP:</span>
                  <span className="text-green-400 font-bold">{selectedSlot.rtp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Последнее обновление:</span>
                  <span className="text-white">{signalData.lastUpdate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Активных игроков:</span>
                  <span className="text-green-400">201</span>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  )

  return (
    <>
      {currentPage === 'main' && <MainPage />}
      {currentPage === 'slots' && <SlotsPage />}
      {currentPage === 'signals' && <SignalsPage />}
    </>
  )
}
