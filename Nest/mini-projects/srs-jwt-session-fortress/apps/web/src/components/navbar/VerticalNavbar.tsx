import { useLocation, Link } from 'react-router-dom';
import { Inbox, Sparkles, CalendarDays, SquareStack } from 'lucide-react';

export default function VerticalNavbar() {
  const location = useLocation();

  const navItems = [
    { path: '/inbox', label: 'Inbox', icon: Inbox },
    { path: '/generate-cards', label: 'Generate', icon: Sparkles },
    { path: '/review/cards-inbox', label: 'Card Flow', icon: CalendarDays },
    { path: '/review/cards-today', label: 'Daily', icon: SquareStack },
  ];

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 bg-neutral-900 p-2.5 rounded-[2.5rem] flex flex-col gap-2 shadow-xl z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex flex-col items-center justify-center w-[72px] h-[88px] rounded-3xl transition-all duration-200 active:scale-[0.98]
              ${
                isActive
                  ? 'bg-[#f3c048] text-neutral-900 shadow-sm'
                  : 'bg-[#f4efe6] text-neutral-900 hover:bg-white hover:shadow-sm'
              }
            `}
          >
            <Icon 
              className={`w-7 h-7 mb-1.5 ${isActive ? 'text-neutral-900' : 'text-neutral-700'}`} 
              strokeWidth={1.5} 
            />
            <span className="text-[11px] font-bold text-center leading-tight tracking-tight uppercase">
              {item.label.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}