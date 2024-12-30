import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface NameFormProps {
  name: string
  setName: (name: string) => void
  onNext: () => void
}

export default function NameForm({ name, setName, onNext }: NameFormProps) {
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onNext()
    } else {
      setError('Please enter your name')
    }
  }

  const formVariants = {
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
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 className="text-2xl sm:text-3xl font-bold text-center" variants={itemVariants}>
        Enter Your Name
      </motion.h2>
      <motion.div variants={itemVariants}>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <Input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value.replace(/\b\w/g, (char) => char.toUpperCase()))
            setError('')
          }}
          className="w-full"
          aria-describedby="name-error"
        />
        {error && <p id="name-error" className="text-red-500 mt-1 text-sm">{error}</p>}
      </motion.div>
      <motion.div variants={itemVariants}>
        <Button type="submit" className="w-full">Start Test</Button>
      </motion.div>
    </motion.form>
  )
}
