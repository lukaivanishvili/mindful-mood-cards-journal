
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Camera, Edit, Check, User } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');

  const handleSave = () => {
    if (!editedName.trim() || !editedEmail.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    updateProfile({
      name: editedName,
      email: editedEmail
    });

    setIsEditing(false);
    toast({
      title: "Profile Updated! ✨",
      description: "Your changes have been saved"
    });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target?.result as string;
        updateProfile({ photo: photoUrl });
        toast({
          title: "Photo Updated! 📸",
          description: "Your profile photo has been changed"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your account settings
          </p>
        </div>

        {/* Profile Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Photo */}
            <div className="text-center">
              <div className="relative inline-block">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={user.photo} alt={user.name} />
                  <AvatarFallback className="text-2xl">
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                <label className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Name and Email */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                {isEditing ? (
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder="Your name"
                  />
                ) : (
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                    {user.name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    placeholder="Your email"
                  />
                ) : (
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                    {user.email}
                  </div>
                )}
              </div>
            </div>

            {/* Edit Button */}
            {!isEditing ? (
              <Button 
                onClick={() => setIsEditing(true)}
                className="w-full"
                variant="outline"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  onClick={handleSave}
                  className="flex-1"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedName(user.name);
                    setEditedEmail(user.email);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Your Journey Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">
                  {JSON.parse(localStorage.getItem('journalEntries') || '[]').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Journal Entries
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Days Active
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Profile;
