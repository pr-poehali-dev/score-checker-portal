import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type Section = "home" | "tests" | "results" | "stats" | "profile" | "contacts";

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "tests", label: "Мои тесты", icon: "BookOpen" },
  { id: "results", label: "Результаты", icon: "BarChart2" },
  { id: "stats", label: "Статистика", icon: "TrendingUp" },
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "contacts", label: "Контакты", icon: "Mail" },
];

const TESTS = [
  { id: 1, title: "Основы программирования", subject: "ИТ", questions: 40, time: 45, status: "available", difficulty: "Средний" },
  { id: 2, title: "Математический анализ", subject: "Математика", questions: 30, time: 60, status: "available", difficulty: "Сложный" },
  { id: 3, title: "Деловое общение", subject: "Менеджмент", questions: 25, time: 30, status: "completed", difficulty: "Лёгкий" },
  { id: 4, title: "Основы экономики", subject: "Экономика", questions: 35, time: 50, status: "available", difficulty: "Средний" },
  { id: 5, title: "Английский язык B2", subject: "Языки", questions: 50, time: 90, status: "completed", difficulty: "Сложный" },
  { id: 6, title: "Психология управления", subject: "Менеджмент", questions: 20, time: 25, status: "locked", difficulty: "Лёгкий" },
];

const RESULTS = [
  { id: 1, title: "Деловое общение", date: "22 мая 2026", score: 94, total: 100, passed: true, cert: true },
  { id: 2, title: "Английский язык B2", date: "18 мая 2026", score: 78, total: 100, passed: true, cert: false },
  { id: 3, title: "Основы права", date: "10 мая 2026", score: 52, total: 100, passed: false, cert: false },
  { id: 4, title: "Финансовая грамотность", date: "02 мая 2026", score: 89, total: 100, passed: true, cert: true },
  { id: 5, title: "Бизнес-аналитика", date: "25 апр 2026", score: 91, total: 100, passed: true, cert: true },
];

const STATS_MONTHLY = [
  { month: "Янв", tests: 2, avg: 72 },
  { month: "Фев", tests: 3, avg: 78 },
  { month: "Мар", tests: 1, avg: 65 },
  { month: "Апр", tests: 4, avg: 83 },
  { month: "Май", tests: 5, avg: 88 },
];

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 90 ? "text-emerald-400"
    : score >= 75 ? "text-blue-400"
    : score >= 60 ? "text-amber-400"
    : "text-red-400";
  return <span className={`font-mono font-bold text-xl ${color}`}>{score}%</span>;
}

function DifficultyBadge({ level }: { level: string }) {
  const variants: Record<string, string> = {
    "Лёгкий": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "Средний": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "Сложный": "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded border font-medium ${variants[level] || ""}`}>
      {level}
    </span>
  );
}

function StatCard({ icon, label, value, sub, delay }: {
  icon: string; label: string; value: string; sub?: string; delay?: number;
}) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-6 animate-fade-in"
      style={{ animationDelay: `${(delay || 0) * 0.1}s`, animationFillMode: "forwards", opacity: 0 }}
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon name={icon} size={20} className="text-primary" />
      </div>
      <p className="text-muted-foreground text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-foreground font-mono">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

