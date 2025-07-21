import { Button } from "@/components/ui/button";

export interface AgentConfig {
  id: string;
  icon: string;
  name: string;
  description: string;
}

interface AgentCardProps {
  agent: AgentConfig;
  onTestClick: (agentId: string) => void;
}

export function AgentCard({ agent, onTestClick }: AgentCardProps) {
  return (
    <div className="bg-space-800 border border-space-600 rounded-xl p-6 card-hover cursor-pointer">
      <div className="text-4xl mb-4">{agent.icon}</div>
      <h3 className="text-xl font-semibold mb-3">{agent.name}</h3>
      <p className="text-gray-400 mb-4 text-sm">{agent.description}</p>
      <Button
        className="w-full gradient-bg hover:shadow-lg hover:shadow-blue-500/25 py-2 px-4 rounded-lg font-medium transition-all duration-300"
        onClick={() => onTestClick(agent.id)}
      >
        Testar Agora
      </Button>
    </div>
  );
}
