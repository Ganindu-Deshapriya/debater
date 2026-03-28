import React from 'react';
import ReactMarkdown from 'react-markdown';

type ConclusionProps = {
  conclusion: string;
};

export function ConclusionBox({ conclusion }: ConclusionProps) {
  return (
    <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-xl shadow">
      <strong className="block mb-2 text-yellow-700 text-lg">Debate Conclusion</strong>
      <div className="text-gray-900 whitespace-pre-wrap">
        <ReactMarkdown>{conclusion}</ReactMarkdown>
      </div>
    </div>
  );
}
