
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { moods } from '@/data/moods';
import { JournalEntry } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const MoodDetail = () => {
  const { moodId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [note, setNote] = useState('');
  
  const mood = moods.find(m => m.id === moodId);

  if (!mood) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Mood not found</h1>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  const saveEntry = () => {
    if (!user) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      userId: user.id,
      content: note,
      mood: mood.name,
      date: new Date().toLocaleDateString(),
      timestamp: Date.now()
    };

    // Save to localStorage (in real app, this would go to backend)
    const existingEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    const updatedEntries = [entry, ...existingEntries];
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

    toast({
      title: "Entry Saved! 📝",
      description: `Your ${mood.name.toLowerCase()} mood has been recorded`
    });

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="container mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="mr-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            You're feeling {mood.name}
          </h1>
        </div>

        {/* Mood Display */}
        <Card className="mb-6 text-center">
          <CardContent className="pt-6">
            <div className={`w-24 h-24 rounded-full ${mood.color} flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg`}>
              {mood.emoji}
            </div>
            <h2 className="text-2xl font-bold mb-2">{mood.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {mood.description}
            </p>
          </CardContent>
        </Card>

        {/* Note Section */}
        <Card>
          <CardHeader>
            <CardTitle>Add a note about this feeling</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="What's on your mind? Share your thoughts about this mood..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-32 mb-4 resize-none"
            />
            <div className="space-y-2">
              <Button 
                onClick={saveEntry} 
                className="w-full"
                disabled={!note.trim()}
              >
                Save Entry
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mt-6 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 border-0">
          <CardHeader>
            <CardTitle className="text-lg">💡 Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {mood.id === 'happy' && "Savor this moment! Consider what made you feel this way and how you can recreate it."}
              {mood.id === 'sad' && "It's okay to feel sad. Consider reaching out to someone you trust or doing something kind for yourself."}
              {mood.id === 'angry' && "Take some deep breaths. Physical activity or journaling can help process these feelings."}
              {mood.id === 'anxious' && "Try grounding techniques: name 5 things you can see, 4 you can touch, 3 you can hear."}
              {mood.id === 'excited' && "Channel this energy into something positive! Share your excitement with others."}
              {mood.id === 'calm' && "Enjoy this peaceful state. Notice what helped you feel calm and remember it for stressful times."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoodDetail;
