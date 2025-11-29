import { motion } from "framer-motion";
import {
  Wheat,
  MapPin,
  Calendar,
  Package,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useTranslation from "../../hooks/useTranslation";

export const CropBatchCard = ({ batch, onDelete }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const statusColors = {
    ACTIVE: "bg-green-100 text-green-700",
    COMPLETED: "bg-gray-100 text-gray-700",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
            <Wheat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">
              {t(`crops.types.${batch.crop_type}`)}
            </h3>
            <p className="text-sm text-gray-500">{batch.estimated_weight} kg</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusColors[batch.status]
          }`}
        >
          {t(`crops.${batch.status.toLowerCase()}`)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{t(`crops.locations.${batch.storage_location}`)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Package className="w-4 h-4" />
          <span>{t(`crops.storage.${batch.storage_type}`)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{new Date(batch.harvest_date).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(batch.id);
          }}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
        {/* <motion.button
          type="button"
          whileHover={{ x: 5 }}
          onClick={() => navigate(`/crops/${batch.id}`)}
          className="flex items-center gap-2 text-emerald-600 font-semibold text-sm hover:text-emerald-700"
        >
          View Details
          <ChevronRight className="w-4 h-4" />
        </motion.button> */}
      </div>
    </motion.div>
  );
};

export default CropBatchCard;
