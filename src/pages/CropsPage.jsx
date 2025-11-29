import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Wheat, Loader2, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cropsAPI } from "../services/api";
import useOfflineStore from "../stores/offlineStore";
import useTranslation from "../hooks/useTranslation";
import Button from "../components/common/Button";
import CropBatchCard from "../components/crops/CropBatchCard";
import Modal from "../components/common/Modal";

export const CropsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cachedData, setCachedData, removeFromCache } = useOfflineStore();

  const [loading, setLoading] = useState(true);
  const [batches, setBatches] = useState([]);
  const [filter, setFilter] = useState("all");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBatches();
  }, [filter]);

  const fetchBatches = async () => {
    try {
      let response;
      if (filter === "active") {
        response = await cropsAPI.getActive();
      } else if (filter === "completed") {
        response = await cropsAPI.getCompleted();
      } else {
        response = await cropsAPI.getAll();
      }

      const data = response.data.results || response.data;
      setBatches(data);
      setCachedData("batches", data);
    } catch (error) {
      if (cachedData.batches) {
        setBatches(cachedData.batches);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setDeleting(true);
    try {
      await cropsAPI.delete(deleteId);
      setBatches(batches.filter((b) => b.id !== deleteId));
      removeFromCache("batches", deleteId);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const filteredBatches = batches.filter((batch) => {
    if (filter === "active") return batch.status === "ACTIVE";
    if (filter === "completed") return batch.status === "COMPLETED";
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {t("crops.title")}
          </h1>
          <p className="text-gray-600">{t("dashboard.welcome_message")}</p>
        </div>

        <Button onClick={() => navigate("/crops/new")} icon={Plus}>
          {t("crops.addBatch")}
        </Button>
      </motion.div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {["all", "active", "completed"].map((f) => (
          <motion.button
            key={f}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              filter === f
                ? "bg-emerald-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f === "all" ? "All Batches" : t(`crops.${f}`)}
          </motion.button>
        ))}
      </div>

      {filteredBatches.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBatches.map((batch, index) => (
            <motion.div
              key={batch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <CropBatchCard batch={batch} onDelete={(id) => setDeleteId(id)} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-12 shadow-lg text-center"
        >
          <Wheat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t("crops.noBatches")}
          </h3>
          <p className="text-gray-500 mb-6">{t("start_adding_crops")},</p>
          <Button onClick={() => navigate("/crops/new")} icon={Plus}>
            {t("crops.addBatch")}
          </Button>
        </motion.div>
      )}

      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Batch"
      >
        <div className="text-center py-4">
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this crop batch? This action cannot
            be undone.
          </p>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setDeleteId(null)}
            >
              {t("common.cancel")}
            </Button>
            <Button
              variant="danger"
              fullWidth
              onClick={handleDelete}
              loading={deleting}
            >
              {t("common.delete")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CropsPage;
