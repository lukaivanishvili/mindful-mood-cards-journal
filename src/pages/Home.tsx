
import { useState, useEffect } from 'react';
import { MoodCard } from '@/components/MoodCard';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { moods } from '@/data/moods';
import { Challenge } from '@/types';
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const { toast } = useToast();
  const [dailyChallenge, setDailyChallenge] = useState<Challenge | null>(null);

  const challenges = [
    {
      id: '1',
      title: 'Take 5 Deep Breaths',
      description: 'Practice mindful breathing for 2 minutes',
      icon: '🌬️',
      completed: false,
      date: new Date().toDateString()
    },
    {
      id: '2',
      title: 'Write 3 Things You\'re Grateful For',
      description: 'Express gratitude in your journal',
      icon: '🙏',
      completed: false,
      date: new Date().toDateString()
    },
    {
      id: '3',
      title: 'Go for a 10-Minute Walk',
      description: 'Get some fresh air and movement',
      icon: '🚶‍♀️',
      completed: false,
      date: new Date().toDateString()
    },
    {
      id: '4',
      title: 'Listen to Your Favorite Song',
      description: 'Enjoy some music that makes you happy',
      icon: '🎵',
      completed: false,
      date: new Date().toDateString()
    },
    {
      id: '5',
      title: 'Call a Friend or Family Member',
      description: 'Connect with someone you care about',
      icon: '📞',
      completed: false,
      date: new Date().toDateString()
    }
  ];

  useEffect(() => {
    // Load daily challenge
    const today = new Date().toDateString();
    const savedChallenge = localStorage.getItem(`challenge_${today}`);
    
    if (savedChallenge) {
      setDailyChallenge(JSON.parse(savedChallenge));
    } else {
      // Pick a random challenge for today
      const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
      setDailyChallenge(randomChallenge);
      localStorage.setItem(`challenge_${today}`, JSON.stringify(randomChallenge));
    }
  }, []);

  const completeChallenge = () => {
    if (dailyChallenge) {
      const completedChallenge = { ...dailyChallenge, completed: true };
      setDailyChallenge(completedChallenge);
      localStorage.setItem(`challenge_${completedChallenge.date}`, JSON.stringify(completedChallenge));
      
      toast({
        title: "Challenge Complete! 🎉",
        description: "Great job on completing today's challenge!"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            How are you feeling today?
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your mood and reflect on your emotions
          </p>
        </div>

        {/* Daily Challenge */}
        {dailyChallenge && (
          <Card className="mb-8 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="text-2xl">{dailyChallenge.icon}</span>
                Daily Challenge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">{dailyChallenge.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {dailyChallenge.description}
              </p>
              <Button
                onClick={completeChallenge}
                disabled={dailyChallenge.completed}
                className={`w-full ${
                  dailyChallenge.completed 
                    ? 'bg-green-500 hover:bg-green-500' 
                    : ''
                }`}
              >
                {dailyChallenge.completed ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Completed!
                  </>
                ) : (
                  'Mark as Complete'
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Mood Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {moods.map((mood) => (
            <MoodCard key={mood.id} mood={mood} />
          ))}
        </div>

        {/* Quick Stats */}
        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center">Your Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Entries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Challenges</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Home;
