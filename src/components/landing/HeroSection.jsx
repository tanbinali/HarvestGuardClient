import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useTranslation from "../../hooks/useTranslation";
import Button from "../common/Button";
import { TrendingDown, Shield, DollarSign, Leaf } from "lucide-react";

const FloatingLeaf = ({ delay, x, duration }) => (
  <motion.div
    initial={{ y: -100, x, opacity: 0, rotate: 0 }}
    animate={{
      y: [null, 800],
      opacity: [0, 1, 1, 0],
      rotate: [0, 360],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute text-emerald-300/30"
  >
    <Leaf className="w-6 h-6" />
  </motion.div>
);

export const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const stats = [
    {
      icon: TrendingDown,
      value: t("landing.hero.stats.loss"),
      color: "text-red-400",
    },
    {
      icon: Shield,
      value: t("landing.hero.stats.farmers"),
      color: "text-amber-400",
    },
    {
      icon: DollarSign,
      value: t("landing.hero.stats.value"),
      color: "text-emerald-400",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-emerald-900 via-green-800 to-emerald-900">
      {[...Array(15)].map((_, i) => (
        <FloatingLeaf
          key={i}
          delay={i * 0.8}
          x={`${Math.random() * 100}%`}
          duration={10 + Math.random() * 10}
        />
      ))}

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {t("app.tagline")}
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {t("landing.hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
        >
          {t("landing.hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            size="xl"
            onClick={() => navigate("/register")}
            className="bg-white text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            {t("landing.hero.cta")}
          </Button>
          <Button
            variant="outline"
            size="xl"
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-emerald-700 transition-all"
          >
            {t("auth.login")}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <p className="text-white font-bold text-lg">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
