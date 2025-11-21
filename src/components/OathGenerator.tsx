'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface GeneratedOath {
  challenge: string;
  category: string;
  type: string;
  frequency: string;
  stake: number;
  risk: string;
}

const OathGenerator = () => {
  const [description, setDescription] = useState('');
  const [generatedOath, setGeneratedOath] = useState<GeneratedOath | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateOath = async () => {
    if (!description.trim()) {
      toast.error('Please describe what you want to improve');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-oath', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate oath');
      }

      setGeneratedOath(data);
      toast.success('Oath generated successfully!');
    } catch (error: any) {
      console.error('Error generating oath:', error);
      toast.error(error.message || 'Failed to generate oath. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return 'bg-green-500/20 text-green-500';
      case 'medium':
        return 'bg-success/20 text-success';
      case 'high':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-success/20 text-success';
    }
  };

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-4 rounded border border-white/10 bg-surface p-6">
        <label className="font-bold text-white" htmlFor="oath-description">
          What are you trying to improve?
        </label>
        <textarea
          className="min-h-[120px] resize-none rounded border-white/10 bg-background-dark p-4 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary"
          id="oath-description"
          placeholder="I keep skipping the gym...
I want to read more books.
I spend too much money on takeout."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isGenerating}
        ></textarea>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <button 
            onClick={generateOath}
            disabled={isGenerating || !description.trim()}
            className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 px-6 bg-primary text-background-dark text-sm font-bold leading-normal transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
          >
            {isGenerating ? 'Generating...' : 'Generate Oath'}
          </button>
          <p className="text-xs text-white/60">
            We'll suggest a challenge, frequency, and suggested stake.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded border border-white/10 bg-surface p-6">
        <p className="font-bold text-white">Suggested Oath</p>
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded border border-dashed border-white/20 p-8 text-center min-h-[300px]">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="text-white/60">Generating your personalized oath...</p>
          </div>
        ) : generatedOath ? (
          <div className="flex flex-col gap-4 rounded border border-dashed border-white/20 p-4 text-center">
            <p className="text-2xl font-bold text-white">{generatedOath.challenge}</p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                Category: {generatedOath.category}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                Type: {generatedOath.type}
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${getRiskColor(generatedOath.risk)}`}>
                Risk: {generatedOath.risk}
              </span>
            </div>
            <div className="my-2">
              <p className="text-sm text-white/60">{generatedOath.frequency}</p>
              <p className="text-sm uppercase tracking-wider text-white/60 mt-2">Suggested Stake</p>
              <p className="text-4xl font-bold text-primary">${generatedOath.stake}</p>
            </div>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <button className="flex h-11 flex-1 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-background-dark transition-opacity hover:opacity-90">
                Make this an Oath
              </button>
              <button 
                onClick={generateOath}
                disabled={isGenerating}
                className="flex h-11 flex-1 items-center justify-center rounded-full border border-white/20 bg-transparent px-6 text-sm font-medium text-white transition-colors hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Regenerate
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 rounded border border-dashed border-white/20 p-4 text-center min-h-[300px] items-center justify-center">
            <p className="text-white/60">Enter a description and click "Generate Oath" to get started</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OathGenerator;
