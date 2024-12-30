import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <motion.div
      className="text-center space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-4xl sm:text-5xl font-bold" variants={itemVariants}>
        Personality Test
      </motion.h1>
      <motion.p className="text-sm font-mono sm:text-lg text-gray-500" variants={itemVariants}>
        Insights about your personality traits/tendencies.
      </motion.p>
      <motion.div variants={itemVariants}>
        <Button onClick={onStart} size="lg">
          <span>Continue</span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight className="size-5" />
          </motion.div>
        </Button>
      </motion.div>
    </motion.div>
  )
}

