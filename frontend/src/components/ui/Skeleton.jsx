import cn from "../../utils/cn.js";

const Skeleton = ({ className = "" }) => {
  return <div className={cn("animate-pulse rounded-lg bg-slate-800/70 motion-reduce:animate-none", className)} />;
};

export default Skeleton;
