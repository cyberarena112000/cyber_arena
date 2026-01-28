import type { Tool } from "../../data/tools";
import { useState } from 'react';

interface ToolCardProps {
  tool: Tool;
}

function ToolCard({ tool }: ToolCardProps) {
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (tool.id === 'web-crawler') {
      const url = window.prompt("Enter URL to crawl (e.g. https://example.com):");
      if (!url) return;

      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/crawl', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url })
        });

        if (!response.ok) throw new Error('Crawl failed');

        const data = await response.json();
        alert(`Crawl Complete!\nFound ${data.links_found} links.\n\nFirst 5 links:\n${data.links.slice(0, 5).join('\n')}`);
      } catch (error) {
        alert(`Error running crawler: ${error}`);
      } finally {
        setLoading(false);
      }
    } else {
      // Default action for other tools
      console.log(`Action for ${tool.name}`);
    }
  };

  return (
    <div className="tool-card group relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-cyan-500/30 hover:shadow-cyan-500/10">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {tool.icon && <span className="text-2xl">{tool.icon}</span>}
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {tool.name}
            </h3>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-medium border ${tool.team === 'Red'
            ? 'bg-red-500/10 text-red-400 border-red-500/20'
            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
            }`}>
            {tool.team} Team
          </span>
        </div>

        <p className="text-gray-400 mb-6 text-sm leading-relaxed h-10 line-clamp-2">
          {tool.description}
        </p>

        <button
          onClick={handleAction}
          disabled={loading}
          className={`w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(8,145,178,0.3)] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
          )}
          {loading ? 'Running...' : (tool.actionLabel || 'Learn More')}
        </button>

        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            <span>Category: <span className="text-gray-300">{tool.category}</span></span>
            <span className="w-1 h-1 rounded-full bg-gray-700 self-center" />
            <span>Level: <span className="text-gray-300">{tool.level}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolCard;
