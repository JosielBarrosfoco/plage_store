import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Code,
  Bot,
  BarChart3,
  Wrench,
  MessageCircle,
  ArrowRight,
  Check,
} from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Desenvolvimento Web Personalizado",
    description:
      "Sites e aplicações web sob medida para as necessidades específicas do seu negócio.",
    features: [
      "Landing pages de alta conversão",
      "Sites institucionais completos",
      "E-commerce e lojas virtuais",
      "Sistemas web personalizados",
      "Integrações com APIs",
    ],
  },
  {
    icon: Bot,
    title: "Automação de Processos",
    description:
      "Automatize tarefas repetitivas e ganhe eficiência operacional.",
    features: [
      "Automação de atendimento",
      "Integração entre sistemas",
      "Chatbots e assistentes virtuais",
      "Workflows automatizados",
      "RPA (Robotic Process Automation)",
    ],
  },
  {
    icon: BarChart3,
    title: "Dashboards e Business Intelligence",
    description:
      "Transforme seus dados em insights acionáveis com visualizações profissionais.",
    features: [
      "Dashboards Power BI personalizados",
      "Relatórios automatizados",
      "KPIs e métricas em tempo real",
      "Análise de dados avançada",
      "Data visualization",
    ],
  },
  {
    icon: Wrench,
    title: "Manutenção e Suporte",
    description:
      "Suporte técnico contínuo para manter suas soluções funcionando perfeitamente.",
    features: [
      "Manutenção preventiva",
      "Correção de bugs",
      "Atualizações de segurança",
      "Otimização de performance",
      "Suporte técnico dedicado",
    ],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Entendimento",
    description: "Analisamos suas necessidades e objetivos de negócio.",
  },
  {
    step: "02",
    title: "Proposta",
    description: "Apresentamos uma solução personalizada com escopo e prazos.",
  },
  {
    step: "03",
    title: "Desenvolvimento",
    description: "Construímos sua solução com qualidade e transparência.",
  },
  {
    step: "04",
    title: "Entrega",
    description: "Implementamos e treinamos sua equipe para usar a solução.",
  },
];

const Services = () => {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Serviços <span className="text-gradient">Sob Medida</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Soluções personalizadas para necessidades únicas. 
            Transformamos suas ideias em realidade digital.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="glass rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-card"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6">
                <service.icon size={24} className="text-primary-foreground" />
              </div>

              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>

              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Como <span className="text-gradient">Trabalhamos</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="text-center">
                  <span className="text-5xl font-bold text-gradient opacity-50">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-semibold mt-2 mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>

                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <ArrowRight className="text-primary/30 mx-auto" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto glass rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Precisa de uma solução personalizada?
          </h2>
          <p className="text-muted-foreground mb-8">
            Entre em contato conosco para discutir seu projeto. 
            Oferecemos consultoria gratuita para entender suas necessidades.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} />
                Falar no WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contato">
                Enviar Mensagem
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Services;
