import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, Star, Sparkles, Calendar, Camera } from 'lucide-react';

const BirthdayWebsite = () => {
  const [showSurprise, setShowSurprise] = useState(false);

  // Beautiful memories with cool text instead of photos
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

  // Floating animation variants
  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Letter animation for the surprise reveal
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
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={floatingVariants}
            animate="animate"
          >
            {i % 3 === 0 ? (
              <div className="w-6 h-8 bg-gradient-to-b from-red-400 to-red-600 rounded-full opacity-70" />
            ) : i % 3 === 1 ? (
              <Star className="w-6 h-6 text-yellow-400 opacity-60" fill="currentColor" />
            ) : (
              <Sparkles className="w-5 h-5 text-purple-400 opacity-50" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring",
                damping: 10,
                stiffness: 100,
                delay: 0.2 
              }}
            >
              🎂 Happy Birthday, Sister! 🎉
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Wishing you love, happiness, and joy today & always ❤️
            </motion.p>

            <motion.div
              className="flex justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                className="text-6xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                🎈
              </motion.div>
              <motion.div
                className="text-6xl"
                animate={{ 
                  y: [-5, 5, -5] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🎊
              </motion.div>
              <motion.div
                className="text-6xl"
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              >
                🎈
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Birthday Status */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Calendar className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">It's Today! 🎊</h2>
              <p className="text-xl text-gray-600">Let the celebration begin!</p>
            </motion.div>
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
                    {/* Background Pattern */}
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

                    {/* Hover Glow Effect */}
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

            {/* Animated Quote */}
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
                  className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-3xl p-12 shadow-2xl"
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