function Certificate({ test, score, onClose }: { test: string; score: number; onClose: () => void }) {
  const date = new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  const certNum = Math.floor(Math.random() * 9000 + 1000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl cert-glow animate-scale-in" style={{ animationFillMode: "forwards" }}>
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-muted transition-colors"
        >
          <Icon name="X" size={14} className="text-foreground" />
        </button>

        <div className="bg-card rounded-2xl border-2 border-primary/30 p-8 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-32 translate-x-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full translate-y-24 -translate-x-24 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <Icon name="Award" size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">TestPro</p>
                  <p className="text-sm font-semibold text-foreground">Платформа тестирования</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Дата выдачи</p>
                <p className="text-sm font-medium text-foreground">{date}</p>
              </div>
            </div>

            <div className="text-center py-6 border-y border-border/50 mb-8">
              <p className="text-sm text-muted-foreground mb-2 font-mono uppercase tracking-widest">
                Сертификат об успешном прохождении
              </p>
              <h2 className="text-2xl font-bold text-foreground mb-4">{test}</h2>
              <p className="text-muted-foreground mb-4">выдан участнику</p>
              <p className="text-xl font-bold text-primary mb-6">Александр Петров</p>
              <div className="inline-flex items-center gap-3 bg-muted/50 rounded-xl px-6 py-3 border border-border">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-0.5">Результат</p>
                  <p className="text-3xl font-bold font-mono text-emerald-400">{score}%</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-0.5">Статус</p>
                  <p className="text-sm font-bold text-emerald-400">ЗАЧТЕНО</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <div className="w-24 h-px bg-border mb-1" />
                <p className="text-xs text-muted-foreground">Подпись преподавателя</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="CheckCircle" size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono">№ CERT-2026-{certNum}</p>
                  <p className="text-xs text-emerald-400">Подтверждено системой</p>
                </div>
              </div>
              <div>
                <div className="w-24 h-px bg-border mb-1" />
                <p className="text-xs text-muted-foreground">Печать организации</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button className="flex-1 bg-primary hover:bg-primary/90 text-white gap-2">
            <Icon name="Download" size={16} />
            Скачать PDF
          </Button>
          <Button variant="outline" className="flex-1 gap-2 border-border text-foreground hover:bg-secondary">
            <Icon name="Share2" size={16} />
            Поделиться
          </Button>
        </div>
      </div>
    </div>
  );
}

