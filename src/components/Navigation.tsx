
import React from 'react';
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
    { path: '/', label: 'Home', icon: '🏠', isString: true },
    { path: '/journal', label: 'Journal', icon: Book, isString: false },
    { path: '/profile', label: 'Profile', icon: User, isString: false }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderIcon = (item: typeof navItems[0]) => {
    if (item.isString) {
      return <span className="text-lg mb-1">{item.icon as string}</span>;
    } else {
      const IconComponent = item.icon as React.ComponentType<{ className?: string }>;
      return <IconComponent className="h-5 w-5 mb-1" />;
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
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
              {renderIcon(item)}
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
