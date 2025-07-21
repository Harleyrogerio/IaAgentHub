import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AgentCard, type AgentConfig } from "@/components/agent-card";
import { ChatModal } from "@/components/chat-modal";
import { Zap, Brain, Link } from "lucide-react";

const agents: AgentConfig[] = [
  {
    id: "atendimento_cliente",
    icon: "🎧",
    name: "Atendimento ao Cliente",
    description: "Suporte 24/7 com respostas inteligentes e resolução eficiente de problemas"
  },
  {
    id: "sdr_vendas",
    icon: "💼",
    name: "SDR (Vendas)",
    description: "Qualificação de leads e gestão de pipeline de vendas automatizada"
  },
  {
    id: "suporte_tecnico",
    icon: "🔧",
    name: "Suporte Técnico",
    description: "Diagnóstico e resolução de problemas técnicos com precisão"
  },
  {
    id: "recursos_humanos",
    icon: "👥",
    name: "Recursos Humanos",
    description: "Recrutamento, onboarding e gestão de colaboradores inteligente"
  },
  {
    id: "marketing_digital",
    icon: "📈",
    name: "Marketing Digital",
    description: "Campanhas automatizadas e análise de performance em tempo real"
  },
  {
    id: "financeiro",
    icon: "💰",
    name: "Financeiro",
    description: "Controle financeiro, análise de custos e planejamento orçamentário"
  },
  {
    id: "juridico",
    icon: "⚖️",
    name: "Jurídico",
    description: "Análise de contratos e consultoria jurídica automatizada"
  },
  {
    id: "educacional",
    icon: "🎓",
    name: "Educacional",
    description: "Tutoria personalizada e acompanhamento de aprendizagem"
  },
  {
    id: "saude",
    icon: "🏥",
    name: "Saúde",
    description: "Triagem médica e acompanhamento de pacientes inteligente"
  },
  {
    id: "imobiliario",
    icon: "🏠",
    name: "Imobiliário",
    description: "Consultoria imobiliária e avaliação de propriedades automática"
  },
  {
    id: "ecommerce",
    icon: "🛒",
    name: "E-commerce",
    description: "Recomendações personalizadas e otimização de vendas online"
  },
  {
    id: "agendamento",
    icon: "📅",
    name: "Agendamento",
    description: "Gestão inteligente de horários e compromissos automatizada"
  }
];

function generateSessionId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function Portfolio() {
  const [selectedAgent, setSelectedAgent] = useState<AgentConfig | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const logoUrl = import.meta.env.VITE_LOGO_URL || "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=200&h=80&fit=crop&auto=format";

  const handleTestAgent = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      setSelectedAgent(agent);
      setSessionId(generateSessionId());
      setIsChatOpen(true);
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os agentes de IA.', '_blank');
  };

  const scrollToAgents = () => {
    document.getElementById('agents-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-space-900 text-white font-sans">
      {/* Header */}
      <header className="bg-space-800/80 backdrop-blur-sm border-b border-space-600 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img 
                src={logoUrl} 
                alt="Logo IA Agents" 
                className="h-10 w-auto rounded-lg"
              />
              <span className="ml-3 text-xl font-bold gradient-bg bg-clip-text text-transparent">
                IA Agents
              </span>
            </div>
            <Button 
              onClick={handleWhatsAppClick}
              className="gradient-bg hover:shadow-lg hover:shadow-blue-500/25 px-6 py-2 rounded-lg font-medium transition-all duration-300"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Saiba Mais
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Agentes de IA{" "}
            <span className="gradient-bg bg-clip-text text-transparent">Inteligentes</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Automatize processos, melhore a experiência do cliente e aumente a eficiência do seu negócio com nossos agentes especializados
          </p>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 gradient-bg rounded-lg blur opacity-60 pulse-ring"></div>
              <Button
                onClick={scrollToAgents}
                className="relative gradient-bg hover:shadow-xl hover:shadow-blue-500/25 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Explore Nossos Agentes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Cards Grid */}
      <section id="agents-section" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Agentes Especializados</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onTestClick={handleTestAgent}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-space-800/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher nossos agentes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Zap className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Velocidade Incomparável</h3>
              <p className="text-gray-400">Respostas instantâneas 24/7 com precisão e eficiência superiores</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Brain className="h-12 w-12 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">IA Avançada</h3>
              <p className="text-gray-400">Modelos de linguagem de última geração treinados para cada especialidade</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Link className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Integração Fácil</h3>
              <p className="text-gray-400">APIs simples e documentação completa para implementação rápida</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Transforme seu negócio hoje mesmo com nossos agentes de IA especializados
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToAgents}
              className="gradient-bg hover:shadow-xl hover:shadow-blue-500/25 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Começar Agora
            </Button>
            <Button 
              variant="outline"
              onClick={handleWhatsAppClick}
              className="border border-space-600 hover:border-blue-500 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Ver Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-space-800 border-t border-space-600 py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center mb-4">
            <img 
              src={logoUrl} 
              alt="Logo IA Agents" 
              className="h-8 w-auto rounded"
            />
            <span className="ml-3 text-lg font-bold gradient-bg bg-clip-text text-transparent">
              IA Agents
            </span>
          </div>
          <p className="text-gray-400">© 2024 IA Agents. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        agent={selectedAgent}
        sessionId={sessionId}
      />
    </div>
  );
}
