import { motion } from "framer-motion";
import { Award, Wheat, Shield, Scan, Cloud, Database } from "lucide-react";
import useTranslation from "../../hooks/useTranslation";

const badgeIcons = {
  FIRST_HARVEST: Wheat,
  RISK_MITIGATOR: Shield,
  SCANNER_MASTER: Scan,
  WEATHER_ANALYST: Cloud,
  DATA_KEEPER: Database,
};

const badgeColors = {
  FIRST_HARVEST: "from-amber-400 to-amber-600",
  RISK_MITIGATOR: "from-emerald-400 to-emerald-600",
  SCANNER_MASTER: "from-blue-400 to-blue-600",
  WEATHER_ANALYST: "from-cyan-400 to-cyan-600",
  DATA_KEEPER: "from-purple-400 to-purple-600",
};

export const AchievementCard = ({ achievement, earned = true }) => {
  const { t } = useTranslation();
  const Icon = badgeIcons[achievement.badge_name] || Award;
  const gradient =
    badgeColors[achievement.badge_name] || "from-gray-400 to-gray-600";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`relative bg-white rounded-2xl p-6 shadow-lg ${
        !earned ? "opacity-50 grayscale" : ""
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          animate={
            earned
              ? {
                  boxShadow: [
                    "0 0 0 0 rgba(16, 185, 129, 0.4)",
                    "0 0 0 15px rgba(16, 185, 129, 0)",
                  ],
                }
              : {}
          }
          transition={{ duration: 1.5, repeat: earned ? Infinity : 0 }}
          className={`w-20 h-20 bg-linear-to-br ${gradient} rounded-full flex items-center justify-center mb-4 shadow-lg`}
        >
          <Icon className="w-10 h-10 text-white" />
        </motion.div>

        <h3 className="font-bold text-gray-900 text-lg mb-2">
          {t(`achievements.badges.${achievement.badge_name}.name`)}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {t(`achievements.badges.${achievement.badge_name}.desc`)}
        </p>

        {earned && achievement.earned_at && (
          <p className="text-xs text-gray-400">
            {t("achievements.earnedOn")}{" "}
            {new Date(achievement.earned_at).toLocaleDateString()}
          </p>
        )}
      </div>

      {earned && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AchievementCard;