function HomeSection({ onNavigate }: { onNavigate: (s: Section) => void }) {
  return (
    <div className="space-y-8">
      <div className="relative rounded-2xl overflow-hidden border border-border bg-card p-8 md:p-12 grid-bg">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/8 rounded-full -translate-y-40 translate-x-40 pointer-events-none" />
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary font-medium font-mono">ПЛАТФОРМА АКТИВНА</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4 leading-tight">
            Проверь свои знания.<br />
            <span className="text-primary">Получи сертификат.</span>
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Профессиональная система тестирования с мгновенными результатами
            и автоматической генерацией сертификатов при успешном прохождении.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => onNavigate("tests")} className="bg-primary hover:bg-primary/90 text-white gap-2 px-6">
              <Icon name="Play" size={16} />
              Начать тестирование
            </Button>
            <Button onClick={() => onNavigate("results")} variant="outline" className="gap-2 border-border text-foreground hover:bg-secondary px-6">
              <Icon name="BarChart2" size={16} />
              Мои результаты
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="CheckCircle" label="Пройдено тестов" value="12" sub="За всё время" delay={1} />
        <StatCard icon="Award" label="Сертификатов" value="8" sub="Получено" delay={2} />
        <StatCard icon="TrendingUp" label="Средний балл" value="84%" sub="По всем тестам" delay={3} />
        <StatCard icon="Clock" label="Часов обучения" value="24" sub="В этом месяце" delay={4} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Доступные тесты</h2>
          <button onClick={() => onNavigate("tests")} className="text-sm text-primary hover:underline flex items-center gap-1">
            Все тесты <Icon name="ArrowRight" size={14} />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {TESTS.filter(t => t.status === "available").slice(0, 2).map(test => (
            <div
              key={test.id}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground font-mono mb-1">{test.subject}</p>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{test.title}</h3>
                </div>
                <DifficultyBadge level={test.difficulty} />
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Icon name="HelpCircle" size={13} />{test.questions} вопросов</span>
                <span className="flex items-center gap-1"><Icon name="Clock" size={13} />{test.time} мин</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestsSection() {
  const [filter, setFilter] = useState<"all" | "available" | "completed" | "locked">("all");
  const filtered = filter === "all" ? TESTS : TESTS.filter(t => t.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground mb-1">Мои тесты</h1>
        <p className="text-muted-foreground">Доступные и пройденные тесты</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["all", "available", "completed", "locked"] as const).map(f => {
          const labels = { all: "Все", available: "Доступные", completed: "Пройденные", locked: "Заблокированные" };
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                filter === f
                  ? "bg-primary text-white border-primary"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {labels[f]}
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((test, i) => (
          <div
            key={test.id}
            className="bg-card border border-border rounded-xl p-5 animate-fade-in flex flex-col"
            style={{ animationDelay: `${i * 0.07}s`, animationFillMode: "forwards", opacity: 0 }}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs text-primary font-mono uppercase tracking-wider">{test.subject}</span>
              <DifficultyBadge level={test.difficulty} />
            </div>
            <h3 className="font-semibold text-foreground mb-3 flex-1">{test.title}</h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><Icon name="HelpCircle" size={12} />{test.questions} вопр.</span>
              <span className="flex items-center gap-1"><Icon name="Clock" size={12} />{test.time} мин</span>
            </div>
            {test.status === "completed" && (
              <div className="flex items-center gap-2 mb-3">
                <Icon name="CheckCircle" size={14} className="text-emerald-400" />
                <span className="text-xs text-emerald-400 font-medium">Пройден</span>
              </div>
            )}
            {test.status === "locked" && (
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Lock" size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Требуется доступ</span>
              </div>
            )}
            <Button
              disabled={test.status === "locked"}
              className={`w-full text-sm gap-2 ${
                test.status === "completed"
                  ? "bg-secondary text-foreground hover:bg-secondary/80"
                  : test.status === "locked"
                  ? "opacity-40 bg-secondary text-foreground"
                  : "bg-primary text-white hover:bg-primary/90"
              }`}
            >
              {test.status === "completed" ? (
                <><Icon name="RotateCcw" size={14} />Пересдать</>
              ) : test.status === "locked" ? (
                <><Icon name="Lock" size={14} />Заблокирован</>
              ) : (
                <><Icon name="Play" size={14} />Начать тест</>
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsSection() {
  const [cert, setCert] = useState<{ test: string; score: number } | null>(null);

  return (
    <div className="space-y-6">
      {cert && <Certificate test={cert.test} score={cert.score} onClose={() => setCert(null)} />}

      <div>
        <h1 className="text-2xl font-black text-foreground mb-1">Результаты</h1>
        <p className="text-muted-foreground">История прохождения тестов</p>
      </div>

      <div className="space-y-3">
        {RESULTS.map((r, i) => (
          <div
            key={r.id}
            className="bg-card border border-border rounded-xl p-5 animate-fade-in flex items-center gap-4 flex-wrap"
            style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "forwards", opacity: 0 }}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${r.passed ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
              <Icon name={r.passed ? "CheckCircle" : "XCircle"} size={20} className={r.passed ? "text-emerald-400" : "text-red-400"} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground">{r.title}</h3>
                {r.passed && r.cert && (
                  <span className="text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-2 py-0.5 flex items-center gap-1">
                    <Icon name="Award" size={10} />Сертификат
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{r.date}</p>
            </div>

            <div className="text-right flex-shrink-0">
              <ScoreBadge score={r.score} />
              <p className="text-xs text-muted-foreground mt-0.5">{r.passed ? "Зачтено" : "Не зачтено"}</p>
            </div>

            <div className="w-24 flex-shrink-0 hidden md:block">
              <Progress value={r.score} className="h-1.5" />
            </div>

            {r.cert && r.passed && (
              <Button
                size="sm"
                onClick={() => setCert({ test: r.title, score: r.score })}
                className="flex-shrink-0 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 gap-1.5"
              >
                <Icon name="Download" size={14} />
                <span className="hidden sm:inline">Сертификат</span>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsSection() {
  const maxAvg = 100;
  const maxTests = Math.max(...STATS_MONTHLY.map(m => m.tests));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground mb-1">Статистика</h1>
        <p className="text-muted-foreground">Динамика успеваемости</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="Target" label="Всего тестов" value="15" delay={1} />
        <StatCard icon="CheckCircle" label="Пройдено" value="12" sub="80% успех" delay={2} />
        <StatCard icon="TrendingUp" label="Лучший балл" value="97%" delay={3} />
        <StatCard icon="Award" label="Сертификатов" value="8" delay={4} />
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-bold text-foreground mb-6">Средний балл по месяцам</h2>
        <div className="flex items-end gap-4 h-40">
          {STATS_MONTHLY.map((m, i) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground font-mono">{m.avg}%</span>
              <div
                className="w-full rounded-t-md"
                style={{
                  height: `${(m.avg / maxAvg) * 100}px`,
                  background: `linear-gradient(to top, hsl(213 85% 52%), hsl(166 72% 44% / 0.7))`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
              <span className="text-xs text-muted-foreground">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-bold text-foreground mb-6">Количество тестов по месяцам</h2>
        <div className="flex items-end gap-4 h-32">
          {STATS_MONTHLY.map((m) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground font-mono">{m.tests}</span>
              <div
                className="w-full rounded-t-md bg-primary/30 border border-primary/20"
                style={{ height: `${(m.tests / maxTests) * 80}px` }}
              />
              <span className="text-xs text-muted-foreground">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-bold text-foreground mb-4">Достижения</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: "Zap", label: "Быстрый старт", desc: "Первый тест", unlocked: true },
            { icon: "Flame", label: "На волне", desc: "3 теста подряд", unlocked: true },
            { icon: "Star", label: "Отличник", desc: "Балл выше 90%", unlocked: true },
            { icon: "Crown", label: "Мастер", desc: "10 сертификатов", unlocked: false },
          ].map(a => (
            <div
              key={a.label}
              className={`rounded-xl border p-4 text-center ${a.unlocked ? "bg-card border-primary/20" : "bg-muted/30 border-border opacity-50"}`}
            >
              <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${a.unlocked ? "bg-primary/10" : "bg-muted"}`}>
                <Icon name={a.icon} size={20} className={a.unlocked ? "text-primary" : "text-muted-foreground"} />
              </div>
              <p className="text-sm font-semibold text-foreground">{a.label}</p>
              <p className="text-xs text-muted-foreground">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Типы для профиля и конструктора тестов ─────────────────────────────────

interface ProfileData {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
  organization: string;
  specialty: string;
  role: "student" | "teacher";
}

interface QuestionOption {
  id: number;
  text: string;
  correct: boolean;
}

interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

interface CreatedTest {
  id: number;
  title: string;
  subject: string;
  difficulty: string;
  timeLimit: number;
  questions: Question[];
  passingScore: number;
}

// ─── Конструктор тестов ───────────────────────────────────────────────────────

function TestBuilder({ onClose, onSave }: { onClose: () => void; onSave: (test: CreatedTest) => void }) {
  const [step, setStep] = useState<"info" | "questions" | "done">("info");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("Средний");
  const [timeLimit, setTimeLimit] = useState("30");
  const [passingScore, setPassingScore] = useState("70");
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: "", options: [
      { id: 1, text: "", correct: true },
      { id: 2, text: "", correct: false },
      { id: 3, text: "", correct: false },
      { id: 4, text: "", correct: false },
    ]},
  ]);
  const [activeQ, setActiveQ] = useState(0);

  const currentQ = questions[activeQ];

  const addQuestion = () => {
    const newQ: Question = {
      id: Date.now(),
      text: "",
      options: [
        { id: 1, text: "", correct: true },
        { id: 2, text: "", correct: false },
        { id: 3, text: "", correct: false },
        { id: 4, text: "", correct: false },
      ],
    };
    setQuestions(prev => [...prev, newQ]);
    setActiveQ(questions.length);
  };

  const removeQuestion = (idx: number) => {
    if (questions.length === 1) return;
    setQuestions(prev => prev.filter((_, i) => i !== idx));
    setActiveQ(Math.max(0, activeQ - 1));
  };

  const updateQuestion = (text: string) => {
    setQuestions(prev => prev.map((q, i) => i === activeQ ? { ...q, text } : q));
  };

  const updateOption = (optId: number, text: string) => {
    setQuestions(prev => prev.map((q, i) =>
      i === activeQ ? { ...q, options: q.options.map(o => o.id === optId ? { ...o, text } : o) } : q
    ));
  };

  const setCorrect = (optId: number) => {
    setQuestions(prev => prev.map((q, i) =>
      i === activeQ ? { ...q, options: q.options.map(o => ({ ...o, correct: o.id === optId })) } : q
    ));
  };

  const handleSave = () => {
    onSave({
      id: Date.now(),
      title,
      subject,
      difficulty,
      timeLimit: parseInt(timeLimit) || 30,
      questions,
      passingScore: parseInt(passingScore) || 70,
    });
    setStep("done");
  };

  const inputCls = "w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-card border border-border rounded-2xl shadow-2xl animate-scale-in flex flex-col max-h-[90vh]" style={{ animationFillMode: "forwards" }}>
        {/* Шапка */}
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="PenLine" size={18} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Конструктор тестов</h2>
              <p className="text-xs text-muted-foreground">
                {step === "info" ? "Шаг 1: Информация о тесте" : step === "questions" ? `Шаг 2: Вопросы (${questions.length})` : "Тест создан"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Контент */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === "done" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Тест создан!</h3>
              <p className="text-muted-foreground mb-2">«{title}» — {questions.length} вопросов</p>
              <p className="text-sm text-muted-foreground mb-6">Тест добавлен в раздел «Мои тесты» и доступен ученикам</p>
              <Button onClick={onClose} className="bg-primary text-white hover:bg-primary/90 gap-2">
                <Icon name="ArrowLeft" size={16} />
                Вернуться
              </Button>
            </div>
          ) : step === "info" ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Название теста *</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Например: Основы физики" className={inputCls} />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Предмет *</label>
                  <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Например: Физика" className={inputCls} />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Сложность</label>
                  <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className={inputCls}>
                    <option>Лёгкий</option>
                    <option>Средний</option>
                    <option>Сложный</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Время (мин)</label>
                  <input type="number" value={timeLimit} onChange={e => setTimeLimit(e.target.value)} min="5" max="180" className={inputCls} />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Проходной балл (%)</label>
                  <input type="number" value={passingScore} onChange={e => setPassingScore(e.target.value)} min="1" max="100" className={inputCls} />
                </div>
              </div>
              <div className="bg-muted/30 rounded-xl p-4 border border-border">
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <Icon name="Info" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                  Ученики получат сертификат автоматически, если наберут {passingScore}% и выше.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex gap-4 h-full">
              {/* Список вопросов */}
              <div className="w-40 flex-shrink-0 space-y-1.5">
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">Вопросы</p>
                {questions.map((q, i) => (
                  <div key={q.id} className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveQ(i)}
                      className={`flex-1 text-left px-3 py-2 rounded-lg text-sm transition-colors truncate ${
                        activeQ === i ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      {i + 1}. {q.text ? q.text.slice(0, 16) + (q.text.length > 16 ? "…" : "") : <span className="italic opacity-60">Пусто</span>}
                    </button>
                    {questions.length > 1 && (
                      <button onClick={() => removeQuestion(i)} className="w-5 h-5 rounded flex items-center justify-center hover:bg-red-500/10 hover:text-red-400 text-muted-foreground transition-colors flex-shrink-0">
                        <Icon name="X" size={10} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addQuestion}
                  className="w-full mt-2 px-3 py-2 rounded-lg border border-dashed border-border text-xs text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <Icon name="Plus" size={12} />
                  Добавить
                </button>
              </div>

              {/* Редактор вопроса */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Текст вопроса {activeQ + 1}</label>
                  <textarea
                    value={currentQ.text}
                    onChange={e => updateQuestion(e.target.value)}
                    placeholder="Введите вопрос..."
                    rows={3}
                    className={inputCls + " resize-none"}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Варианты ответов <span className="text-xs">(отметьте правильный)</span></label>
                  <div className="space-y-2">
                    {currentQ.options.map(opt => (
                      <div key={opt.id} className="flex items-center gap-2">
                        <button
                          onClick={() => setCorrect(opt.id)}
                          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                            opt.correct ? "border-emerald-400 bg-emerald-400/20" : "border-border hover:border-primary/50"
                          }`}
                        >
                          {opt.correct && <div className="w-2 h-2 rounded-full bg-emerald-400" />}
                        </button>
                        <input
                          value={opt.text}
                          onChange={e => updateOption(opt.id, e.target.value)}
                          placeholder={`Вариант ${opt.id}`}
                          className={inputCls}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Футер */}
        {step !== "done" && (
          <div className="flex items-center justify-between p-6 border-t border-border flex-shrink-0">
            <Button
              variant="outline"
              onClick={() => step === "questions" ? setStep("info") : onClose()}
              className="border-border text-foreground hover:bg-secondary gap-2"
            >
              <Icon name="ArrowLeft" size={14} />
              {step === "questions" ? "Назад" : "Отмена"}
            </Button>
            {step === "info" ? (
              <Button
                onClick={() => setStep("questions")}
                disabled={!title.trim() || !subject.trim()}
                className="bg-primary text-white hover:bg-primary/90 gap-2 disabled:opacity-40"
              >
                Далее: вопросы
                <Icon name="ArrowRight" size={14} />
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                disabled={questions.some(q => !q.text.trim())}
                className="bg-emerald-500 text-white hover:bg-emerald-600 gap-2 disabled:opacity-40"
              >
                <Icon name="Save" size={14} />
                Сохранить тест
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Профиль ─────────────────────────────────────────────────────────────────

function ProfileSection() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const [createdTests, setCreatedTests] = useState<CreatedTest[]>([]);
  const [notifications, setNotifications] = useState([
    { id: 1, label: "Новые тесты", enabled: true },
    { id: 2, label: "Результаты проверки", enabled: true },
    { id: 3, label: "Напоминания о тестах", enabled: false },
  ]);

  const [profile, setProfile] = useState<ProfileData>({
    firstName: "Александр",
    lastName: "Петров",
    middleName: "Иванович",
    email: "a.petrov@mail.ru",
    phone: "+7 (999) 123-45-67",
    organization: "НИУ ВШЭ",
    specialty: "Информационные технологии",
    role: "teacher",
  });

  const [draft, setDraft] = useState<ProfileData>({ ...profile });

  const handleSaveProfile = () => {
    setProfile({ ...draft });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleNotification = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
  };

  const inputCls = "w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all";

  const fullName = `${profile.lastName} ${profile.firstName} ${profile.middleName}`.trim();

  return (
    <div className="space-y-6">
      {showBuilder && (
        <TestBuilder
          onClose={() => setShowBuilder(false)}
          onSave={(test) => {
            setCreatedTests(prev => [...prev, test]);
            setShowBuilder(false);
          }}
        />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground mb-1">Профиль</h1>
          <p className="text-muted-foreground">Личные данные и настройки</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 animate-fade-in">
            <Icon name="CheckCircle" size={14} className="text-emerald-400" />
            <span className="text-sm text-emerald-400">Данные сохранены</span>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Карточка */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-4">
              <Icon name="User" size={36} className="text-primary" />
            </div>
            <h2 className="font-bold text-foreground text-lg leading-tight">{fullName || "—"}</h2>
            <p className="text-muted-foreground text-sm mb-4">{profile.email}</p>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className={profile.role === "teacher" ? "bg-amber-500/10 text-amber-400 border-amber-500/20 border" : "bg-primary/10 text-primary border-primary/20 border"}>
                {profile.role === "teacher" ? "Учитель" : "Студент"}
              </Badge>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 border">Активен</Badge>
            </div>
            <Button
              onClick={() => { setDraft({ ...profile }); setEditing(!editing); }}
              className={`w-full mt-6 gap-2 ${editing ? "bg-secondary text-foreground hover:bg-secondary/80" : "bg-primary text-white hover:bg-primary/90"}`}
            >
              <Icon name={editing ? "X" : "Edit2"} size={14} />
              {editing ? "Отменить" : "Редактировать"}
            </Button>
          </div>

          {/* Кнопка учителя */}
          {profile.role === "teacher" && (
            <div className="bg-card border border-amber-500/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="GraduationCap" size={16} className="text-amber-400" />
                <span className="text-sm font-semibold text-foreground">Инструменты учителя</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Создайте тест для своих учеников с вопросами и вариантами ответов</p>
              <Button
                onClick={() => setShowBuilder(true)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white gap-2 font-semibold"
              >
                <Icon name="PenLine" size={16} />
                Создать тест
              </Button>
              {createdTests.length > 0 && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Создано тестов: {createdTests.length}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Данные */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Icon name="User" size={16} className="text-primary" />
                Личные данные
              </h3>
              {editing && (
                <span className="text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-2 py-0.5">
                  Режим редактирования
                </span>
              )}
            </div>

            {editing ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Фамилия</label>
                    <input value={draft.lastName} onChange={e => setDraft(d => ({ ...d, lastName: e.target.value }))} placeholder="Фамилия" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Имя</label>
                    <input value={draft.firstName} onChange={e => setDraft(d => ({ ...d, firstName: e.target.value }))} placeholder="Имя" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Отчество</label>
                    <input value={draft.middleName} onChange={e => setDraft(d => ({ ...d, middleName: e.target.value }))} placeholder="Отчество" className={inputCls} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Email</label>
                    <input value={draft.email} onChange={e => setDraft(d => ({ ...d, email: e.target.value }))} placeholder="email@example.com" type="email" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Телефон</label>
                    <input value={draft.phone} onChange={e => setDraft(d => ({ ...d, phone: e.target.value }))} placeholder="+7 (999) 000-00-00" className={inputCls} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Организация</label>
                    <input value={draft.organization} onChange={e => setDraft(d => ({ ...d, organization: e.target.value }))} placeholder="Организация" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Специальность</label>
                    <input value={draft.specialty} onChange={e => setDraft(d => ({ ...d, specialty: e.target.value }))} placeholder="Специальность" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Роль</label>
                  <select value={draft.role} onChange={e => setDraft(d => ({ ...d, role: e.target.value as "student" | "teacher" }))} className={inputCls}>
                    <option value="student">Студент / Ученик</option>
                    <option value="teacher">Учитель / Преподаватель</option>
                  </select>
                </div>
                <Button onClick={handleSaveProfile} className="bg-primary text-white hover:bg-primary/90 gap-2 mt-1">
                  <Icon name="Save" size={14} />
                  Сохранить изменения
                </Button>
              </div>
            ) : (
              <div className="space-y-1">
                {[
                  { label: "Фамилия", value: profile.lastName },
                  { label: "Имя", value: profile.firstName },
                  { label: "Отчество", value: profile.middleName },
                  { label: "Email", value: profile.email },
                  { label: "Телефон", value: profile.phone },
                  { label: "Организация", value: profile.organization },
                  { label: "Специальность", value: profile.specialty },
                  { label: "Роль", value: profile.role === "teacher" ? "Учитель / Преподаватель" : "Студент / Ученик" },
                ].map(field => (
                  <div key={field.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">{field.label}</span>
                    <span className="text-sm text-foreground font-medium">{field.value || "—"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Уведомления */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Icon name="Bell" size={16} className="text-primary" />
              Уведомления
            </h3>
            <div className="space-y-3">
              {notifications.map(n => (
                <div key={n.id} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{n.label}</span>
                  <button
                    onClick={() => toggleNotification(n.id)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${n.enabled ? "bg-primary" : "bg-muted"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${n.enabled ? "right-0.5" : "left-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Созданные тесты */}
          {createdTests.length > 0 && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Icon name="FileText" size={16} className="text-primary" />
                Мои тесты ({createdTests.length})
              </h3>
              <div className="space-y-2">
                {createdTests.map(t => (
                  <div key={t.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{t.title}</p>
                      <p className="text-xs text-muted-foreground">{t.subject} · {t.questions.length} вопр. · {t.timeLimit} мин</p>
                    </div>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-2 py-0.5">Опубликован</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground mb-1">Контакты</h1>
        <p className="text-muted-foreground">Связаться с поддержкой или задать вопрос</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-bold text-foreground mb-5 flex items-center gap-2">
            <Icon name="MessageSquare" size={16} className="text-primary" />
            Написать нам
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-1.5">Тема обращения</label>
              <input
                type="text"
                placeholder="Опишите тему кратко..."
                className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1.5">Ваш Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1.5">Сообщение</label>
              <textarea
                rows={5}
                placeholder="Подробно опишите ваш вопрос..."
                className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
              />
            </div>
            <Button className="w-full bg-primary text-white hover:bg-primary/90 gap-2">
              <Icon name="Send" size={16} />
              Отправить сообщение
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-bold text-foreground mb-5">Контактные данные</h2>
            <div className="space-y-4">
              {[
                { icon: "Mail", label: "Email", value: "support@testpro.ru" },
                { icon: "Phone", label: "Телефон", value: "+7 (800) 123-45-67" },
                { icon: "MapPin", label: "Адрес", value: "Москва, ул. Ленина, 1" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Пт, 9:00–18:00" },
              ].map(c => (
                <div key={c.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} size={15} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                    <p className="text-sm text-foreground font-medium">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-bold text-foreground mb-4">Частые вопросы</h2>
            <div className="space-y-1">
              {[
                "Как получить сертификат?",
                "Можно ли пересдать тест?",
                "Как изменить личные данные?",
              ].map(q => (
                <button
                  key={q}
                  className="w-full text-left flex items-center justify-between py-2.5 border-b border-border last:border-0 text-sm text-foreground hover:text-primary transition-colors group"
                >
                  <span>{q}</span>
                  <Icon name="ChevronRight" size={14} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [active, setActive] = useState<Section>("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderSection = () => {
    switch (active) {
      case "home": return <HomeSection onNavigate={setActive} />;
      case "tests": return <TestsSection />;
      case "results": return <ResultsSection />;
      case "stats": return <StatsSection />;
      case "profile": return <ProfileSection />;
      case "contacts": return <ContactsSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          <button onClick={() => setActive("home")} className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="GraduationCap" size={18} className="text-white" />
            </div>
            <span className="font-black text-foreground text-lg tracking-tight">
              Test<span className="text-primary">Pro</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  active === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="relative w-9 h-9 rounded-lg hover:bg-secondary transition-colors items-center justify-center hidden md:flex">
              <Icon name="Bell" size={18} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
            </button>
            <button
              onClick={() => setActive("profile")}
              className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 items-center justify-center hover:bg-primary/20 transition-colors hidden md:flex"
            >
              <Icon name="User" size={16} className="text-primary" />
            </button>
            <button
              className="md:hidden w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Icon name={mobileOpen ? "X" : "Menu"} size={18} className="text-foreground" />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background/95 px-4 py-3 animate-fade-in grid grid-cols-3 gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { setActive(item.id); setMobileOpen(false); }}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl text-xs font-medium transition-all ${
                  active === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon name={item.icon} size={18} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8">
        {renderSection()}
      </main>

      <footer className="border-t border-border py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Icon name="GraduationCap" size={13} className="text-white" />
            </div>
            <span className="text-sm font-bold text-foreground">Test<span className="text-primary">Pro</span></span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © 2026 TestPro. Профессиональная платформа тестирования
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <button className="hover:text-foreground transition-colors">Политика конфиденциальности</button>
            <button className="hover:text-foreground transition-colors">Условия использования</button>
          </div>
        </div>
      </footer>
    </div>
  );
}