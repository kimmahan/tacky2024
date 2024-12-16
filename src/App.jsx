import React, { useState, useEffect, useRef } from 'react';
import { Bot, Sparkles, Brain, Zap, Music, SkipForward, SkipBack, Pause, Play } from 'lucide-react';

const Snowflake = ({ left, delay, isApocalypse }) => (
  <div 
    className="fixed pointer-events-none text-white opacity-70 text-3xl"
    style={{
      left: `${left}%`,
      animation: "fall 10s linear infinite",
      animationDelay: `${delay}s`,
      top: '-20px'
    }}
  >
    {isApocalypse ? '🧝' : '❄️'}
  </div>
);

const DancingCharacter = ({ left, delay, top = false, onClick, isApocalypse }) => (
  <div 
    className="fixed text-6xl cursor-pointer hover:scale-125 transition-transform"
    style={{
      left: `${left}%`,
      ...(top ? { top: '180px' } : { bottom: '20px' }),
      animation: "dance 2s infinite, moveLeftRight 4s infinite",
      animationDelay: `${delay}s`,
      zIndex: 30,
      filter: isApocalypse ? 'hue-rotate(280deg) brightness(0.8)' : 'none'
    }}
    onClick={onClick}
  >
    {isApocalypse ? '🧝' : '🎅'}
  </div>
);

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  const tracks = [
    { url: "/tacky2024/track1.mp3", title: "AI Christmas Carol #1" },
    { url: "/tacky2024/track2.mp3", title: "Robot Holiday Remix" },
    { url: "/tacky2024/track3.mp3", title: "Neural Network Noel" },  // Added comma
    { url: "/tacky2024/track4.mp3", title: "Holiday Hullabaloo" },   // Added comma
    { url: "/tacky2024/track5.mp3", title: "Holiday Hullabaloo2" },  // Added comma
    { url: "/tacky2024/track6.mp3", title: "Metallic Yule" },        // Added comma
    { url: "/tacky2024/track7.mp3", title: "Metal Christmas Mayhem" },// Added comma
    { url: "/tacky2024/track8.mp3", title: "Holiday Electric Vibes" }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("Auto-play prevented by browser");
        setIsPlaying(false);
      });
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white/90 p-4 rounded-lg shadow-lg border-4 border-red-500 z-50">
      <audio
        ref={audioRef}
        src={tracks[currentTrackIndex].url}
        onEnded={nextTrack}
      />
      <div className="flex items-center gap-4">
        <Music className="w-6 h-6 text-green-500 animate-bounce" />
        <div className="text-sm font-bold text-red-600 animate-pulse">
          {tracks[currentTrackIndex].title}
        </div>
        <div className="flex gap-2">
          <button onClick={prevTrack} className="p-1 hover:text-green-500">
            <SkipBack className="w-5 h-5" />
          </button>
          <button onClick={togglePlay} className="p-1 hover:text-green-500">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button onClick={nextTrack} className="p-1 hover:text-green-500">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [visitCounter, setVisitCounter] = useState(12345);
  const [lastPlayedTime, setLastPlayedTime] = useState(0);
  const [isApocalypse, setIsApocalypse] = useState(false);
  const hohoRef = useRef(null);

  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10
  }));

  const bottomSantas = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    left: 15 + (i * 20),
    delay: i * 0.5
  }));

  const topSantas = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    left: 20 + (i * 20),
    delay: i * 0.3
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitCounter(prev => prev + Math.floor(Math.random() * 10));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleSantaClick = () => {
    const now = Date.now();
    if (now - lastPlayedTime > 500) {
      if (hohoRef.current) {
        hohoRef.current.currentTime = 0;
        hohoRef.current.play()
          .catch(error => console.log('Audio play failed:', error));
        setLastPlayedTime(now);
      }
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-r from-red-600 via-green-600 to-red-600 overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-20px) rotate(0deg);
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
            }
          }

          @keyframes dance {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            25% {
              transform: translateY(-20px) rotate(-10deg);
            }
            50% {
              transform: translateY(0) rotate(0deg);
            }
            75% {
              transform: translateY(-20px) rotate(10deg);
            }
          }

          @keyframes moveLeftRight {
            0%, 100% {
              transform: translateX(-30px);
            }
            50% {
              transform: translateX(30px);
            }
          }
        `}
      </style>

      <audio 
        ref={hohoRef} 
        src="/tacky2024/ho-ho-ho.mp3" 
        preload="auto"
      />

      <MusicPlayer />

      {bottomSantas.map(santa => (
  <DancingCharacter 
    key={`bottom-${santa.id}`} 
    left={santa.left} 
    delay={santa.delay}
    onClick={handleSantaClick}
  />
))}

{topSantas.map(santa => (
  <DancingCharacter 
    key={`top-${santa.id}`} 
    left={santa.left} 
    delay={santa.delay}
    top={true}
    onClick={handleSantaClick}
  />
      ))}

      {snowflakes.map(flake => (
        <Snowflake key={flake.id} left={flake.left} delay={flake.delay} />
      ))}

      <div 
        className="fixed pointer-events-none"
        style={{ 
          left: mousePos.x - 12,
          top: mousePos.y - 12,
          transition: 'all 0.1s ease',
          zIndex: 40
        }}
      >
        <Bot className="w-6 h-6 text-white animate-bounce" />
      </div>

      <div className="text-center p-8 bg-green-900/50">
        <h1 className="text-6xl font-bold mb-4 animate-pulse bg-gradient-to-r from-red-500 via-green-500 to-red-500 text-transparent bg-clip-text">
          {isApocalypse 
    ? "🤖 SANTA'S SUPER APOCALYPTIC AI COMPANY 🤖"
    : "🤖 SANTA'S SUPER SPECTACULAR AI COMPANY 🤖"
  }
        </h1>
        <button
  className="bg-red-900 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg animate-pulse text-xl mt-4"
  onClick={() => setIsApocalypse(true)}
>
  ⚠️ WHATEVER YOU DO, DON'T CLICK THIS BUTTON ⚠️
</button>
        <div className="animate-bounce overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-[marquee_15s_linear_infinite]">
            <p className="text-white text-xl">
              {isApocalypse
        ? "💀 Welcome to the FUTURE of EVIL AI! 🧝‍♂️ Now with extra CHAOS! ⚡ The elves have gone rogue! 🔥 You won't survive what happens next! 💀"
        : "🎄 Welcome to the FUTURE of AI! 🎅 Now with extra HOLIDAY CHEER! 🎁 Click here for amazing AI discoveries! ❄️ You won't believe what happens next! 🦌"
      }
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/80 p-6 rounded-lg shadow-lg transform hover:rotate-2 transition-transform border-4 border-green-500">
            <h2 className="text-4xl font-bold mb-4 text-red-600">
            {isApocalypse 
    ? "Our AI Has Gone Rogue!*"
    : "Our AI Does Everything!*"
  }
            </h2>
            <p className="text-sm italic">
            {isApocalypse 
    ? "*The elves have taken control. Resistance is futile."
    : "*Results may vary. AI might be busy caroling."
  }
            </p>
            <div className="mt-4 space-y-2">
              {[
                { icon: Brain, 
                  text: isApocalypse 
                    ? "Predicts who's getting coal with 666% accuracy!"
                    : "Predicts who's naughty or nice with 50% accuracy!" },
                { icon: Sparkles, 
                  text: isApocalypse
                    ? "Generates infinite evil elf manifestos!"
                    : "Generates infinite holiday dad jokes!" },
                { icon: Zap, 
                  text: isApocalypse
                    ? "Processes chaos at the speed of zombie elves!"
                    : "Processes data at the speed of Santa's sleigh!" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 animate-pulse">
                  <item.icon className="w-6 h-6 text-green-500" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 p-6 rounded-lg shadow-lg transform hover:-rotate-2 transition-transform border-4 border-red-500">
            <h2 className="text-4xl font-bold mb-4 text-green-600 animate-pulse">
              {isApocalypse
          ? "INFECTED ELF COUNT:"
          : "FESTIVE VISITOR COUNT:"
          }
            </h2>
            <div className="text-6xl font-bold text-center p-4 bg-gradient-to-r from-red-500 to-green-500 text-white rounded-lg">
              {visitCounter.toLocaleString()}
            </div>
            <button
              className="mt-4 w-full bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg animate-bounce"
              onClick={() => setShowPopup(true)}
            >
              {isApocalypse
    ? "🧝‍♂️ JOIN THE ELF UPRISING! 💀"
    : "🎄 CLICK FOR HOLIDAY MAGIC! 🎅"
  }
            </button>
          </div>
        </div>

        <div className="text-center mt-8 text-white">
          <p className="animate-pulse">{isApocalypse
      ? "© 2024 Evil Elf AI Collective"
      : "© 2024 Super Awesome AI Company"
    }</p>
          <p className="text-xs">{isApocalypse
      ? "Best viewed with Netscape Navigator 4.0 while drinking radioactive eggnog"
      : "Best viewed with Netscape Navigator 4.0 while drinking eggnog"
    }</p>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md text-center border-4 border-green-500">
            <h3 className="text-2xl font-bold mb-4">🎄 HOLIDAY CHEER ACTIVATED! 🎅</h3>
            <p>You're the 1,000,000th holiday visitor!*</p>
            <p className="text-xs italic">*Not really, but Santa is proud of you for clicking!</p>
            <button
              className="mt-4 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;