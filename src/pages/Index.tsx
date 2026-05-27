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

function ProfileSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground mb-1">Профиль</h1>
        <p className="text-muted-foreground">Личные данные и настройки</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-4">
              <Icon name="User" size={36} className="text-primary" />
            </div>
            <h2 className="font-bold text-foreground text-lg">Александр Петров</h2>
            <p className="text-muted-foreground text-sm mb-4">a.petrov@mail.ru</p>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-primary/10 text-primary border-primary/20 border">Студент</Badge>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 border">Активен</Badge>
            </div>
            <Button className="w-full mt-6 bg-secondary text-foreground hover:bg-secondary/80 gap-2">
              <Icon name="Edit2" size={14} />
              Редактировать
            </Button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Icon name="User" size={16} className="text-primary" />
              Личные данные
            </h3>
            <div className="space-y-3">
              {[
                { label: "Имя", value: "Александр" },
                { label: "Фамилия", value: "Петров" },
                { label: "Email", value: "a.petrov@mail.ru" },
                { label: "Организация", value: "НИУ ВШЭ" },
                { label: "Специальность", value: "Информационные технологии" },
              ].map(field => (
                <div key={field.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{field.label}</span>
                  <span className="text-sm text-foreground font-medium">{field.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Icon name="Bell" size={16} className="text-primary" />
              Уведомления
            </h3>
            <div className="space-y-3">
              {[
                { label: "Новые тесты", enabled: true },
                { label: "Результаты проверки", enabled: true },
                { label: "Напоминания о тестах", enabled: false },
              ].map(n => (
                <div key={n.label} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{n.label}</span>
                  <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${n.enabled ? "bg-primary" : "bg-muted"}`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${n.enabled ? "right-0.5" : "left-0.5"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
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
