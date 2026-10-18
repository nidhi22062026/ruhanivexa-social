import React, { useState } from 'react';
import { Sparkles, Users, Globe, Flame, ZoomIn, ZoomOut, RotateCcw, ArrowRight } from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';
import { User, OrbitCommunity } from '../../types';

interface ConstellationNode {
  id: string;
  type: 'user' | 'community' | 'trend';
  title: string;
  subtitle: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  data: User | OrbitCommunity | { tag: string; pulses: number };
}

export const ConstellationMap: React.FC = () => {
  const { users, communities, setActiveTab, updateCurrentUser } = useUniverse();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNode, setSelectedNode] = useState<ConstellationNode | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'creators' | 'orbits'>('all');

  // Constellation nodes mapped across a 500x500 celestial coordinate system
  const nodes: ConstellationNode[] = [
    // Center Core (Current user / Sovereign Aria)
    {
      id: 'node_aria',
      type: 'user',
      title: users[0].name,
      subtitle: users[0].handle,
      x: 250,
      y: 240,
      radius: 28,
      color: '#E7C77A',
      data: users[0],
    },
    // User 1: Kaelen Voss
    {
      id: 'node_kaelen',
      type: 'user',
      title: users[1].name,
      subtitle: users[1].handle,
      x: 130,
      y: 130,
      radius: 22,
      color: '#4FD1C5',
      data: users[1],
    },
    // User 2: Lyra Sterling
    {
      id: 'node_lyra',
      type: 'user',
      title: users[2].name,
      subtitle: users[2].handle,
      x: 370,
      y: 140,
      radius: 24,
      color: '#E7C77A',
      data: users[2],
    },
    // User 3: Orion Drake
    {
      id: 'node_orion',
      type: 'user',
      title: users[3].name,
      subtitle: users[3].handle,
      x: 110,
      y: 350,
      radius: 20,
      color: '#9A72F6',
      data: users[3],
    },
    // User 4: Mira Solaria
    {
      id: 'node_mira',
      type: 'user',
      title: users[4].name,
      subtitle: users[4].handle,
      x: 380,
      y: 360,
      radius: 20,
      color: '#F472B6',
      data: users[4],
    },
    // Community: Astrophotography
    {
      id: 'node_comm_astro',
      type: 'community',
      title: 'Astrophotography Guild',
      subtitle: '8.4k Stargazers',
      x: 180,
      y: 70,
      radius: 26,
      color: '#7650C8',
      data: communities[0],
    },
    // Community: Quantum Art
    {
      id: 'node_comm_art',
      type: 'community',
      title: 'Quantum & Cosmic Art',
      subtitle: '12.1k Creators',
      x: 340,
      y: 260,
      radius: 26,
      color: '#7650C8',
      data: communities[1],
    },
    // Community: Ambient Sound
    {
      id: 'node_comm_sound',
      type: 'community',
      title: 'Starlight Ambient Sound',
      subtitle: '6.8k Listeners',
      x: 420,
      y: 210,
      radius: 22,
      color: '#7650C8',
      data: communities[2],
    },
    // Trend Node: Supernova
    {
      id: 'node_trend_supernova',
      type: 'trend',
      title: '#PillarsOfCreation',
      subtitle: '1.4k Transmissions',
      x: 270,
      y: 410,
      radius: 18,
      color: '#FFF4D0',
      data: { tag: 'PillarsOfCreation', pulses: 1420 },
    },
  ];

  // Connection Arcs between nodes (Constellation Lines)
  const connections = [
    { from: 'node_aria', to: 'node_kaelen' },
    { from: 'node_aria', to: 'node_lyra' },
    { from: 'node_aria', to: 'node_comm_art' },
    { from: 'node_kaelen', to: 'node_comm_astro' },
    { from: 'node_lyra', to: 'node_comm_sound' },
    { from: 'node_lyra', to: 'node_comm_art' },
    { from: 'node_aria', to: 'node_orion' },
    { from: 'node_orion', to: 'node_trend_supernova' },
    { from: 'node_mira', to: 'node_trend_supernova' },
    { from: 'node_mira', to: 'node_comm_art' },
  ];

  const filteredNodes = nodes.filter((node) => {
    if (activeFilter === 'creators') return node.type === 'user';
    if (activeFilter === 'orbits') return node.type === 'community';
    return true;
  });

  return (
    <div className="relative w-full h-[62vh] sm:h-[68vh] bg-[#101014] overflow-hidden select-none border border-[#7650C8]/25 rounded-2xl flex flex-col justify-between">
      {/* Top Filter Chips */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center gap-1.5 bg-[#15111d]/90 p-1 rounded-full border border-[#7650C8]/40 backdrop-blur-md">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-tech font-medium transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#E7C77A] text-[#101014] shadow-[0_0_12px_rgba(231,199,122,0.4)]'
                : 'text-[#F7F4EF]/70 hover:text-white'
            }`}
          >
            All Coordinates
          </button>
          <button
            onClick={() => setActiveFilter('creators')}
            className={`px-3 py-1 rounded-full text-xs font-tech font-medium transition-all cursor-pointer ${
              activeFilter === 'creators'
                ? 'bg-[#E7C77A] text-[#101014] shadow-[0_0_12px_rgba(231,199,122,0.4)]'
                : 'text-[#F7F4EF]/70 hover:text-white'
            }`}
          >
            Creators
          </button>
          <button
            onClick={() => setActiveFilter('orbits')}
            className={`px-3 py-1 rounded-full text-xs font-tech font-medium transition-all cursor-pointer ${
              activeFilter === 'orbits'
                ? 'bg-[#E7C77A] text-[#101014] shadow-[0_0_12px_rgba(231,199,122,0.4)]'
                : 'text-[#F7F4EF]/70 hover:text-white'
            }`}
          >
            Orbits
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-[#15111d]/90 p-1 rounded-full border border-[#7650C8]/40 backdrop-blur-md">
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.15))}
            className="p-1 rounded-full hover:bg-[#7650C8]/30 text-[#E7C77A] cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.15))}
            className="p-1 rounded-full hover:bg-[#7650C8]/30 text-[#E7C77A] cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1 rounded-full hover:bg-[#7650C8]/30 text-[#F7F4EF]/70 cursor-pointer"
            title="Reset Coordinates"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG Interactive Constellation Space */}
      <div className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full max-w-[550px] max-h-[550px] transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E7C77A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7650C8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Concentric Orbital Grid Rings */}
          <circle cx="250" cy="250" r="100" stroke="#7650C8" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.3" fill="none" />
          <circle cx="250" cy="250" r="180" stroke="#7650C8" strokeWidth="0.8" strokeDasharray="4 8" opacity="0.25" fill="none" />
          <circle cx="250" cy="250" r="230" stroke="#E7C77A" strokeWidth="0.6" strokeDasharray="2 6" opacity="0.2" fill="none" />

          {/* Connection Lines (Constellation Arcs) */}
          {connections.map((conn, idx) => {
            const fromNode = nodes.find((n) => n.id === conn.from);
            const toNode = nodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            return (
              <line
                key={idx}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="#7650C8"
                strokeWidth="1.2"
                strokeDasharray="2 3"
                opacity="0.45"
              />
            );
          })}

          {/* Render Nodes */}
          {filteredNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <g
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer group"
              >
                {/* Outer Glow Ring on Hover/Select */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius + (isSelected ? 10 : 5)}
                  fill="url(#nodeGlow)"
                  className="transition-all duration-300 group-hover:opacity-100 opacity-60"
                />

                {/* Main Node Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius}
                  fill="#15111d"
                  stroke={node.color}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  className="transition-transform group-hover:scale-110"
                />

                {/* Icon or Glyph inside Node */}
                {node.type === 'user' ? (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius - 3}
                    fill={node.color}
                    opacity="0.3"
                  />
                ) : node.type === 'community' ? (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius - 4}
                    fill="#7650C8"
                    opacity="0.5"
                  />
                ) : (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius - 4}
                    fill="#E7C77A"
                    opacity="0.5"
                  />
                )}

                {/* Node Label */}
                <text
                  x={node.x}
                  y={node.y + node.radius + 14}
                  textAnchor="middle"
                  fill="#F7F4EF"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  className="pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  {node.title.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="absolute bottom-3 left-3 right-3 z-30 p-3.5 rounded-2xl bg-[#1a1226]/95 border border-[#E7C77A]/50 backdrop-blur-xl shadow-2xl flex items-center justify-between animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[#101014] text-xs shadow-md"
              style={{ backgroundColor: selectedNode.color }}
            >
              {selectedNode.type === 'user' ? (
                <Sparkles className="w-5 h-5 text-[#101014]" />
              ) : selectedNode.type === 'community' ? (
                <Globe className="w-5 h-5 text-[#101014]" />
              ) : (
                <Flame className="w-5 h-5 text-[#101014]" />
              )}
            </div>

            <div>
              <p className="font-royal font-bold text-sm text-[#F7F4EF]">
                {selectedNode.title}
              </p>
              <p className="text-xs text-[#E7C77A] font-mono">
                {selectedNode.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (selectedNode.type === 'community') {
                  setActiveTab('orbits');
                } else if (selectedNode.type === 'user') {
                  setActiveTab('profile');
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E7C77A] text-[#101014] text-xs font-royal font-bold hover:bg-[#FFF4D0] transition-colors cursor-pointer"
            >
              <span>Explore World</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setSelectedNode(null)}
              className="p-1.5 text-xs text-[#F7F4EF]/60 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
