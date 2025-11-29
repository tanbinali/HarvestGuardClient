import { useState } from "react";
import { motion } from "framer-motion";
import { Wheat, Scale, Calendar, MapPin, Package, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cropsAPI } from "../../services/api";
import useOfflineStore from "../../stores/offlineStore";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import useTranslation from "../../hooks/useTranslation";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

export const CropBatchForm = ({ initialData, onSuccess }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isOnline } = useOnlineStatus();
  const { addPendingAction, addToCache } = useOfflineStore();

  const [formData, setFormData] = useState({
    crop_type: initialData?.crop_type || "PADDY",
    estimated_weight: initialData?.estimated_weight || "",
    harvest_date:
      initialData?.harvest_date || new Date().toISOString().split("T")[0],
    storage_location: initialData?.storage_location || "",
    storage_type: initialData?.storage_type || "",
    notes: initialData?.notes || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cropTypes = [{ value: "PADDY", label: t("crops.types.PADDY") }];

  const storageTypes = [
    { value: "JUTE_BAG", label: t("crops.storage.JUTE_BAG") },
    { value: "SILO", label: t("crops.storage.SILO") },
    { value: "OPEN_AREA", label: t("crops.storage.OPEN_AREA") },
  ];

  const locations = [
    { value: "DHAKA", label: t("crops.locations.DHAKA") },
    { value: "CHITTAGONG", label: t("crops.locations.CHITTAGONG") },
    { value: "SYLHET", label: t("crops.locations.SYLHET") },
    { value: "RAJSHAHI", label: t("crops.locations.RAJSHAHI") },
    { value: "KHULNA", label: t("crops.locations.KHULNA") },
    { value: "BARISHAL", label: t("crops.locations.BARISHAL") },
    { value: "RANGPUR", label: t("crops.locations.RANGPUR") },
    { value: "MYMENSINGH", label: t("crops.locations.MYMENSINGH") },
  ];

  // Handles normal text/number/date inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const batchData = {
      ...formData,
      estimated_weight: parseFloat(formData.estimated_weight),
    };

    try {
      if (isOnline) {
        const response = await cropsAPI.create(batchData);
        onSuccess?.(response.data);
        navigate("/crops");
      } else {
        const tempBatch = {
          ...batchData,
          id: `temp-${Date.now()}`,
          status: "ACTIVE",
          created_at: new Date().toISOString(),
          _isOffline: true,
        };
        addToCache("batches", tempBatch);
        addPendingAction({ type: "CREATE_BATCH", data: batchData });
        navigate("/crops");
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to create batch. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
        >
          {error}
        </motion.div>
      )}

      <Select
        label={t("crops.cropType")}
        name="crop_type"
        value={formData.crop_type}
        onChange={handleChange}
        options={cropTypes}
        icon={Wheat}
        required
      />

      <Input
        label={t("crops.weight")}
        type="number"
        name="estimated_weight"
        placeholder={t("select_weight")}
        value={formData.estimated_weight}
        onChange={handleChange}
        icon={Scale}
        required
        min="0"
        step="0.1"
      />

      <Input
        label={t("crops.harvestDate")}
        type="date"
        name="harvest_date"
        value={formData.harvest_date}
        onChange={handleChange}
        icon={Calendar}
        required
      />

      <Select
        label={t("crops.storageLocation")}
        name="storage_location"
        value={formData.storage_location}
        onChange={handleChange}
        options={locations}
        placeholder={t("select_location")}
        icon={MapPin}
        required
      />

      <Select
        label={t("crops.storageType")}
        name="storage_type"
        value={formData.storage_type}
        onChange={handleChange}
        options={storageTypes}
        placeholder={t("select_storage")}
        icon={Package}
        required
      />

      <Input
        label={t("crops.notes")}
        type="text"
        name="notes"
        placeholder={t("select_note")}
        value={formData.notes}
        onChange={handleChange}
      />

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="secondary"
          fullWidth
          onClick={() => navigate("/crops")}
        >
          {t("common.cancel")}
        </Button>
        <Button type="submit" fullWidth loading={loading}>
          {t("common.save")}
        </Button>
      </div>
    </motion.form>
  );
};

export default CropBatchForm;
