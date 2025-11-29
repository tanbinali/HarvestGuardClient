import { motion } from "framer-motion";
import { Bug, CloudRain, Thermometer, Package } from "lucide-react";
import useTranslation from "../../hooks/useTranslation";

const causes = [
  { key: "pest", icon: Bug, color: "bg-red-500", lightColor: "bg-red-100" },
  {
    key: "disease",
    icon: Thermometer,
    color: "bg-orange-500",
    lightColor: "bg-orange-100",
  },
  {
    key: "weather",
    icon: CloudRain,
    color: "bg-blue-500",
    lightColor: "bg-blue-100",
  },
  {
    key: "storage",
    icon: Package,
    color: "bg-purple-500",
    lightColor: "bg-purple-100",
  },
];

export const ProblemSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-emerald-900 to-transparent opacity-5" />

      <div className="container mx-auto px-4">
        {/* SECTION TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("landing.problem.title")}
          </h2>
          <p className="text-lg text-gray-600">
            {t("landing.problem.description")}
          </p>
        </motion.div>

        {/* PROBLEM CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {causes.map((cause, index) => (
            <motion.div
              key={cause.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 ${cause.lightColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <cause.icon
                    className={`w-8 h-8 ${cause.color.replace("bg-", "text-")}`}
                  />
                </motion.div>

                <h3 className="font-semibold text-gray-900">
                  {t(`landing.problem.causes.${cause.key}`)}
                </h3>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                className={`absolute -top-2 -right-2 w-6 h-6 ${cause.color} rounded-full flex items-center justify-center`}
              >
                <span className="text-white text-xs font-bold">!</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* STAT BLOCK */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-linear-to-r from-red-500 to-orange-500 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10">
            <motion.p
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              {t("landing.problem.statValue")}
            </motion.p>

            <p className="text-xl md:text-2xl opacity-90">
              {t("landing.problem.statText")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
