"use client";
import { useState, useEffect } from "react";

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
  const [animation, setAnimation] = useState("");
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
    setAnimation("animate-fadeOut");
    setTimeout(() => {
      setGameState("playing");
      setAnimation("");
    }, 500);
  };

  const handleAnswerClick = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct =
      answerIndex === quizQuestions[currentQuestion].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
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
    setAnimation("animate-fadeOut");
    setTimeout(() => {
      setCurrentQuestion(0);
      setScore(0);
      setShowScore(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setGameState("start");
      setAnimation("");
      setNeedConfirmation(false);
    }, 500);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#E0F7FA] to-[#B2EBF2] p-8 overflow-hidden">
      {/* Floating hearts for start screen */}
      {gameState === "start" &&
        hearts.map((pos, i) => (
          <div
            key={i}
            className="absolute text-3xl animate-float"
            style={{
              left: `${pos}%`,
              top: "-10%",
              animationDelay: `${i * 0.2}s`,
              opacity: 0.7
            }}
          >
            ❤️
          </div>
        ))}

      {gameState === "start" ? (
        <div
          className={`w-full max-w-md rounded-xl bg-white/90 backdrop-blur-md p-8 shadow-[0_20px_60px_-10px_rgba(72,202,228,0.3)] border border-white/40 transform transition-all duration-500 ${animation}`}
        >
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative w-32 h-32 mb-2">
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
            </div>

            <h1 className="text-4xl font-bold text-[#48CAE4] tracking-tight">
              Quiz do Amor
            </h1>
            <p className="text-lg text-gray-600 max-w-xs leading-relaxed">
              Um quiz especial só para nós dois! Teste seus conhecimentos e
              divirta-se juntos.
            </p>

            <button
              onClick={handleStartQuiz}
              className="mt-8 w-full rounded-full bg-gradient-to-r from-[#48CAE4] to-[#00B4D8] px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-[0_10px_20px_-5px_rgba(72,202,228,0.5)] hover:-translate-y-1 active:translate-y-0 active:shadow-md"
            >
              Iniciar Nosso Quiz ❤️
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`w-full max-w-md rounded-xl bg-white/90 backdrop-blur-md p-8 shadow-[0_20px_60px_-10px_rgba(72,202,228,0.3)] border border-white/40 transform transition-all duration-500 ${animation}`}
        >
          {showScore ? (
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative w-24 h-24 mb-2">
                <div className="absolute inset-0 rounded-full bg-[#48CAE4] opacity-20 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {score > quizQuestions.length / 2 ? (
                    <span className="text-5xl animate-bounce">🎉</span>
                  ) : (
                    <span className="text-5xl">💪</span>
                  )}
                </div>
              </div>

              <h2 className="text-3xl font-bold text-[#48CAE4] tracking-tight">
                Quiz Concluído!
              </h2>

              <p className="text-xl text-gray-700">
                Você acertou{" "}
                <span className="font-bold text-[#48CAE4]">{score}</span> de{" "}
                <span className="font-bold">{quizQuestions.length}</span>
              </p>

              {score === quizQuestions.length && (
                <p className="text-lg text-gray-600 italic">
                  Pontuação perfeita! Você é incrível! ❤️
                </p>
              )}

              <div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-gray-200 shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#48CAE4] to-[#00B4D8] transition-all duration-1000 ease-out"
                  style={{ width: `${(score / quizQuestions.length) * 100}%` }}
                ></div>
              </div>

              <div className="flex w-full gap-4 mt-6">
                <button
                  onClick={restartQuiz}
                  className="flex-1 rounded-full bg-gradient-to-r from-[#48CAE4] to-[#00B4D8] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-[0_10px_20px_-5px_rgba(72,202,228,0.5)] hover:-translate-y-1 active:translate-y-0 active:shadow-md"
                >
                  Jogar Novamente
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-[#48CAE4]">
                  Quiz do Amor
                </h2>
                <div className="flex items-center gap-2 bg-[#E1F5FE]/70 backdrop-blur-sm rounded-full px-4 py-1 shadow-inner">
                  <span className="text-sm font-medium text-[#48CAE4]">
                    {currentQuestion + 1}/{quizQuestions.length}
                  </span>
                </div>
              </div>

              <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-gray-200 shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#48CAE4] to-[#00B4D8] transition-all duration-300 ease-out"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / quizQuestions.length) * 100
                    }%`
                  }}
                ></div>
              </div>

              <div className="mb-6 bg-[#E1F5FE]/70 backdrop-blur-sm rounded-lg p-5 shadow-sm border border-[#E1F5FE]/80">
                <h3 className="text-xl font-medium text-[#0288D1]">
                  {quizQuestions[currentQuestion].question}
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                {quizQuestions[currentQuestion].answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      selectedAnswer === null && handleAnswerClick(index)
                    }
                    disabled={selectedAnswer !== null}
                    className={`rounded-lg p-4 text-left font-medium transition-all duration-200 ${
                      selectedAnswer === null
                        ? "border border-gray-200/80 hover:border-[#48CAE4] hover:bg-[#E1F5FE]/50 hover:shadow-md transform hover:-translate-y-1 active:translate-y-0"
                        : selectedAnswer === index
                        ? isCorrect
                          ? "border border-green-500/20 bg-green-100/80 text-green-800 shadow-md"
                          : "border border-red-500/20 bg-red-100/80 text-red-800 shadow-md"
                        : quizQuestions[currentQuestion].correctAnswer ===
                            index && selectedAnswer !== null
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
                            : quizQuestions[currentQuestion].correctAnswer ===
                                index && selectedAnswer !== null
                            ? "border-green-500 bg-green-500 text-white shadow-sm"
                            : "border-gray-300 text-gray-500 bg-white/90"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{answer}</span>
                    </div>
                  </button>
                ))}
              </div>

              {selectedAnswer !== null && (
                <div
                  className={`mt-6 p-4 rounded-lg text-center font-medium transition-all duration-300 animate-fadeIn ${
                    isCorrect
                      ? "bg-green-50/80 text-green-600 border border-green-100/80 shadow-sm"
                      : "bg-red-50/80 text-red-600 border border-red-100/80 shadow-sm"
                  }`}
                >
                  {isCorrect
                    ? "Correto! 🎉"
                    : "Errado! Não se preocupe, continue! 💪"}
                </div>
              )}

              {needConfirmation && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleConfirmAnswer}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#48CAE4] to-[#00B4D8] text-white font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
                  >
                    Próxima Questão →
                  </button>
                </div>
              )}

              <div className="mt-6 flex justify-between items-center px-1">
                <div className="flex items-center gap-1 bg-[#E1F5FE]/50 rounded-full px-3 py-1">
                  <span className="text-[#48CAE4] font-bold">{score}</span>
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
        </div>
      )}

      {/* Add some decorative elements */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#48CAE4] opacity-10 blur-2xl"></div>
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#48CAE4] opacity-10 blur-2xl"></div>
      <div className="absolute bottom-32 right-10 w-20 h-20 rounded-full bg-[#00B4D8] opacity-20 blur-xl"></div>
      <div className="absolute top-32 left-10 w-20 h-20 rounded-full bg-[#00B4D8] opacity-20 blur-xl"></div>

      {/* Add some floating elements */}
      <div
        className="absolute top-[20%] left-[15%] w-4 h-4 rounded-full bg-white opacity-40 animate-float"
        style={{ animationDuration: "6s" }}
      ></div>
      <div
        className="absolute top-[60%] right-[20%] w-3 h-3 rounded-full bg-white opacity-30 animate-float"
        style={{ animationDuration: "8s", animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-[15%] left-[30%] w-2 h-2 rounded-full bg-white opacity-20 animate-float"
        style={{ animationDuration: "7s", animationDelay: "2s" }}
      ></div>
    </div>
  );
}
