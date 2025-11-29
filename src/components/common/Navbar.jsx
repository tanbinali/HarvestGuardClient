import { motion } from "framer-motion";
import {
  Home,
  LayoutDashboard,
  Wheat,
  Award,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../../stores/authStore";
import useTranslation from "../../hooks/useTranslation";
import { LanguageToggleDark } from "./LanguageToggle";

const navItems = [
  { key: "dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { key: "crops", icon: Wheat, path: "/crops" },
  { key: "achievements", icon: Award, path: "/achievements" },
  { key: "profile", icon: User, path: "/profile" },
];

export const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Wheat className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 hidden sm:block">
                {t("app.name")}
              </span>
            </NavLink>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-2 px-4 py-2 rounded-xl transition-all
                    ${
                      isActive
                        ? "bg-emerald-100 text-emerald-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{t(`nav.${item.key}`)}</span>
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <LanguageToggleDark />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-30 bg-white pt-20 md:hidden"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-4 rounded-xl transition-all
                    ${
                      isActive
                        ? "bg-emerald-100 text-emerald-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-lg">{t(`nav.${item.key}`)}</span>
                </NavLink>
              ))}

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-4 w-full text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut className="w-6 h-6" />
                <span className="text-lg">{t("profile.logout")}</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
