"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  NotebookText,
  Target,
  BookOpen,
  ArrowLeftRight,
  Wallet,
  ChartBarStacked,
  Utensils,
  Dumbbell,
  ClipboardList,
  Coins,
  // HeartPulse,
  // CalendarDays,
  // LineChart,
  ChevronDown,
  // Github,
  // Twitter,
  // Linkedin,
  // Youtube,
  Flame,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { LifeOsIcon } from "@/components/icons/life-os-icon";

// Your custom LifeOsIcon (import from your file)

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="font-sans bg-black text-white min-h-screen">

      {/* ─── NAVIGATION ─── */}
      <header className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="#" className="flex items-center gap-2.5 group">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <LifeOsIcon className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-white">Life</span>
                <span className="gradient-text">OS</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="nav-link text-sm">Features</a>
              <a href="#modules" className="nav-link text-sm">Modules</a>
              <a href="#fitness" className="nav-link text-sm">Fitness</a>
              <a href="#about" className="nav-link text-sm">About</a>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition inline-flex items-center gap-2"
              >
                <span>Login</span>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white/70 hover:text-white text-xl p-2 rounded-lg hover:bg-white/5 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mobile-menu px-4 py-4 space-y-1">
            <a href="#features" className="block text-sm font-medium text-white/70 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition">Features</a>
            <a href="#modules" className="block text-sm font-medium text-white/70 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition">Modules</a>
            <a href="#fitness" className="block text-sm font-medium text-white/70 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition">Fitness</a>
            <a href="#about" className="block text-sm font-medium text-white/70 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition">About</a>
            <hr className="border-white/5 my-2" />
            <Link
              href="/login"
              className="block text-center btn-primary text-white text-sm font-semibold px-5 py-3 rounded-xl transition mt-1"
            >
              Login with Google
            </Link>
          </div>
        )}
      </header>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Subtle blue glow */}
        <div className="absolute w-125 h-125 -top-40 -left-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute w-100 h-100 -bottom-40 -right-40 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Text */}
            <div className="text-center lg:text-left">
              <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
                Your digital
                <br />
                <span className="gradient-text">Life Operating</span>
                <br />
                <span className="text-white">System</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-white/50 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Track your calories, crush your fitness goals, manage tasks and finances —
                <span className="text-white/70"> all in one place</span>.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/login"
                  className="btn-primary text-white text-base font-semibold px-8 py-3.5 rounded-xl transition inline-flex items-center justify-center gap-2"
                >
                  Get Started
                  <ChevronDown className="w-4 h-4" />
                </Link>
                <a
                  href="#features"
                  className="btn-outline text-white/80 text-base font-medium px-8 py-3.5 rounded-xl transition inline-flex items-center justify-center gap-2"
                >
                  Learn More
                </a>
              </div>

              {/* Minimal trust indicator */}
              <div className="mt-10 flex flex-wrap items-center gap-4 justify-center lg:justify-start text-white/30 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  100% free
                </span>
                <span className="w-px h-4 bg-white/10"></span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  No credit card
                </span>
              </div>
            </div>

            {/* Right: Dashboard mock (minimal) */}
            <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
              <div className="glass-card rounded-2xl p-6 shadow-2xl border-white/5 w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-white/40 tracking-wider uppercase">Dashboard</span>
                  <span className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500/60"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-300/40"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500/60"></span>
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-sm text-white/60 flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-400" />
                      Calories
                    </span>
                    <span className="text-sm font-semibold text-white">1,842 / 2,200</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-sm text-white/60 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-400" />
                      Fitness
                    </span>
                    <span className="text-sm font-semibold text-white">72%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-sm text-white/60 flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-blue-400" />
                      Tasks
                    </span>
                    <span className="text-sm font-semibold text-white">12 / 18</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-sm text-white/60 flex items-center gap-2">
                      <Coins className="w-4 h-4 text-emerald-400" />
                      Budget
                    </span>
                    <span className="text-sm font-semibold text-white">$340 / $500</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20 text-xs animate-bounce">
          <span>Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400/70">Features</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
              Everything you need to <span className="gradient-text">level up</span>
            </h2>
            <div className="section-divider mt-4"></div>
            <p className="mt-4 text-white/50 text-lg">
              From calorie tracking to financial planning — LifeOS brings all your tools together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-12">
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="feature-icon mx-auto"><Utensils className="w-6 h-6" /></div>
              <h3 className="text-lg font-bold text-white mt-4">Calorie Tracking</h3>
              <p className="text-white/40 text-sm mt-1 leading-relaxed">Log meals, scan barcodes, and hit your daily goals.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="feature-icon mx-auto"><Dumbbell className="w-6 h-6" /></div>
              <h3 className="text-lg font-bold text-white mt-4">Fitness &amp; Workouts</h3>
              <p className="text-white/40 text-sm mt-1 leading-relaxed">Track reps, sets, and progress with custom routines.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="feature-icon mx-auto"><ClipboardList className="w-6 h-6" /></div>
              <h3 className="text-lg font-bold text-white mt-4">Tasks &amp; Productivity</h3>
              <p className="text-white/40 text-sm mt-1 leading-relaxed">Organize your day, set priorities, and get more done.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="feature-icon mx-auto"><Coins className="w-6 h-6" /></div>
              <h3 className="text-lg font-bold text-white mt-4">Finance &amp; Budget</h3>
              <p className="text-white/40 text-sm mt-1 leading-relaxed">Track spending, manage budgets, reach your goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODULES ─── */}
      <section id="modules" className="relative py-20 md:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400/70">Modules</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
              Built around <span className="gradient-text">your life</span>
            </h2>
            <div className="section-divider mt-4"></div>
            <p className="mt-4 text-white/50 text-lg">Every module works together for a complete view of your life.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {/* Productivity */}
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xl text-blue-400"><LayoutDashboard className="w-5 h-5" /></span>
                <h3 className="text-lg font-bold text-white">Productivity</h3>
                <span className="ml-auto text-[10px] font-medium uppercase tracking-widest text-white/20">Core</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-white/60 hover:text-white/80 transition">
                  <CheckSquare className="w-4 h-4 text-blue-400/60" />
                  <span>Tasks</span>
                  <span className="ml-auto text-xs text-white/20">/tasks</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60 hover:text-white/80 transition">
                  <Calendar className="w-4 h-4 text-blue-400/60" />
                  <span>Calendar</span>
                  <span className="ml-auto text-xs text-white/20">/calendar</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60 hover:text-white/80 transition">
                  <NotebookText className="w-4 h-4 text-blue-400/60" />
                  <span>Notes</span>
                  <span className="ml-auto text-xs text-white/20">/notes</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60 hover:text-white/80 transition">
                  <Target className="w-4 h-4 text-blue-400/60" />
                  <span>Goals</span>
                  <span className="ml-auto text-xs text-white/20">/goals</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60 hover:text-white/80 transition">
                  <BookOpen className="w-4 h-4 text-blue-400/60" />
                  <span>Journal</span>
                  <span className="ml-auto text-xs text-white/20">/journal</span>
                </li>
              </ul>
            </div>

            {/* Finance */}
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xl text-blue-400"><Coins className="w-5 h-5" /></span>
                <h3 className="text-lg font-bold text-white">Finance</h3>
                <span className="ml-auto text-[10px] font-medium uppercase tracking-widest text-white/20">Core</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-white/60 hover:text-white/80 transition">
                  <ArrowLeftRight className="w-4 h-4 text-blue-400/60" />
                  <span>Transactions</span>
                  <span className="ml-auto text-xs text-white/20">/transactions</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60 hover:text-white/80 transition">
                  <Wallet className="w-4 h-4 text-blue-400/60" />
                  <span>Budget</span>
                  <span className="ml-auto text-xs text-white/20">/budget</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60 hover:text-white/80 transition">
                  <ChartBarStacked className="w-4 h-4 text-blue-400/60" />
                  <span>Categories</span>
                  <span className="ml-auto text-xs text-white/20">/categories</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FITNESS & CALORIE TRACKING ─── */}
      <section id="fitness" className="relative py-20 md:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400/70">Fitness + Nutrition</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
                Calorie tracking &amp; <span className="gradient-text">fitness</span> in one flow
              </h2>
              <div className="section-divider mt-4"></div>
              <p className="mt-4 text-white/50 text-lg leading-relaxed">
                Log your meals, track macros, and monitor your workouts — all synced seamlessly.
                Whether you&apos;re bulking, cutting, or maintaining, LifeOS has you covered.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <CheckCircle2 className="w-4 h-4 text-blue-400/70 mt-0.5" />
                  <span><span className="text-white/80 font-medium">Food database</span> with 1M+ items and barcode scanning</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <CheckCircle2 className="w-4 h-4 text-blue-400/70 mt-0.5" />
                  <span><span className="text-white/80 font-medium">Workout routines</span> — custom or guided, with progress tracking</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <CheckCircle2 className="w-4 h-4 text-blue-400/70 mt-0.5" />
                  <span><span className="text-white/80 font-medium">Daily insights</span> on calories, protein, carbs, and fat</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <CheckCircle2 className="w-4 h-4 text-blue-400/70 mt-0.5" />
                  <span><span className="text-white/80 font-medium">Wearable sync</span> — connect your fitness tracker</span>
                </li>
              </ul>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-blue-400 hover:text-blue-300 transition"
              >
                Start tracking now
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </Link>
            </div>

            {/* Right: minimal stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-5 text-center">
                <div className="text-3xl font-extrabold gradient-text">1,842</div>
                <div className="text-xs text-white/40 mt-1">Calories today</div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '73%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-white/20 mt-1">
                  <span>0</span>
                  <span>2,200</span>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-5 text-center">
                <div className="text-3xl font-extrabold gradient-text">72%</div>
                <div className="text-xs text-white/40 mt-1">Fitness progress</div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '72%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-white/20 mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-5 text-center">
                <div className="text-2xl font-extrabold text-white">87g</div>
                <div className="text-xs text-white/40 mt-1">Protein</div>
                <div className="text-[10px] text-white/20 mt-1">🥩 +12g today</div>
              </div>
              <div className="glass-card rounded-2xl p-5 text-center">
                <div className="text-2xl font-extrabold text-white">45 min</div>
                <div className="text-xs text-white/40 mt-1">Workout</div>
                <div className="text-[10px] text-white/20 mt-1">💪 4 exercises</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section id="about" className="relative py-20 md:py-28 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400/70">Get Started</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-2 leading-tight">
            Ready to take control of <span className="gradient-text">your life</span>?
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-xl mx-auto">
            Join thousands of users who are already tracking, growing, and thriving with LifeOS.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link
              href="/login"
              className="btn-primary text-white text-base font-semibold px-10 py-4 rounded-xl transition inline-flex items-center justify-center gap-2"
            >
              Get Started
              <ChevronDown className="w-4 h-4" />
            </Link>
          </div>
          <p className="mt-6 text-xs text-white/20">
            No credit card required · Free forever · 100% private
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <LifeOsIcon className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-white">Life</span><span className="gradient-text">OS</span>
              </span>
              <span className="text-xs text-white/20">© 2026</span>
            </div>
            <nav className="flex flex-wrap items-center gap-6 text-sm text-white/30">
              <Link href="#" className="hover:text-white/60 transition">Privacy</Link>
              <Link href="#" className="hover:text-white/60 transition">Terms</Link>
              <Link href="#" className="hover:text-white/60 transition">Support</Link>
              <Link href="#" className="hover:text-white/60 transition">GitHub</Link>
            </nav>
            {/* <div className="flex items-center gap-4 text-white/20">
              <Link href="#" className="hover:text-white/50 transition"><Github className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-white/50 transition"><Twitter className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-white/50 transition"><Linkedin className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-white/50 transition"><Youtube className="w-5 h-5" /></Link>
            </div> */}
          </div>
          <div className="mt-6 text-center text-xs text-white/10">
            Built with <span className="text-blue-400/40 mx-1">❤</span> for the life you deserve.
          </div>
        </div>
      </footer>

    </div>
  );
}