
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { Moon, User, Book, LogOut } from 'lucide-react';

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/journal', label: 'Journal', icon: Book },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = typeof item.icon === 'string' ? null : item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              className={`flex flex-col items-center p-2 h-auto ${
                isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => navigate(item.path)}
            >
              {Icon ? (
                <Icon className="h-5 w-5 mb-1" />
              ) : (
                <span className="text-lg mb-1">{item.icon}</span>
              )}
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
        
        <Button
          variant="ghost"
          className="flex flex-col items-center p-2 h-auto text-gray-600 dark:text-gray-400"
          onClick={toggleTheme}
        >
          <Moon className="h-5 w-5 mb-1" />
          <span className="text-xs">Theme</span>
        </Button>
        
        <Button
          variant="ghost"
          className="flex flex-col items-center p-2 h-auto text-gray-600 dark:text-gray-400"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mb-1" />
          <span className="text-xs">Logout</span>
        </Button>
      </div>
    </nav>
  );
};
