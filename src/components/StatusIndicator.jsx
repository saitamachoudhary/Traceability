export default function StatusIndicator() {
  return (
    <div className="flex justify-center mt-16 mb-16">
      <div className="inline-flex items-center gap-3 bg-surface/80 backdrop-blur-sm px-6 py-2.5 rounded-full border border-border-outline/50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
          </div>
          <span className="text-[13px] font-semibold text-text-primary">All systems operational</span>
        </div>
        <div className="w-px h-3 bg-border-outline mx-1"></div>
        <span className="text-[13px] font-medium text-text-secondary">Last Sync: 10:42 AM</span>
      </div>
    </div>
  );
}
