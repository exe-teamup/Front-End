import { useState } from 'react';
import { Plus, X, Tag } from 'lucide-react';
import { type UserProfile } from '../../mock/user.mockapi';

interface SkillsInterestsSectionProps {
  profile: UserProfile;
  isEditing: boolean;
  onSkillsChange: (skills: string[]) => void;
  onInterestsChange: (interests: string[]) => void;
}

export function SkillsInterestsSection({
  profile,
  isEditing,
  onSkillsChange,
  onInterestsChange,
}: SkillsInterestsSectionProps) {
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      onSkillsChange([...profile.skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onSkillsChange(profile.skills.filter(skill => skill !== skillToRemove));
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
      onInterestsChange([...profile.interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    onInterestsChange(
      profile.interests.filter(interest => interest !== interestToRemove)
    );
  };

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
      <h2 className='text-xl font-semibold text-text-title mb-6'>
        Kỹ năng & Sở thích
      </h2>

      {/* Skills Section */}
      <div className='mb-8'>
        <h3 className='text-lg font-medium text-text-title mb-4'>Kỹ năng</h3>
        <div className='flex flex-wrap gap-2 mb-4'>
          {profile.skills.map((skill, index) => (
            <div
              key={index}
              className='flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm'
            >
              <Tag className='w-3 h-3' />
              <span>{skill}</span>
              {isEditing && (
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className='hover:bg-blue-200 rounded-full p-0.5'
                >
                  <X className='w-3 h-3' />
                </button>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <div className='flex gap-2'>
            <input
              type='text'
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
              placeholder='Thêm kỹ năng mới...'
              className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary'
              onKeyPress={e => e.key === 'Enter' && handleAddSkill()}
            />
            <button
              onClick={handleAddSkill}
              className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
            >
              <Plus className='w-4 h-4' />
            </button>
          </div>
        )}
      </div>

      {/* Interests Section */}
      <div>
        <h3 className='text-lg font-medium text-text-title mb-4'>Sở thích</h3>
        <div className='flex flex-wrap gap-2 mb-4'>
          {profile.interests.map((interest, index) => (
            <div
              key={index}
              className='flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm'
            >
              <Tag className='w-3 h-3' />
              <span>{interest}</span>
              {isEditing && (
                <button
                  onClick={() => handleRemoveInterest(interest)}
                  className='hover:bg-green-200 rounded-full p-0.5'
                >
                  <X className='w-3 h-3' />
                </button>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <div className='flex gap-2'>
            <input
              type='text'
              value={newInterest}
              onChange={e => setNewInterest(e.target.value)}
              placeholder='Thêm sở thích mới...'
              className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary'
              onKeyPress={e => e.key === 'Enter' && handleAddInterest()}
            />
            <button
              onClick={handleAddInterest}
              className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
            >
              <Plus className='w-4 h-4' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
