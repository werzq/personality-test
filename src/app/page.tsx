'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WelcomeScreen from '@/components/WelcomeScreen'
import NameForm from '@/components/NameForm'
import PersonalityTest from '@/components/PersonalityTest'
import Results from '@/components/Results'

export default function Home() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [answers, setAnswers] = useState<{ trait: string; score: number }[]>([])

  const nextStep = () => setStep(step + 1)

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 relative select-none">
      <div className="w-full max-w-md mx-auto sm:max-w-lg md:max-w-xl glassmorphism">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="welcome-screen"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <WelcomeScreen onStart={nextStep} />
            </motion.div>
          )}
          {step === 1 && (
            <motion.div
              key="name-form"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <NameForm name={name} setName={setName} onNext={nextStep} />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="personality-test"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <PersonalityTest onComplete={(answers) => { setAnswers(answers); nextStep(); }} />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key="results"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Results name={name} answers={answers} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="fixed bottom-2 right-2 text-xs text-gray-400 bg-white bg-opacity-50 p-1 rounded">
        © werzq.cc
      </div>
    </main>
  )
}

