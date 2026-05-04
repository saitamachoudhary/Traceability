export default function Footer() {
  return (
    <footer className="mt-auto py-6 px-8 bg-surface">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[12px] font-bold text-text-secondary uppercase tracking-wider">
          <span className="text-text-primary">ANDRITZ</span> <span className="font-medium text-text-secondary/70">© 2024 Industrial Engineering Solutions</span>
        </div>
        <div className="flex gap-8 text-[12px] font-bold text-text-secondary uppercase tracking-wider">
          <a href="#" className="hover:text-primary transition-colors">Internal Support</a>
          <a href="#" className="hover:text-primary transition-colors">System Status</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
