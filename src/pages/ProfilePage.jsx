import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Globe,
  LogOut,
  Edit2,
  Loader2,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import useAuthStore from "../stores/authStore";
import useTranslation from "../hooks/useTranslation";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Card from "../components/common/Card";

export const ProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout, updateUser, setLanguage } = useAuthStore();

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone_number: user?.phone_number || "",
    preferred_language: user?.preferred_language || "EN",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await authAPI.updateProfile(formData);
      updateUser(formData);
      setLanguage(formData.preferred_language);
      setEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {t("profile.title")}
        </h1>
      </motion.div>

      <Card className="mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-linear-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.first_name?.[0]}
            {user?.last_name?.[0]}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {user?.first_name} {user?.last_name}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {!editing ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">{t("auth.email")}</p>
                <p className="font-medium text-gray-900">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">{t("auth.phone")}</p>
                <p className="font-medium text-gray-900">
                  {user?.phone_number}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Globe className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">{t("profile.language")}</p>
                <p className="font-medium text-gray-900">
                  {user?.preferred_language === "EN" ? "English" : "বাংলা"}
                </p>
              </div>
            </div>

            <Button
              variant="secondary"
              fullWidth
              icon={Edit2}
              onClick={() => setEditing(true)}
            >
              {t("profile.editProfile")}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={t("auth.firstName")}
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                icon={User}
              />
              <Input
                label={t("auth.lastName")}
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>

            <Input
              label={t("auth.phone")}
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              icon={Phone}
            />

            <Select
              label={t("profile.language")}
              name="preferred_language"
              value={formData.preferred_language}
              onChange={handleChange}
              options={[
                { value: "EN", label: "English" },
                { value: "BN", label: "বাংলা (Bangla)" },
              ]}
              icon={Globe}
            />

            <div className="flex gap-4 pt-4">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setEditing(false)}
              >
                {t("common.cancel")}
              </Button>
              <Button
                fullWidth
                onClick={handleSave}
                loading={loading}
                icon={loading ? Loader2 : Save}
              >
                {t("common.save")}
              </Button>
            </div>
          </div>
        )}
      </Card>

      <Card>
        <Button variant="danger" fullWidth icon={LogOut} onClick={handleLogout}>
          {t("profile.logout")}
        </Button>
      </Card>
    </div>
  );
};

export default ProfilePage;
