import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface PersonalityTestProps {
  onComplete: (answers: { trait: string; score: number }[]) => void;
}

interface Question {
  text: string;
  isReversed: boolean;
  trait: 'Extraversion' | 'Agreeableness' | 'Conscientiousness' | 'Neuroticism' | 'Openness';
}

const allQuestions: Question[] = [
  { text: "I enjoy being the center of attention at social gatherings.", isReversed: false, trait: 'Extraversion' },
  { text: "I prefer to have a detailed plan before starting a project.", isReversed: false, trait: 'Conscientiousness' },
  { text: "I often find myself lost in thought about abstract concepts.", isReversed: false, trait: 'Openness' },
  { text: "I feel drained after spending time with a large group of people.", isReversed: true, trait: 'Extraversion' },
  { text: "I tend to be skeptical of others' intentions.", isReversed: true, trait: 'Agreeableness' },
  { text: "I keep my belongings organized and know where everything is.", isReversed: false, trait: 'Conscientiousness' },
  { text: "I rarely worry about future events or potential problems.", isReversed: true, trait: 'Neuroticism' },
  { text: "I enjoy exploring new art forms and creative expressions.", isReversed: false, trait: 'Openness' },
  { text: "I prefer working independently rather than in a team.", isReversed: true, trait: 'Extraversion' },
  { text: "I find it difficult to stick to a routine or schedule.", isReversed: true, trait: 'Conscientiousness' },
  { text: "I often feel overwhelmed by intense emotions.", isReversed: true, trait: 'Neuroticism' },
  { text: "I enjoy learning about different cultures and ways of life.", isReversed: false, trait: 'Openness' },
  { text: "I tend to let others take charge in group situations.", isReversed: true, trait: 'Extraversion' },
  { text: "I prefer theoretical ideas over practical solutions.", isReversed: false, trait: 'Openness' },
  { text: "I find it easy to make decisions without consulting others.", isReversed: false, trait: 'Conscientiousness' },
  { text: "I avoid engaging in debates and intellectual discussions.", isReversed: true, trait: 'Openness' },
  { text: "I often prioritize my own needs over others'.", isReversed: true, trait: 'Agreeableness' },
  { text: "I am uncomfortable with taking risks and trying new things.", isReversed: true, trait: 'Openness' },
  { text: "I find it difficult to empathize with others' feelings and perspectives.", isReversed: true, trait: 'Agreeableness' },
  { text: "I prefer having a few close friends over a wide circle of acquaintances.", isReversed: true, trait: 'Extraversion' },
  { text: "I am often described as easy-going rather than a perfectionist.", isReversed: true, trait: 'Conscientiousness' },
  { text: "I tend to get stressed easily under pressure or in difficult situations.", isReversed: true, trait: 'Neuroticism' },
  { text: "I prefer activities that are calm and require little physical exertion.", isReversed: true, trait: 'Extraversion' },
  { text: "I am not particularly interested in science and technological advancements.", isReversed: true, trait: 'Openness' },
  { text: "I find it challenging to adapt to changes in my environment or routine.", isReversed: true, trait: 'Conscientiousness' },
  { text: "I rarely reflect on my own thoughts and feelings.", isReversed: true, trait: 'Neuroticism' },
  { text: "I prefer working with abstract theories rather than concrete facts.", isReversed: false, trait: 'Openness' },
  { text: "I often hesitate to offer help when someone is in need.", isReversed: true, trait: 'Agreeableness' },
  { text: "I don't particularly enjoy being in nature or appreciating its beauty.", isReversed: true, trait: 'Openness' },
  { text: "I am quick to embrace new ideas without much skepticism.", isReversed: false, trait: 'Openness' },
  { text: "I often keep my opinions to myself, especially if they might be unpopular.", isReversed: true, trait: 'Agreeableness' },
  { text: "I prefer multitasking rather than focusing on one task at a time.", isReversed: true, trait: 'Conscientiousness' },
  { text: "I tend to stick to familiar experiences and avoid new ones.", isReversed: true, trait: 'Openness' },
  { text: "I find it challenging to see patterns and connections between different ideas.", isReversed: true, trait: 'Openness' },
  { text: "I am often the life of the party in social situations.", isReversed: false, trait: 'Extraversion' },
  { text: "I am often criticized for lacking creativity and original thinking.", isReversed: true, trait: 'Openness' },
  { text: "I prefer to have a flexible daily routine rather than a structured one.", isReversed: true, trait: 'Conscientiousness' },
  { text: "I often struggle to motivate myself to achieve my goals.", isReversed: true, trait: 'Conscientiousness' },
  { text: "I feel energized after social interactions and don't need much alone time.", isReversed: false, trait: 'Extraversion' },
  { text: "I find complex problems and puzzles frustrating rather than enjoyable.", isReversed: true, trait: 'Openness' },
  { text: "I often overlook small details in my surroundings.", isReversed: true, trait: 'Conscientiousness' },
  { text: "I frequently dwell on the past or worry about the future.", isReversed: true, trait: 'Neuroticism' },
  { text: "I tend to see things from a single, fixed perspective.", isReversed: true, trait: 'Openness' },
  { text: "I prefer to follow rather than lead in work or social groups.", isReversed: true, trait: 'Extraversion' },
  { text: "I make decisions quickly without much deliberation.", isReversed: true, trait: 'Conscientiousness' },
  { text: "I don't enjoy expressing myself through art, music, or writing.", isReversed: true, trait: 'Openness' },
  { text: "I find it challenging to start conversations with strangers.", isReversed: true, trait: 'Extraversion' },
  { text: "I prefer to have many casual acquaintances rather than a few close friends.", isReversed: false, trait: 'Extraversion' },
  { text: "I am often described as high-strung or easily stressed.", isReversed: true, trait: 'Neuroticism' },
  { text: "I rarely set ambitious goals for myself and prefer to take things easy.", isReversed: true, trait: 'Conscientiousness' },
  { text: "I am comfortable with public speaking and presenting to large groups.", isReversed: false, trait: 'Extraversion' },
  { text: "I enjoy solving complex mathematical or logical problems.", isReversed: false, trait: 'Openness' },
  { text: "I am often described as having a vivid imagination.", isReversed: false, trait: 'Openness' },
  { text: "I prefer quiet, solitary activities over group activities.", isReversed: true, trait: 'Extraversion' },
  { text: "I am generally trusting of others and their intentions.", isReversed: false, trait: 'Agreeableness' },
  { text: "I sometimes struggle to keep my living or working space tidy.", isReversed: true, trait: 'Conscientiousness' },
  { text: "I tend to be a worrier and often anticipate worst-case scenarios.", isReversed: true, trait: 'Neuroticism' },
  { text: "I am not particularly interested in abstract or theoretical concepts.", isReversed: true, trait: 'Openness' },
  { text: "I thrive in team environments and collaborative projects.", isReversed: false, trait: 'Agreeableness' },
  { text: "I am very punctual and always stick to my schedules.", isReversed: false, trait: 'Conscientiousness' },
  { text: "I am generally able to control my emotions well.", isReversed: false, trait: 'Neuroticism' },
  { text: "I prefer sticking to my own culture and way of life.", isReversed: true, trait: 'Openness' },
  { text: "I am comfortable taking on leadership roles when necessary.", isReversed: false, trait: 'Extraversion' },
  { text: "I prefer hands-on, practical solutions to problems.", isReversed: true, trait: 'Openness' },
  { text: "I often seek advice or opinions from others before making decisions.", isReversed: true, trait: 'Conscientiousness' },
  { text: "I enjoy engaging in intellectual discussions and debates.", isReversed: false, trait: 'Openness' },
  { text: "I often put others' needs before my own.", isReversed: false, trait: 'Agreeableness' },
  { text: "I am always eager to try new experiences and take risks.", isReversed: false, trait: 'Openness' },
  { text: "I am good at understanding and relating to others' emotions.", isReversed: false, trait: 'Agreeableness' },
  { text: "I enjoy being part of a large social network.", isReversed: false, trait: 'Extraversion' },
  { text: "I have high standards for myself and others.", isReversed: false, trait: 'Conscientiousness' },
  { text: "I remain calm under pressure and in stressful situations.", isReversed: false, trait: 'Neuroticism' },
  { text: "I enjoy activities that require physical exertion and energy.", isReversed: false, trait: 'Extraversion' },
  { text: "I am fascinated by scientific discoveries and technological advancements.", isReversed: false, trait: 'Openness' },
  { text: "I adapt quickly to new environments and situations.", isReversed: false, trait: 'Conscientiousness' },
  { text: "I frequently engage in self-reflection and introspection.", isReversed: false, trait: 'Neuroticism' },
  { text: "I prefer working with concrete facts and details rather than theories.", isReversed: true, trait: 'Openness' },
  { text: "I am always ready to lend a helping hand to those in need.", isReversed: false, trait: 'Agreeableness' },
  { text: "I find great joy in experiencing nature and its beauty.", isReversed: false, trait: 'Openness' },
  { text: "I tend to be critical of new ideas until they are proven.", isReversed: true, trait: 'Openness' },
  { text: "I am comfortable expressing my opinions, even if they are unpopular.", isReversed: false, trait: 'Agreeableness' },
  { text: "I prefer to focus on one task at a time rather than multitasking.", isReversed: false, trait: 'Conscientiousness' },
  { text: "I actively seek out new experiences and novel situations.", isReversed: false, trait: 'Openness' },
  { text: "I am good at recognizing patterns and connections between ideas.", isReversed: false, trait: 'Openness' },
  { text: "I prefer quiet, intimate gatherings to large social events.", isReversed: true, trait: 'Extraversion' },
  { text: "I am often praised for my creativity and original ideas.", isReversed: false, trait: 'Openness' },
  { text: "I thrive on having a structured and organized daily routine.", isReversed: false, trait: 'Conscientiousness' },
  { text: "I am self-motivated and driven to achieve my goals.", isReversed: false, trait: 'Conscientiousness' },
  { text: "I need significant alone time to recharge after social interactions.", isReversed: true, trait: 'Extraversion' },
  { text: "I enjoy tackling complex problems and puzzles.", isReversed: false, trait: 'Openness' },
  { text: "I pay close attention to details in my environment.", isReversed: false, trait: 'Conscientiousness' },
  { text: "I live in the present moment without dwelling on past or future.", isReversed: false, trait: 'Neuroticism' },
  { text: "I can easily see situations from multiple perspectives.", isReversed: false, trait: 'Openness' },
  { text: "I naturally take charge in group situations.", isReversed: false, trait: 'Extraversion' },
  { text: "I carefully weigh all options before making decisions.", isReversed: false, trait: 'Conscientiousness' },
  { text: "I express myself creatively through various forms of art or writing.", isReversed: false, trait: 'Openness' },
  { text: "I find it easy to strike up conversations with strangers.", isReversed: false, trait: 'Extraversion' },
  { text: "I prefer deep, meaningful relationships over casual acquaintances.", isReversed: false, trait: 'Agreeableness' },
  { text: "I am generally relaxed and not easily stressed.", isReversed: false, trait: 'Neuroticism' },
  { text: "I constantly set ambitious goals for myself and work hard to achieve them.", isReversed: false, trait: 'Conscientiousness' },
]

