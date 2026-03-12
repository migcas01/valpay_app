import { Link } from "react-router";

interface NavLogoProps {
  to?: string;
}

export function NavLogo({ to = "/" }: NavLogoProps) {
  return (
    <Link to={to} className="flex items-center gap-2 group cursor-pointer">
      <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-amber-600 transition-colors">
        <span className="text-white font-bold text-xl leading-none">V</span>
      </div>
      <span className="text-xl font-bold text-gray-900 tracking-tight">Valpay</span>
    </Link>
  );
}
