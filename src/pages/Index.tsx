
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-6">🌈</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            MoodTracker
          </h1>
          <p className="text-gray-600 mb-8">
            Track your emotions, reflect on your journey, and grow with daily challenges.
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/signup')}
              className="w-full text-lg py-6"
            >
              Get Started
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/login')}
              className="w-full text-lg py-6"
            >
              Sign In
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            Start your journey to better emotional wellness
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
