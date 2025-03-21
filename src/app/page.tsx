"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// Define the quiz question type
interface QuizQuestion {
  question: string;
  answers: string[];
  correctAnswer: number;
}

// Sample quiz questions
const quizQuestions: QuizQuestion[] = [
  {
    question: "Quando te pedi em namoro?",
    answers: ["14/02/2019", "29/04/2019", "15/05/2019", "01/06/2019"],
    correctAnswer: 1
  },
  {
    question: "Qual foi o primeiro presente que eu te dei?",
    answers: [
      "Um buquê de flores",
      "Um gift card da Steam",
      "Um livro",
      "Um perfume"
    ],
    correctAnswer: 1
  },
  {
    question:
      "Quando eu fiz uma surpresa pra você de aparecer com flores a primeira vez?",
    answers: [
      "No seu aniversário",
      "No Dia dos Namorados",
      "No dia da mulher apareci do nada",
      "Na nossa primeira semana de namoro"
    ],
    correctAnswer: 2
  },
  {
    question:
      "Com qual carro deu problema no meio da BR com a gente diversas vezes?",
    answers: ["Fiat", "Renault", "Chevrolet", "Peugeot"],
    correctAnswer: 3
  },
  {
    question: "Quantos animais já tivemos juntos?",
    answers: ["4", "5", "6", "7"],
    correctAnswer: 2
  },
  {
    question: "Qual a comida favorita do seu marido?",
    answers: ["Pizza", "Lasanha", "Batata frita", "Churrasco"],
    correctAnswer: 2
  },
  {
    question: "Qual o lugar que eu desejo te levar?",
    answers: ["Paris", "Florianópolis", "Cancún", "Roma"],
    correctAnswer: 1
  },
  {
    question: "Qual meu maior sonho?",
    answers: [
      "Viajar pelo mundo",
      "Comprar uma casa na praia",
      "Te fazer mais feliz a cada dia",
      "Abrir meu próprio negócio"
    ],
    correctAnswer: 2
  },
  {
    question: "Quando nos mudamos para o primeiro apartamento?",
    answers: ["25/01/2022", "12/02/2022", "30/03/2022", "15/04/2022"],
    correctAnswer: 1
  },
  {
    question: "Qual foi a data de casamento?",
    answers: ["14/10/2023", "21/10/2023", "28/10/2023", "04/11/2023"],
    correctAnswer: 2
  }
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameState, setGameState] = useState<"start" | "playing" | "finished">(
    "start"
  );
  const [hearts, setHearts] = useState<number[]>([]);
  const [needConfirmation, setNeedConfirmation] = useState(false);

  useEffect(() => {
    if (gameState === "start") {
      const interval = setInterval(() => {
        setHearts((prev) => {
          if (prev.length >= 15) {
            return prev.slice(1).concat(Math.random() * 100);
          }
          return [...prev, Math.random() * 100];
        });
      }, 800);

      return () => clearInterval(interval);
    }
  }, [gameState]);

  const handleStartQuiz = () => {
    setGameState("playing");
  };

  const handleAnswerClick = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct =
      answerIndex === quizQuestions[currentQuestion].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
      // Trigger confetti
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
          spread: 60,
          startVelocity: 55,
          gravity: 1.5,
          scalar: 1.2
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55
      });

      fire(0.2, {
        spread: 60
      });

      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 45
      });
    }

    setNeedConfirmation(true);
  };

  const handleConfirmAnswer = () => {
    setNeedConfirmation(false);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setShowScore(true);
      setGameState("finished");
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setGameState("start");
    setNeedConfirmation(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const questionVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  const questionTransition = {
    duration: 0.4,
    ease: "easeInOut"
  };

  const getScoreMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;

    if (percentage === 100) {
      return {
        message:
          "Você me conhece melhor que eu mesmo! Nosso amor é perfeito! ❤️",
        emoji: "🥰",
        description: "Te amo mais que tudo nessa vida! Você é minha alma gêmea!"
      };
    } else if (percentage >= 80) {
      return {
        message: "Quase perfeito, igual nosso amor! 💑",
        emoji: "💖",
        description: "Tão pertinho da perfeição... igual você na minha vida!"
      };
    } else if (percentage >= 60) {
      return {
        message: "Tá mandando bem, amor! Continue assim! 💕",
        emoji: "😘",
        description: "Ainda tem muito pra gente descobrir juntos nessa jornada!"
      };
    } else if (percentage >= 40) {
      return {
        message: "Hmm... Precisamos renovar os votos de casamento! 😅",
        emoji: "💝",
        description: "Será que você esqueceu o que prometeu no altar?"
      };
    } else {
      return {
        message:
          "Eita! Parece que alguém dormiu durante a cerimônia de casamento! 😂",
        emoji: "😜",
        description:
          "Talvez precisemos de uma segunda lua de mel para relembrar quem sou! 💍"
      };
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#E0F7FA] to-[#B2EBF2]">
      {/* Background decorative elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#48CAE4] blur-2xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#48CAE4] blur-2xl"
      />

      {/* Floating background elements */}
      <div
        className="absolute top-[20%] left-[15%] w-4 h-4 rounded-full bg-white opacity-40 animate-float"
        style={{ animationDuration: "6s" }}
      />
      <div
        className="absolute top-[60%] right-[20%] w-3 h-3 rounded-full bg-white opacity-30 animate-float"
        style={{ animationDuration: "8s", animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-[15%] left-[30%] w-2 h-2 rounded-full bg-white opacity-20 animate-float"
        style={{ animationDuration: "7s", animationDelay: "2s" }}
      />

      {/* Main content container */}
      <div className="relative flex min-h-screen items-center justify-center p-8">
        {/* Floating hearts */}
        <AnimatePresence mode="popLayout">
          {gameState === "start" &&
            hearts.map((pos, i) => (
              <motion.div
                key={i}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: ["0%", "100%"], opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 4,
                  ease: "linear",
                  times: [0, 1],
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="absolute text-3xl"
                style={{
                  left: `${pos}%`,
                  top: "-10%"
                }}
              >
                ❤️
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Quiz content */}
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {gameState === "start" && (
              <motion.div
                key="start"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full rounded-xl bg-white/90 backdrop-blur-md p-8 shadow-[0_20px_60px_-10px_rgba(72,202,228,0.3)] border border-white/40"
              >
                <div className="flex flex-col items-center gap-6 text-center">
                  <motion.div
                    className="relative w-32 h-32 mb-2"
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-[#48CAE4] opacity-20 animate-pulse"></div>
                    <div
                      className="absolute inset-2 rounded-full bg-[#48CAE4] opacity-30 animate-pulse"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="absolute inset-4 rounded-full bg-[#48CAE4] opacity-40 animate-pulse"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl">💌</span>
                    </div>
                  </motion.div>

                  <motion.h1
                    variants={itemVariants}
                    className="text-4xl font-bold text-[#48CAE4] tracking-tight"
                  >
                    Quiz do Amor
                  </motion.h1>
                  <motion.p
                    variants={itemVariants}
                    className="text-lg text-gray-600 max-w-xs leading-relaxed"
                  >
                    Um quiz especial só para nós dois! Teste seus conhecimentos
                    e divirta-se juntos.
                  </motion.p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartQuiz}
                    className="mt-8 w-full rounded-full bg-gradient-to-r from-[#48CAE4] to-[#00B4D8] px-6 py-4 font-semibold text-white shadow-lg"
                  >
                    Iniciar Nosso Quiz ❤️
                  </motion.button>
                </div>
              </motion.div>
            )}
            {(gameState === "playing" || gameState === "finished") && (
              <motion.div
                key="quiz"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full self-center rounded-xl bg-white/90 flex items-center justify-center backdrop-blur-md p-8 shadow-[0_20px_60px_-10px_rgba(72,202,228,0.3)] border border-white/40"
              >
                {showScore ? (
                  <motion.div
                    variants={containerVariants}
                    className="flex flex-col w-full items-center gap-6 text-center"
                  >
                    <motion.div
                      className="relative w-24 h-24 mb-2"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="absolute inset-0 rounded-full bg-[#48CAE4] opacity-20 animate-pulse"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl">
                          {getScoreMessage(score, quizQuestions.length).emoji}
                        </span>
                      </div>
                    </motion.div>

                    <motion.h2
                      variants={itemVariants}
                      className="text-3xl font-bold text-[#48CAE4] tracking-tight"
                    >
                      {getScoreMessage(score, quizQuestions.length).message}
                    </motion.h2>

                    <motion.p
                      variants={itemVariants}
                      className="text-xl text-gray-700"
                    >
                      Você acertou{" "}
                      <span className="font-bold text-[#48CAE4]">{score}</span>{" "}
                      de{" "}
                      <span className="font-bold">{quizQuestions.length}</span>
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-lg text-gray-600 italic"
                    >
                      {getScoreMessage(score, quizQuestions.length).description}
                    </motion.p>

                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{
                        width: `${(score / quizQuestions.length) * 100}%`
                      }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="mt-4 h-4 rounded-full bg-gradient-to-r from-[#48CAE4] to-[#00B4D8]"
                      style={{
                        width: `${(score / quizQuestions.length) * 100}%`
                      }}
                    />

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={restartQuiz}
                      className="mt-6 w-full rounded-full bg-gradient-to-r from-[#48CAE4] to-[#00B4D8] px-6 py-3 font-semibold text-white shadow-lg"
                    >
                      Jogar Novamente
                    </motion.button>
                  </motion.div>
                ) : (
                  <>
                    <motion.div
                      variants={itemVariants}
                      className="mb-6 flex justify-between items-center"
                    >
                      <h2 className="text-xl font-semibold text-[#48CAE4]">
                        Quiz do Amor
                      </h2>
                      <motion.div
                        key={currentQuestion}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-2 bg-[#E1F5FE]/70 backdrop-blur-sm rounded-full px-4 py-1 shadow-inner"
                      >
                        <span className="text-sm font-medium text-[#48CAE4]">
                          {currentQuestion + 1}/{quizQuestions.length}
                        </span>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{
                        width: `${
                          ((currentQuestion + 1) / quizQuestions.length) * 100
                        }%`
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="mb-6 h-2 rounded-full bg-gradient-to-r from-[#48CAE4] to-[#00B4D8]"
                    />

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQuestion}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        variants={questionVariants}
                        transition={questionTransition}
                        className="mb-6 bg-[#E1F5FE]/70 backdrop-blur-sm rounded-lg p-5 shadow-sm border border-[#E1F5FE]/80"
                      >
                        <h3 className="text-xl font-medium text-[#0288D1]">
                          {quizQuestions[currentQuestion].question}
                        </h3>
                      </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQuestion}
                        variants={containerVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={questionTransition}
                        className="flex flex-col gap-3"
                      >
                        {quizQuestions[currentQuestion].answers.map(
                          (answer, index) => (
                            <motion.button
                              key={index}
                              variants={itemVariants}
                              whileHover={{
                                scale: selectedAnswer === null ? 1.02 : 1
                              }}
                              whileTap={{
                                scale: selectedAnswer === null ? 0.98 : 1
                              }}
                              onClick={() =>
                                selectedAnswer === null &&
                                handleAnswerClick(index)
                              }
                              disabled={selectedAnswer !== null}
                              className={`rounded-lg p-4 text-left font-medium transition-all duration-200 ${
                                selectedAnswer === null
                                  ? "border border-gray-200/80 hover:border-[#48CAE4] hover:bg-[#E1F5FE]/50 hover:shadow-md transform hover:-translate-y-1 active:translate-y-0"
                                  : selectedAnswer === index
                                  ? isCorrect
                                    ? "border border-green-500/20 bg-green-100/80 text-green-800 shadow-md"
                                    : "border border-red-500/20 bg-red-100/80 text-red-800 shadow-md"
                                  : quizQuestions[currentQuestion]
                                      .correctAnswer === index &&
                                    selectedAnswer !== null
                                  ? "border border-green-500/20 bg-green-100/80 text-green-800 shadow-md"
                                  : "border border-gray-200/50 opacity-50"
                              }`}
                            >
                              <div className="flex items-center">
                                <div
                                  className={`flex-shrink-0 w-7 h-7 rounded-full mr-3 flex items-center justify-center border transition-all duration-200 ${
                                    selectedAnswer === null
                                      ? "border-gray-300 text-gray-500 bg-white/90"
                                      : selectedAnswer === index
                                      ? isCorrect
                                        ? "border-green-500 bg-green-500 text-white shadow-sm"
                                        : "border-red-500 bg-red-500 text-white shadow-sm"
                                      : quizQuestions[currentQuestion]
                                          .correctAnswer === index &&
                                        selectedAnswer !== null
                                      ? "border-green-500 bg-green-500 text-white shadow-sm"
                                      : "border-gray-300 text-gray-500 bg-white/90"
                                  }`}
                                >
                                  {String.fromCharCode(65 + index)}
                                </div>
                                <span>{answer}</span>
                              </div>
                            </motion.button>
                          )
                        )}
                      </motion.div>
                    </AnimatePresence>

                    <AnimatePresence>
                      {selectedAnswer !== null && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`mt-6 p-4 rounded-lg text-center font-medium transition-all duration-300 animate-fadeIn ${
                            isCorrect
                              ? "bg-green-50/80 text-green-600 border border-green-100/80 shadow-sm"
                              : "bg-red-50/80 text-red-600 border border-red-100/80 shadow-sm"
                          }`}
                        >
                          {isCorrect
                            ? "Correto! 🎉"
                            : "Errado! Não se preocupe, continue! 💪"}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {needConfirmation && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="mt-6 flex justify-center"
                        >
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleConfirmAnswer}
                            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#48CAE4] to-[#00B4D8] text-white font-semibold shadow-md"
                          >
                            Próxima Questão →
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-6 flex justify-between items-center px-1">
                      <div className="flex items-center gap-1 bg-[#E1F5FE]/50 rounded-full px-3 py-1">
                        <span className="text-[#48CAE4] font-bold">
                          {score}
                        </span>
                        <span className="text-gray-500 text-xs">corretas</span>
                      </div>

                      {selectedAnswer === null && (
                        <div className="text-xs text-gray-400 animate-pulse">
                          Selecione uma resposta
                        </div>
                      )}

                      <div className="flex items-center gap-1 bg-[#E1F5FE]/50 rounded-full px-3 py-1">
                        <span className="text-gray-500 text-xs">questão</span>
                        <span className="text-[#48CAE4] font-bold">
                          {currentQuestion + 1}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
