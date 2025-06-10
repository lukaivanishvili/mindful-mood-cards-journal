
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load saved credentials on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('moodTracker_savedEmail');
    const savedPassword = localStorage.getItem('moodTracker_savedPassword');
    const wasRemembered = localStorage.getItem('moodTracker_rememberMe') === 'true';
    
    if (wasRemembered && savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
    if (wasRemembered && savedPassword) {
      setPassword(savedPassword);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Save credentials if remember me is checked
    if (rememberMe) {
      localStorage.setItem('moodTracker_savedEmail', email);
      localStorage.setItem('moodTracker_savedPassword', password);
      localStorage.setItem('moodTracker_rememberMe', 'true');
    } else {
      localStorage.removeItem('moodTracker_savedEmail');
      localStorage.removeItem('moodTracker_savedPassword');
      localStorage.removeItem('moodTracker_rememberMe');
    }

    const success = await login(email, password);
    if (success) {
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in"
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-4xl mb-2">🌈</div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <p className="text-gray-600 dark:text-gray-400">Track your mood journey</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                autoComplete="email"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                autoComplete="current-password"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600 dark:text-gray-400">
                Remember my credentials
              </label>
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
