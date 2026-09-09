import cn from "../../utils/cn.js";

const Card = ({ className = "", children, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-800 bg-slate-900/50 shadow-sm backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
