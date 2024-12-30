import { motion } from 'framer-motion'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadarChart } from "@/components/ui/radar-chart"

interface ResultsProps {
  name: string
  answers: { trait: string; score: number }[]
}

interface Trait {
  name: string
  score: number
}

interface TraitWithCount extends Trait {
  count: number
}

const traitNames = ["Extraversion", "Agreeableness", "Conscientiousness", "Neuroticism", "Openness"]

export default function Results({ name, answers }: ResultsProps) {
  const calculateTraits = (answers: { trait: string; score: number }[]): Trait[] => {
    const traits: TraitWithCount[] = traitNames.map(name => ({ name, score: 0, count: 0 }))

    answers.forEach(answer => {
      const trait = traits.find(t => t.name === answer.trait)
      if (trait) {
        trait.score += answer.score
        trait.count++
      }
    })

    return traits.map(trait => ({
      name: trait.name,
      score: trait.count > 0 ? Math.round((trait.score / (trait.count * 5)) * 100) : 0
    }))
  }

  const analyzePersonality = (traits: Trait[]): { description: string, traits: string[], advice: string } => {
    let description = `Your personality is characterized by a unique blend of traits. `
    const personalityTraits: string[] = []
    let advice = `Based on your personality profile, ${name}, here are some insights and suggestions: `

    traits.sort((a, b) => b.score - a.score)

    traits.forEach(trait => {
      const { name, score } = trait
      let traitDescription = ''
      let traitAdvice = ''
      let traitKeywords: string[] = []

      switch (name) {
        case "Extraversion":
          if (score > 70) {
            traitDescription = "You are highly extraverted, drawing energy from social interactions and external stimuli. "
            traitAdvice = "Your high extraversion is a great asset in social situations, but remember to make time for self-reflection and quieter activities to maintain balance. "
            traitKeywords = ["Outgoing", "Energetic", "Assertive", "Sociable", "Enthusiastic"]
          } else if (score < 30) {
            traitDescription = "You lean towards introversion, finding comfort in solitude and inner reflection. "
            traitAdvice = "While you value your solitude, consider gradually expanding your social circle to broaden your experiences and perspectives. "
            traitKeywords = ["Reserved", "Reflective", "Solitary", "Quiet", "Independent"]
          } else {
            traitDescription = "You have a balanced approach to social interactions, neither strongly preferring nor avoiding them. "
            traitAdvice = "Your balanced approach to social interaction allows you to adapt well to various situations. Continue to engage in both social and solitary activities. "
            traitKeywords = ["Ambivert", "Adaptable", "Balanced in social energy"]
          }
          break
        case "Agreeableness":
          if (score > 70) {
            traitDescription = "Your high agreeableness indicates a strong tendency towards compassion and cooperation. "
            traitAdvice = "Your kindness and cooperation are strengths, but ensure you're also asserting your own needs and setting healthy boundaries. "
            traitKeywords = ["Compassionate", "Cooperative", "Trusting", "Empathetic", "Altruistic"]
          } else if (score < 30) {
            traitDescription = "You tend to be more competitive and skeptical in your interactions with others. "
            traitAdvice = "Your direct approach can be valuable, but practicing empathy and seeing situations from others' perspectives could improve your relationships. "
            traitKeywords = ["Competitive", "Skeptical", "Challenging", "Direct", "Objective"]
          } else {
            traitDescription = "You balance cooperation with healthy skepticism in your relationships. "
            traitAdvice = "Your balanced approach allows you to be both cooperative and assertive. Continue to use this to your advantage in various situations. "
            traitKeywords = ["Diplomatic", "Realistic", "Balanced in trust"]
          }
          break
        case "Conscientiousness":
          if (score > 70) {
            traitDescription = "You exhibit high conscientiousness, valuing order, duty, and self-discipline. "
            traitAdvice = "Your organization and diligence are admirable, but don't forget to allow for flexibility and spontaneity in your life. "
            traitKeywords = ["Organized", "Responsible", "Diligent", "Disciplined", "Detail-oriented"]
          } else if (score < 30) {
            traitDescription = "You tend to be more flexible and spontaneous, sometimes at the expense of organization. "
            traitAdvice = "While your flexibility is an asset, developing some organizational skills and setting small, achievable goals could benefit your long-term success. "
            traitKeywords = ["Flexible", "Spontaneous", "Relaxed", "Adaptable", "Easy-going"]
          } else {
            traitDescription = "You maintain a balance between structure and flexibility in your approach to tasks. "
            traitAdvice = "Your balance between structure and flexibility is valuable. Continue to adapt your approach based on the demands of different situations. "
            traitKeywords = ["Balanced in organization", "Moderately planful", "Adaptable to structure"]
          }
          break
        case "Neuroticism":
          if (score > 70) {
            traitDescription = "You may experience higher levels of emotional sensitivity and reactivity to stress. "
            traitAdvice = "Your emotional sensitivity can lead to deep understanding, but exploring stress-management techniques could help you navigate challenging situations more easily. "
            traitKeywords = ["Sensitive", "Anxious", "Emotionally reactive", "Self-conscious", "Vulnerable to stress"]
          } else if (score < 30) {
            traitDescription = "You demonstrate high emotional stability and resilience in the face of stress. "
            traitAdvice = "Your emotional stability is a strength, but ensure you're still acknowledging and processing your emotions regularly. "
            traitKeywords = ["Emotionally stable", "Calm", "Confident", "Resilient", "Even-tempered"]
          } else {
            traitDescription = "You have a moderate emotional response to stress, neither overly sensitive nor completely unaffected. "
            traitAdvice = "Your balanced emotional response allows you to empathize with others while maintaining stability. This is a valuable trait in both personal and professional contexts. "
            traitKeywords = ["Moderately emotionally reactive", "Balanced in stress response"]
          }
          break
        case "Openness":
          if (score > 70) {
            traitDescription = "Your high openness suggests a strong curiosity and appreciation for new experiences and ideas. "
            traitAdvice = "Your curiosity and love for new experiences are wonderful traits. Remember to balance this with appreciating tried-and-true methods when appropriate. "
            traitKeywords = ["Curious", "Creative", "Open-minded", "Imaginative", "Intellectually oriented"]
          } else if (score < 30) {
            traitDescription = "You tend to prefer familiar routines and conventional approaches. "
            traitAdvice = "While you excel in familiar routines, challenging yourself to occasionally try new experiences could lead to personal growth and new opportunities. "
            traitKeywords = ["Conventional", "Practical", "Traditional", "Down-to-earth", "Focused"]
          } else {
            traitDescription = "You balance curiosity with appreciation for the familiar in your approach to experiences. "
            traitAdvice = "Your balance between openness and convention allows you to appreciate both innovation and tradition. Continue to explore new ideas while maintaining practical considerations. "
            traitKeywords = ["Moderately open to new experiences", "Balanced between tradition and innovation"]
          }
          break
      }

      description += traitDescription
      advice += traitAdvice
      personalityTraits.push(...traitKeywords)
    })

    return { description: description.trim(), traits: personalityTraits, advice: advice.trim() }
  }

  const traits = calculateTraits(answers)
  const { description, traits: personalityTraits, advice } = analyzePersonality(traits)

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
      className="space-y-6 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 className="text-2xl font-bold text-center mb-6" variants={itemVariants}>Results for {name}</motion.h2>
      <motion.div variants={itemVariants} className="w-full max-w-md mx-auto mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Personality Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base">{description}</p>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants} className="w-full max-w-md mx-auto mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Key Traits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 justify-center">
              {personalityTraits.map((trait, index) => (
                <Badge key={index} variant="outline" className="text-xs sm:text-sm">
                  {trait}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants} className="w-full max-w-md mx-auto my-8">
        <RadarChart
          data={traits.map(trait => ({
            trait: trait.name,
            score: trait.score,
          }))}
          index="trait"
          categories={["score"]}
          valueFormatter={(value: number) => `${value}%`}
          colors={["#3b82f6"]}
          className="w-full aspect-square"
        />
      </motion.div>
      <motion.div variants={itemVariants} className="w-full max-w-md mx-auto mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Advice</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base">{advice}</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

