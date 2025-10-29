'use client';

import { useState } from 'react';
import { useQueryState } from 'nuqs';
import { Search, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { SearchFormProps } from './SearchForm.types';

export default function SearchForm({ onSearchStart }: SearchFormProps) {
  const [skills, setSkills] = useQueryState('skills', {
    defaultValue: '',
    shallow: false,
  });

  const [inputValue, setInputValue] = useState(skills || '');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearchStart?.();
    setSkills(inputValue || null);
  }

  function handleClear() {
    setInputValue('');
    onSearchStart?.();
    setSkills(null);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        name="skills"
        placeholder="Enter skills (e.g., React, TypeScript)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
      {inputValue && (
        <Button type="button" variant="outline" onClick={handleClear}>
          <X className="h-4 w-4 mr-2" />
          Clear
        </Button>
      )}
    </form>
  );
}
