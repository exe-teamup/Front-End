import { useState } from 'react';
import { SkillSelector } from '../components/Select/SkillSelector';
import { MajorSelector } from '../components/Select/MajorSelector';

export function Profile() {
  const options = ['Frontend', 'Backend', 'Mobile', 'UI/UX', 'DevOps', 'Data'];
  const [skills, setSkills] = useState<string[]>([]);
  const [major, setMajor] = useState<string | undefined>(undefined);

  return (
    <div className='max-w-4xl mx-auto py-12 px-4'>
      <h1 className='text-3xl font-bold text-text-title mb-6'>Profile</h1>

      <section className='mb-6'>
        <h2 className='text-lg font-medium mb-3'>Chuyên ngành</h2>
        <MajorSelector
          options={[
            'Công nghệ thông tin',
            'Kỹ thuật phần mềm',
            'Thiết kế',
            'Mạng',
            'AI/ML',
          ]}
          value={major}
          onChange={setMajor}
        />
        <div className='h-6' />
        <h2 className='text-lg font-medium mb-3'>Kỹ năng / Điểm mạnh</h2>
        <SkillSelector options={options} value={skills} onChange={setSkills} />
        <div className='mt-4'>
          <button
            type='button'
            className='px-4 py-2 rounded-md bg-primary text-white'
            onClick={() => {
              // placeholder save behavior — replace with API call or store action
              localStorage.setItem('profile_skills', JSON.stringify(skills));
              localStorage.setItem('profile_major', major ?? '');
              alert(
                'Saved: Major=' + (major ?? '') + ' Skills=' + skills.join(', ')
              );
            }}
          >
            Save
          </button>
        </div>
      </section>
    </div>
  );
}
