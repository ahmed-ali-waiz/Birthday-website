import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { Heart, Gift, Star, Sparkles, Calendar, Camera, RotateCcw, Trophy, Zap } from 'lucide-react';

const BirthdayWebsite = () => {
  const [showSurprise, setShowSurprise] = useState(false);
  const [particles, setParticles] = useState([]);
  const [gameScore, setGameScore] = useState(0);
  const [balloons, setBalloons] = useState([]);
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [shakeCount, setShakeCount] = useState(0);
  const [currentMorphText, setCurrentMorphText] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const morphingTexts = ["Happy", "Joyful", "Wonderful", "Amazing", "Spectacular", "Birthday"];
  
  // Initialize memory game
  const gameIcons = ['🎂', '🎁', '🎈', '🎊', '🌟', '💖'];
  const shuffledCards = [...gameIcons, ...gameIcons].sort(() => Math.random() - 0.5);

  useEffect(() => {
    const cards = shuffledCards.map((icon, index) => ({
      id: index,
      icon,
      flipped: false,
      matched: false
    }));
    setMemoryCards(cards);
  }, []);

  // Morphing text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMorphText(prev => (prev + 1) % morphingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for particle effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Create trailing particles
      if (Math.random() < 0.3) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 4,
          color: ['#ff6b9d', '#a855f7', '#3b82f6'][Math.floor(Math.random() * 3)],
          velocity: { x: (Math.random() - 0.5) * 4, y: Math.random() * -2 - 1 },
          life: 1
        };
        setParticles(prev => [...prev.slice(-50), newParticle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Particle animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.velocity.x,
          y: particle.y + particle.velocity.y,
          life: particle.life - 0.02
        }))
        .filter(particle => particle.life > 0)
      );
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Continuous confetti generation
  useEffect(() => {
    const generateConfetti = () => {
      const confettiPiece = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: -10,
        size: Math.random() * 6 + 3,
        color: ['#ff6b9d', '#a855f7', '#3b82f6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)],
        velocity: { x: (Math.random() - 0.5) * 2, y: Math.random() * 2 + 1 },
        rotation: Math.random() * 360,
        life: 1
      };
      setParticles(prev => [...prev, confettiPiece]);
    };

    const interval = setInterval(generateConfetti, 200);
    return () => clearInterval(interval);
  }, []);

  // Balloon generation for balloon pop game
  useEffect(() => {
    const generateBalloon = () => {
      if (balloons.length < 8) {
        const balloon = {
          id: Date.now() + Math.random(),
          x: Math.random() * (window.innerWidth - 60),
          y: window.innerHeight,
          color: ['bg-red-400', 'bg-blue-400', 'bg-yellow-400', 'bg-green-400', 'bg-purple-400'][Math.floor(Math.random() * 5)],
          points: Math.floor(Math.random() * 3) + 1
        };
        setBalloons(prev => [...prev, balloon]);
      }
    };

    const interval = setInterval(generateBalloon, 3000);
    return () => clearInterval(interval);
  }, [balloons.length]);

  // Move balloons up
  useEffect(() => {
    const moveBalloons = () => {
      setBalloons(prev => prev
        .map(balloon => ({ ...balloon, y: balloon.y - 2 }))
        .filter(balloon => balloon.y > -100)
      );
    };

    const interval = setInterval(moveBalloons, 50);
    return () => clearInterval(interval);
  }, []);

  // Shake detection for mobile
  useEffect(() => {
    const handleDeviceMotion = (event) => {
      const acceleration = event.accelerationIncludingGravity;
      const threshold = 15;
      
      if (acceleration && 
          (Math.abs(acceleration.x) > threshold || 
           Math.abs(acceleration.y) > threshold || 
           Math.abs(acceleration.z) > threshold)) {
        setShakeCount(prev => prev + 1);
        triggerShakeEffect();
      }
    };

    window.addEventListener('devicemotion', handleDeviceMotion);
    return () => window.removeEventListener('devicemotion', handleDeviceMotion);
  }, []);

  const triggerShakeEffect = () => {
    // Create explosion of confetti
    for (let i = 0; i < 20; i++) {
      const confetti = {
        id: Date.now() + Math.random() + i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        size: Math.random() * 8 + 4,
        color: ['#ff6b9d', '#a855f7', '#3b82f6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)],
        velocity: { 
          x: (Math.random() - 0.5) * 20, 
          y: (Math.random() - 0.5) * 20 
        },
        life: 1
      };
      setParticles(prev => [...prev, confetti]);
    }
  };

  const popBalloon = (balloonId, points) => {
    setBalloons(prev => prev.filter(b => b.id !== balloonId));
    setGameScore(prev => prev + points * 10);
    
    // Create pop effect
    for (let i = 0; i < 10; i++) {
      const popParticle = {
        id: Date.now() + Math.random() + i,
        x: mouseX.get(),
        y: mouseY.get(),
        size: Math.random() * 4 + 2,
        color: '#fbbf24',
        velocity: { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 },
        life: 1
      };
      setParticles(prev => [...prev, popParticle]);
    }
  };

  const flipCard = (cardId) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardId) || matchedCards.includes(cardId)) return;
    
    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const firstCard = memoryCards.find(c => c.id === first);
      const secondCard = memoryCards.find(c => c.id === second);

      if (firstCard && secondCard && firstCard.icon === secondCard.icon) {
        setMatchedCards(prev => [...prev, first, second]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const resetGame = () => {
    const newCards = shuffledCards.map((icon, index) => ({
      id: index,
      icon,
      flipped: false,
      matched: false
    }));
    setMemoryCards(newCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setGameScore(0);
  };

  const blowCandle = (index) => {
    setCandlesLit(prev => prev.map((lit, i) => i === index ? false : lit));
    // Smoke effect
    for (let i = 0; i < 5; i++) {
      const smoke = {
        id: Date.now() + Math.random() + i,
        x: window.innerWidth / 2 + (index - 1) * 50,
        y: window.innerHeight / 2,
        size: Math.random() * 6 + 3,
        color: '#94a3b8',
        velocity: { x: (Math.random() - 0.5) * 2, y: -Math.random() * 3 - 1 },
        life: 1
      };
      setParticles(prev => [...prev, smoke]);
    }
  };

  // Data
 const memoryPhotos = [
    {
      caption: "Sister from another mother ❤️"
    },
    {
      caption: "Unmatchable Vibe 🏡"
    },
    {
      caption: "Unforgotable Moments! 🌟"
    },
    {
      caption: "Making Memories 📚"
    }
  ];
 const wishesCards = [
    { name: "Me", message: "From silly fights to long-talks, every moment with you has been magical. I wouldn’t trade my uni experience for anything! 🌟" },
    { name: "Best Friend", message: "Hope your special day is filled with happiness and cake! Love you girl! 🎂" },
    { name: "Family", message: "Wishing you all the love and happiness on your birthday! You deserve the world! 🌟" },
    { name: "My Heart", message: "Happy Birthday, sis! I know I can be a little rude sometimes, and I’m truly sorry for that. But deep down, you really mean to me. You’re my sister, my best friend🌟" },
    { name: "Friends", message: "Another year of being absolutely wonderful! Happy Birthday beautiful! 💖" },
    { name: "Everyone", message: "Sending you birthday hugs and lots of love on your special day! 🤗" }
  ];
  const letterVariants = {
    hidden: { opacity: 0, y: 50, scale: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  const surpriseText = "Happy Birthday Sis";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 relative overflow-hidden">
      {/* Particle System Canvas */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.life,
              transform: `rotate(${particle.rotation || 0}deg)`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
          />
        ))}
      </div>

      {/* Floating Game Balloons */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {balloons.map(balloon => (
          <motion.div
            key={balloon.id}
            className={`absolute w-12 h-16 ${balloon.color} rounded-full cursor-pointer pointer-events-auto`}
            style={{ left: balloon.x, top: balloon.y }}
            onClick={() => popBalloon(balloon.id, balloon.points)}
            whileHover={{ scale: 1.2 }}
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-full h-full rounded-full shadow-lg relative overflow-hidden">
              <div className="absolute top-1 left-2 w-3 h-3 bg-white/30 rounded-full"></div>
              <div className="absolute bottom-0 left-1/2 w-0.5 h-6 bg-gray-600 transform -translate-x-1/2"></div>
            </div>
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-black/50 px-1 rounded">
              +{balloon.points * 10}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Game Score Display */}
      <motion.div 
        className="fixed top-4 right-4 z-50 bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <span className="font-bold text-lg">Score: {gameScore}</span>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Shakes: {shakeCount} | Pop balloons!
        </div>
      </motion.div>

      <div className="relative z-10">
        {/* Hero Section with Morphing Text */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <motion.div className="mb-6">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentMorphText}
                  className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, rotateX: -90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0, rotateX: 90 }}
                  transition={{ duration: 0.8 }}
                >
                  🎂 {morphingTexts[currentMorphText]} Birthday, Sis! 🎉
                </motion.h1>
              </AnimatePresence>
            </motion.div>
            
            <motion.p
              className="text-lg md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Wishing you love, happiness, and joy today & always ❤️
            </motion.p>

            <motion.div
              className="flex justify-center space-x-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                className="text-6xl cursor-pointer"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                whileHover={{ scale: 1.3 }}
                onClick={() => triggerShakeEffect()}
              >
                🎈
              </motion.div>
              <motion.div
                className="text-6xl cursor-pointer"
                animate={{ 
                  y: [-5, 5, -5] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.3 }}
                onClick={() => triggerShakeEffect()}
              >
                🎊
              </motion.div>
              <motion.div
                className="text-6xl cursor-pointer"
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
                whileHover={{ scale: 1.3 }}
                onClick={() => triggerShakeEffect()}
              >
                🎈
              </motion.div>
            </motion.div>

            {/* Phone Shake Instructions */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <p className="text-sm text-gray-600 mb-2">📱 Shake your phone or click balloons for surprises!</p>
              <motion.button
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerShakeEffect}
              >
                <Zap className="inline w-4 h-4 mr-2" />
                Manual Shake Effect
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Interactive 3D Birthday Cake */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-4xl font-bold text-gray-800 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              🎂 Birthday Cake
            </motion.h2>
            
            <div className="relative">
              <motion.div
                className="bg-gradient-to-t from-yellow-600 via-yellow-400 to-yellow-200 w-80 h-60 mx-auto rounded-2xl shadow-2xl relative overflow-hidden"
                animate={{ rotateY: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {/* Cake Layers */}
                <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-pink-400 to-pink-300 rounded-b-2xl"></div>
                <div className="absolute bottom-16 w-4/5 left-1/2 transform -translate-x-1/2 h-16 bg-gradient-to-t from-purple-400 to-purple-300 rounded-lg"></div>
                <div className="absolute bottom-28 w-3/5 left-1/2 transform -translate-x-1/2 h-12 bg-gradient-to-t from-blue-400 to-blue-300 rounded-lg"></div>
                
                {/* Candles */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-8">
                  {candlesLit.map((lit, index) => (
                    <motion.div
                      key={index}
                      className="relative cursor-pointer"
                      onClick={() => blowCandle(index)}
                      whileHover={{ scale: 1.2 }}
                    >
                      <div className="w-2 h-12 bg-red-400 rounded-full"></div>
                      {lit && (
                        <motion.div
                          className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-400 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          <div className="absolute inset-0 bg-yellow-300 rounded-full animate-ping"></div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
                
                {/* Decorations */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    className="text-4xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    ✨
                  </motion.div>
                </div>
              </motion.div>
              
              <p className="mt-6 text-lg text-gray-600">Click the candles to blow them out! 🕯️</p>
            </div>
          </div>
        </section>

        {/* Memory Matching Game */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl font-bold text-center text-gray-800 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              🧠 Birthday Memory Game
            </motion.h2>
            
            <div className="flex justify-center mb-8">
              <motion.button
                onClick={resetGame}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset Game</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {memoryCards.map(card => (
                <motion.div
                  key={card.id}
                  className="relative h-20 cursor-pointer"
                  onClick={() => flipCard(card.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl shadow-lg flex items-center justify-center text-3xl"
                    animate={{
                      rotateY: flippedCards.includes(card.id) || matchedCards.includes(card.id) ? 180 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                      {flippedCards.includes(card.id) || matchedCards.includes(card.id) ? card.icon : '?'}
                    </div>
                  </motion.div>
                  {matchedCards.includes(card.id) && (
                    <motion.div
                      className="absolute inset-0 bg-green-400/50 rounded-xl flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      ✅
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Beautiful Memories Text Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl font-bold text-center text-gray-800 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Sparkles className="inline-block w-10 h-10 mr-3 text-purple-600" />
              Beautiful Memories
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {memoryPhotos.map((memory, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                >
                  <div className="bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-blue-400/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30 h-64 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 text-4xl">✨</div>
                      <div className="absolute top-4 right-4 text-3xl">💖</div>
                      <div className="absolute bottom-4 left-4 text-3xl">🌟</div>
                      <div className="absolute bottom-4 right-4 text-4xl">💫</div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl opacity-5">🎊</div>
                    </div>

                    <motion.div 
                      className="text-center z-10 relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.p 
                        className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                      >
                        {memory.caption}
                      </motion.p>
                      
                      <motion.div
                        className="text-4xl"
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.5
                        }}
                      >
                        {index === 0 ? '👑' : index === 1 ? '🏠' : index === 2 ? '🌈' : '📚'}
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.3), rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.3))',
                        filter: 'blur(20px)',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30 max-w-2xl mx-auto">
                <motion.p 
                  className="text-xl md:text-2xl font-semibold text-gray-700 italic mb-4"
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(147, 51, 234, 0)",
                      "0 0 10px rgba(147, 51, 234, 0.3)",
                      "0 0 0px rgba(147, 51, 234, 0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  "Sisters are different flowers from the same garden"
                </motion.p>
                <div className="flex justify-center space-x-2">
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>🌸</motion.span>
                  <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💕</motion.span>
                  <motion.span animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Infinity }}>🌺</motion.span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Birthday Wishes Wall */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl font-bold text-center text-gray-800 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Heart className="inline-block w-10 h-10 mr-3 text-red-500" />
              Birthday Wishes
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishesCards.map((wish, index) => (
                <motion.div
                  key={index}
                  className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <h3 className="font-bold text-lg text-purple-700 mb-3">
                    From: {wish.name}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{wish.message}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Surprise Gift Reveal */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatePresence mode="wait">
              {!showSurprise ? (
                <motion.div
                  key="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.button
                    onClick={() => setShowSurprise(true)}
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-2xl md:text-4xl font-bold py-8 px-16 rounded-full shadow-2xl border-4 border-white/30"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 0 30px rgba(147, 51, 234, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Gift className="inline-block w-8 h-8 md:w-12 md:h-12 mr-4" />
                    🎁 Open Your Surprise
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="surprise"
                  className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-3xl p-12 shadow-2xl relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-8">
                    {surpriseText.split('').map((letter, index) => (
                      <motion.span
                        key={index}
                        variants={letterVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        className="inline-block"
                        style={{
                          textShadow: "0 0 20px rgba(255, 255, 255, 0.8)"
                        }}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </motion.span>
                    ))}
                  </div>

                  <motion.div
                    className="text-2xl text-white/90 font-semibold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: surpriseText.length * 0.1 + 0.5 }}
                  >
                    Hope your day is as special as you are! ✨
                  </motion.div>

                  {/* Sparkling effects */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>



        {/* Footer */}
        <footer className="py-12 px-4 text-center">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <p className="text-lg text-gray-700 mb-4">
                Made with ❤️ for my sister's special day
              </p>
              <div className="flex justify-center space-x-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  ❤️
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🎂
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  ❤️
                </motion.div>
              </div>
            </div>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default BirthdayWebsite;