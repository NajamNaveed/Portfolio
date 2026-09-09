import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import PageHeader from "../ui/PageHeader.jsx";
import EmptyState from "../ui/EmptyState.jsx";

const CmsPlaceholder = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <PageHeader title={title} description="Content management" />
      <EmptyState
        icon={Construction}
        title={`${title} management is coming soon`}
        description={description}
      />
    </motion.div>
  );
};

export default CmsPlaceholder;