export default function PersonalityTest({ onComplete }: PersonalityTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ trait: string; score: number }[]>([])
  const [randomizedQuestions, setRandomizedQuestions] = useState<Question[]>([])
  const [buttonsEnabled, setButtonsEnabled] = useState(false)

  useEffect(() => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 50)
    setRandomizedQuestions(shuffled)
  }, [])

  useEffect(() => {
    setButtonsEnabled(false)
    const timer = setTimeout(() => {
      setButtonsEnabled(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [currentQuestionIndex])

  const handleAnswer = (value: number) => {
    if (!buttonsEnabled) return

    const currentQuestion = randomizedQuestions[currentQuestionIndex]
    const adjustedValue = currentQuestion.isReversed ? 6 - value : value
    const newAnswers = [...answers, { trait: currentQuestion.trait, score: adjustedValue }]
    setAnswers(newAnswers)

    if (currentQuestionIndex < randomizedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setButtonsEnabled(false)
    } else {
      onComplete(newAnswers)
    }
  }

  const questionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  }

  if (randomizedQuestions.length === 0) {
    return <div className="text-center">Loading questions...</div>
  }

  return (
    <div className="space-y-6 p-6 rounded-lg bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 shadow-lg">
      <h2 className="text-xl font-semibold text-left">
        Question {currentQuestionIndex + 1} of {randomizedQuestions.length}
      </h2>
      <AnimatePresence mode="wait" onExitComplete={() => setButtonsEnabled(true)}>
        <motion.div
          key={currentQuestionIndex}
          variants={questionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="min-h-[65px] sm:min-h-[80px] flex items-center"
        >
          <p className="text-lg text-left">{randomizedQuestions[currentQuestionIndex].text}</p>
        </motion.div>
      </AnimatePresence>
      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <Button
              key={value}
              onClick={() => handleAnswer(value)}
              variant="outline"
              className="w-full h-12 text-base font-semibold"
              aria-label={`Rate ${value} out of 5`}
              disabled={!buttonsEnabled}
            >
              {value}
            </Button>
          ))}
        </div>
        <div className="flex justify-between text-xs sm:text-sm text-gray-400">
          <span>Strongly Disagree</span>
          <span>Strongly Agree</span>
        </div>
      </div>
    </div>
  )
}
