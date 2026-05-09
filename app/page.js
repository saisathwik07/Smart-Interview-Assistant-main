"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Mic, BarChart3, Globe, Zap, Shield, Users, Clock, ChevronRight, Star, Sparkles } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
};

const features = [
  { icon: Mic, title: "Natural Conversations", desc: "Human-like voice interactions powered by advanced NLP for realistic interviews.", color: "from-teal-500 to-emerald-400" },
  { icon: Zap, title: "Real-Time AI Analysis", desc: "Instantly evaluate responses with sentiment analysis and competency scoring.", color: "from-indigo-500 to-violet-400" },
  { icon: Globe, title: "Multi-Language Support", desc: "Conduct interviews in multiple languages with seamless real-time translation.", color: "from-emerald-500 to-green-400" },
  { icon: Shield, title: "Bias-Free Evaluation", desc: "AI-driven scoring eliminates unconscious bias for fair, objective hiring.", color: "from-amber-500 to-yellow-400" },
  { icon: BarChart3, title: "Deep Analytics", desc: "Comprehensive performance dashboards with actionable candidate insights.", color: "from-rose-500 to-pink-400" },
  { icon: Clock, title: "Save 80% Time", desc: "Automate screening rounds and shortlist top candidates in minutes.", color: "from-cyan-500 to-teal-400" },
];

const steps = [
  { num: "01", title: "Create Interview", desc: "Define job role, description, and let AI generate tailored interview questions in seconds.", img: "/schedule.jpg" },
  { num: "02", title: "Share & Conduct", desc: "Send interview links to candidates. Our AI voice agent conducts the entire interview autonomously.", img: "/conduct.png" },
  { num: "03", title: "Review & Hire", desc: "Get detailed AI-powered feedback with scores, summaries, and hire recommendations.", img: "/review.png" },
];

const Page = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed w-full z-50 glass"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">AiCruiter</span>
            </div>
            <div className="flex items-center space-x-1">
              <a href="#features" className="text-foreground/70 hover:text-primary px-3 py-2 rounded-lg text-sm font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-foreground/70 hover:text-primary px-3 py-2 rounded-lg text-sm font-medium transition-colors">How It Works</a>
              <a href="#contact" className="text-foreground/70 hover:text-primary px-3 py-2 rounded-lg text-sm font-medium transition-colors">Contact</a>
              <Link href="/auth" className="ml-2 gradient-primary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 min-h-screen flex items-center gradient-hero overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-teal-300 text-sm px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Interview Platform</span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Hire Smarter with{' '}
              <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                AI Voice Interviews
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="mt-6 text-lg text-gray-300 max-w-xl">
              Conduct seamless, intelligent interviews with our AI voice agent. Generate questions, evaluate candidates, and make data-driven hiring decisions — all automated.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/auth" className="group gradient-primary text-white px-8 py-3.5 rounded-xl text-lg font-semibold hover:opacity-90 transition-all shadow-xl shadow-teal-500/25 flex items-center justify-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#how-it-works" className="border border-white/20 text-white px-8 py-3.5 rounded-xl text-lg font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                See How It Works
              </a>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="mt-10 flex items-center gap-6 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-indigo-400 border-2 border-[#0c0a09] flex items-center justify-center text-[10px] text-white font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span>Trusted by 2,000+ recruiters</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.8, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <div className="absolute inset-0 gradient-primary opacity-20 rounded-2xl blur-2xl" />
              <Image src="/agent.png" alt="AI Voice Agent" width={600} height={500} className="relative rounded-2xl shadow-2xl border border-white/10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" className="py-24 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-primary font-semibold text-sm tracking-wider uppercase mb-2">Why AiCruiter?</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-extrabold text-foreground">
              Everything You Need for<br />
              <span className="gradient-text">Smarter Hiring</span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="glass-card rounded-2xl p-6 group cursor-default">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-primary font-semibold text-sm tracking-wider uppercase mb-2">Simple Process</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-extrabold text-foreground">
              Three Steps to <span className="gradient-text">Perfect Hires</span>
            </motion.h2>
          </motion.div>

          <div className="space-y-20">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
              >
                <motion.div variants={fadeUp} className="md:w-1/2">
                  <div className="relative group">
                    <div className="absolute -inset-2 gradient-primary opacity-10 rounded-2xl blur-xl group-hover:opacity-20 transition-opacity" />
                    <Image src={step.img} alt={step.title} width={500} height={350} className="relative rounded-2xl shadow-lg border border-border" />
                  </div>
                </motion.div>
                <motion.div variants={fadeUp} custom={1} className="md:w-1/2">
                  <span className="text-6xl font-black gradient-text opacity-60">{step.num}</span>
                  <h3 className="text-2xl font-bold text-foreground mt-2">{step.title}</h3>
                  <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{step.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-primary font-semibold cursor-pointer group">
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />

        <motion.div
          className="max-w-4xl mx-auto px-4 text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-white">
            Ready to Transform Your<br />Hiring Process?
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            Join thousands of companies using AiCruiter to automate interviews and find top talent 10x faster.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth" className="bg-white text-blue-600 px-8 py-3.5 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all shadow-xl flex items-center justify-center gap-2 group">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="bg-[#0f172a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">AiCruiter</span>
              </div>
              <p className="text-gray-400 max-w-sm">
                AI-powered interview platform that automates screening, evaluates candidates, and helps you hire the best talent effortlessly.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors text-sm">How It Works</a></li>
                <li><Link href="/auth" className="text-gray-300 hover:text-white transition-colors text-sm">Get Started</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li>abhigolanakonda4546@gmail.com</li>
                <li>+91 8712318704</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-8 text-center">
            <p className="text-gray-500 text-sm">&copy; 2026 AiCruiter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;