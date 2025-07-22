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



  const handleTestAgent = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      setSelectedAgent(agent);
      setSessionId(generateSessionId());
      setIsChatOpen(true);
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5511996084893?text=Olá! Gostaria de saber mais sobre os agentes de IA.', '_blank');
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
            <div className="logo-section flex items-center gap-3">
              <img src={import.meta.env.VITE_LOGO_URL || '/hartech-logo.svg'} alt="HARTECH" className="logo h-10 w-auto" />
              <span className="brand-name text-xl font-bold text-[#00f6ff]">
                Hartech
              </span>
            </div>
            <Button 
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] hover:bg-[#1ebe57] px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <img 
                src="https://cdn-icons-png.flaticon.com/512/733/733585.png" 
                alt="WhatsApp" 
                className="w-5 h-5"
              />
              Fale conosco
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Bem-vindo à{" "}
            <span className="text-[#00f6ff]">Hartech</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Transformamos ideias em soluções digitais com tecnologia de ponta. Automatize processos e melhore a experiência do seu negócio com nossos agentes de IA especializados
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
      <footer className="bg-space-800 border-t border-space-600 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-4">
            <span className="text-lg font-bold text-[#00f6ff]">
              Hartech
            </span>
          </div>
          <p className="text-gray-400">© 2024 Hartech. Todos os direitos reservados.</p>
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
