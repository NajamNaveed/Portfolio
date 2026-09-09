import { motion } from "framer-motion";
import Card from "../ui/Card.jsx";
import Skeleton from "../ui/Skeleton.jsx";

const StatCard = ({ label, value, icon: Icon, isLoading, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05, ease: "easeOut" }}
    >
      <Card className="flex items-center gap-4 p-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600/15 text-indigo-400">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
          {isLoading ? (
            <Skeleton className="mt-1.5 h-6 w-12" />
          ) : (
            <p className="mt-0.5 text-2xl font-semibold text-slate-100">{value}</p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;
