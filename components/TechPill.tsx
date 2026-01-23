const TechPill = ({ icon, label }) => {
  return (
    <div
      className="
        flex items-center gap-2
        px-3 py-1.5
        rounded-xl
        bg-slate-800/70
        hover:bg-slate-700
        transition-all
      "
    >
      <div className="h-5 w-5 flex items-center justify-center text-sky-400">
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );
};


export default TechPill;
