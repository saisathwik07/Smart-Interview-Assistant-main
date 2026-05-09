"use client"
import React, { useState } from "react"
import WelcomeContainer from "../dashboard/_components/WelcomeContainer"
import { Button } from "@/components/ui/button"
import { CheckIcon, Sparkles, Crown, Zap } from "lucide-react"
import { motion } from "framer-motion"

const plans = [
  {
    name: "Starter",
    price: 500,
    interviews: 20,
    icon: Zap,
    color: "from-blue-500 to-cyan-400",
    features: ["Basic interview templates", "Email support", "5 question types", "Basic analytics"],
  },
  {
    name: "Professional",
    price: 900,
    interviews: 50,
    icon: Sparkles,
    popular: true,
    color: "from-violet-500 to-purple-400",
    features: ["All interview templates", "Priority support", "Advanced analytics", "Custom branding", "API access"],
  },
  {
    name: "Enterprise",
    price: 2000,
    interviews: 120,
    icon: Crown,
    color: "from-amber-500 to-orange-400",
    features: ["Unlimited templates", "24/7 dedicated support", "Advanced analytics", "Custom branding", "API access", "Team collaboration", "SSO integration"],
  },
]

export default function Credits() {
  const [purchasedPlan, setPurchasedPlan] = useState(null)
  const [loadingPlan, setLoadingPlan] = useState(null)
  const [totalCredits, setTotalCredits] = useState(0)

  const handlePurchase = async (plan) => {
    setLoadingPlan(plan.name)
    setTimeout(() => {
      setLoadingPlan(null)
      setTotalCredits(prev => prev + plan.interviews)
      setPurchasedPlan(plan)
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      <WelcomeContainer />

      {totalCredits > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 glass-card rounded-2xl p-4 text-center"
        >
          <p className="text-lg font-semibold text-emerald-600">
            ✨ You have <span className="text-2xl font-bold">{totalCredits}</span> interview credits available
          </p>
        </motion.div>
      )}

      <section className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-foreground">
            Choose Your <span className="gradient-text">Plan</span>
          </h1>
          <p className="text-muted-foreground mt-2">Add interview credits to power your hiring</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`glass-card rounded-2xl p-6 flex flex-col relative ${plan.popular ? 'ring-2 ring-primary shadow-lg shadow-blue-500/10' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 shadow-md`}>
                <plan.icon className="w-6 h-6 text-white" />
              </div>

              <h2 className="text-xl font-bold text-foreground">{plan.name}</h2>

              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-foreground">₹{plan.price}</span>
                <span className="text-muted-foreground text-sm">/ pack</span>
              </div>

              <p className="text-muted-foreground text-sm mt-1">{plan.interviews} interview credits</p>

              <div className="my-5 h-px bg-border" />

              <ul className="space-y-3 text-sm flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <CheckIcon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePurchase(plan)}
                disabled={loadingPlan === plan.name}
                className={`mt-6 w-full rounded-xl font-semibold py-5 ${
                  plan.popular 
                    ? 'gradient-primary text-white border-0 shadow-md shadow-teal-500/20' 
                    : ''
                }`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {loadingPlan === plan.name ? "Processing..." : "Purchase Credits"}
              </Button>
            </motion.div>
          ))}
        </div>

        {purchasedPlan && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 text-center glass-card rounded-2xl p-8 max-w-xl mx-auto border-emerald-200 dark:border-emerald-800"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mb-4 shadow-lg shadow-green-500/20">
              <CheckIcon className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground">
              You purchased the <strong>{purchasedPlan.name}</strong> plan with{' '}
              <strong>{purchasedPlan.interviews}</strong> interviews for ₹{purchasedPlan.price}.
            </p>
          </motion.div>
        )}
      </section>
    </div>
  )
}
