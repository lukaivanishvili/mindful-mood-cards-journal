
import { Mood } from '@/types';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface MoodCardProps {
  mood: Mood;
}

export const MoodCard = ({ mood }: MoodCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 bg-white dark:bg-gray-800 border-2 hover:border-primary"
      onClick={() => navigate(`/mood/${mood.id}`)}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className={`w-16 h-16 rounded-full ${mood.color} flex items-center justify-center text-2xl shadow-md`}>
          {mood.emoji}
        </div>
        <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
          {mood.name}
        </h3>
      </div>
    </Card>
  );
};
