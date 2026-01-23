const TechIcons = ({ icon, label }:{icon:React.ReactNode, label:string }) => {
  console.log(icon)
  return (
    <div
      className="
        flex items-center gap-2
        px-3 py-1.5
        rounded-xl
        bg-slate-800/70
        hover:bg-slate-700
        hover:text-sky-400
        transition-all
        hover:cursor-pointer
      "
    >
      <div className="h-5 w-5 flex items-center justify-center text-sky-400">
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );
};


export default TechIcons;
