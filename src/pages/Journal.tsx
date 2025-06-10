
import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { JournalEntry } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Plus, Calendar } from 'lucide-react';

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Load journal entries from localStorage
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    setEntries(savedEntries);
  }, []);

  const addEntry = () => {
    if (!user || !newEntry.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      userId: user.id,
      content: newEntry,
      mood: 'General',
      date: new Date().toLocaleDateString(),
      timestamp: Date.now()
    };

    const updatedEntries = [entry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    
    setNewEntry('');
    setIsWriting(false);
    
    toast({
      title: "Entry Added! ✨",
      description: "Your journal entry has been saved"
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            My Journal
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Reflect on your thoughts and feelings
          </p>
        </div>

        {/* Write New Entry */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">📝</span>
              Write New Entry
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isWriting ? (
              <Button 
                onClick={() => setIsWriting(true)}
                className="w-full"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Start Writing
              </Button>
            ) : (
              <div className="space-y-4">
                <Textarea
                  placeholder="What's on your mind today? Write about your feelings, experiences, or anything you'd like to remember..."
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                  className="min-h-32 resize-none"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={addEntry}
                    disabled={!newEntry.trim()}
                    className="flex-1"
                  >
                    Save Entry
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setIsWriting(false);
                      setNewEntry('');
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Journal Entries */}
        <div className="space-y-4">
          {entries.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-6xl mb-4">📖</div>
                <h3 className="text-xl font-semibold mb-2">No entries yet</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Start your journaling journey by writing your first entry!
                </p>
              </CardContent>
            </Card>
          ) : (
            entries.map((entry) => (
              <Card key={entry.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {formatDate(entry.timestamp)}
                    </div>
                    {entry.mood !== 'General' && (
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        {entry.mood}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {entry.content}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Journal;
