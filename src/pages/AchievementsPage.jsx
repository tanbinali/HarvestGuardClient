import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Loader2 } from "lucide-react";
import { achievementsAPI } from "../services/api";
import useOfflineStore from "../stores/offlineStore";
import useTranslation from "../hooks/useTranslation";
import AchievementCard from "../components/achievements/AchievementCard";

const allBadges = [
  "FIRST_HARVEST",
  "RISK_MITIGATOR",
  "SCANNER_MASTER",
  "WEATHER_ANALYST",
  "DATA_KEEPER",
];

export const AchievementsPage = () => {
  const { t } = useTranslation();
  const { cachedData, setCachedData } = useOfflineStore();

  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await achievementsAPI.getAll();
        const data = response.data.results || response.data;
        setAchievements(data);
        setCachedData("achievements", data);
      } catch (error) {
        if (cachedData.achievements) {
          setAchievements(cachedData.achievements);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  const earnedBadges = achievements.map((a) => a.badge_name);
  const unlockedAchievements = allBadges.map((badge) => {
    const earned = achievements.find((a) => a.badge_name === badge);
    return earned || { badge_name: badge, earned_at: null };
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {t("achievements.title")}
        </h1>
        <p className="text-gray-600">
          Earn badges by protecting your harvest and using HarvestGuard features
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-linear-to-r from-emerald-500 to-green-500 rounded-2xl p-6 md:p-8 text-white mb-8"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <p className="text-3xl font-bold">
              {earnedBadges.length} / {allBadges.length}
            </p>
            <p className="text-white/80">Achievements Unlocked</p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {unlockedAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.badge_name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AchievementCard
              achievement={achievement}
              earned={earnedBadges.includes(achievement.badge_name)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
