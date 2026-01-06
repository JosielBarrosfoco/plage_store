import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { products } from "@/data/products";
import { testimonials } from "@/data/testimonials";
import {
  ArrowRight,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Code,
  BarChart3,
  FileSpreadsheet,
  Globe,
  Bot,
  Sparkles,
} from "lucide-react";

const featuredProducts = products.filter((p) => p.featured).slice(0, 3);

const benefits = [
  {
    icon: Clock,
    title: "Economize Tempo",
    description: "Produtos prontos para uso. Implemente em horas, não semanas.",
  },
  {
    icon: Shield,
    title: "Qualidade Premium",
    description: "Código limpo, design profissional e documentação completa.",
  },
  {
    icon: TrendingUp,
    title: "Aumente Resultados",
    description: "Soluções focadas em produtividade e conversão de vendas.",
  },
  {
    icon: Zap,
    title: "Suporte Especializado",
    description: "Time técnico pronto para ajudar na implementação.",
  },
];

const categories = [
  { icon: Globe, label: "Sites", count: "10+" },
  { icon: Bot, label: "Automações", count: "8+" },
  { icon: Code, label: "WordPress", count: "15+" },
  { icon: FileSpreadsheet, label: "Excel", count: "20+" },
  { icon: BarChart3, label: "Power BI", count: "12+" },
];

const Index = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground animate-fade-in">
              <Sparkles size={16} className="text-primary" />
              Softhouse & Estúdio Digital
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-up">
              Soluções digitais
              <br />
              <span className="text-gradient">prontas para usar</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Sites, automações, planilhas e dashboards profissionais.
              Economize tempo e dinheiro com produtos digitais de alta qualidade.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/produtos">
                  Ver Produtos
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/servicos">Solicitar Orçamento</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-gradient">500+</p>
                <p className="text-sm text-muted-foreground">Clientes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-gradient">50+</p>
                <p className="text-sm text-muted-foreground">Produtos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-gradient">98%</p>
                <p className="text-sm text-muted-foreground">Satisfação</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {categories.map((cat, index) => (
              <Link
                key={cat.label}
                to={`/produtos?categoria=${cat.label.toLowerCase()}`}
                className="flex items-center gap-3 px-6 py-3 rounded-full glass glass-hover group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <cat.icon size={20} className="text-primary" />
                <span className="font-medium text-foreground">{cat.label}</span>
                <span className="text-sm text-muted-foreground">({cat.count})</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Produtos em <span className="text-gradient">Destaque</span>
            </h2>
            <p className="text-muted-foreground">
              Soluções mais procuradas pelos nossos clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/produtos">
                Ver Todos os Produtos
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que escolher a <span className="text-gradient">PLAGE</span>?
            </h2>
            <p className="text-muted-foreground">
              Mais do que produtos, entregamos resultados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="glass rounded-2xl p-6 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <benefit.icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que nossos <span className="text-gradient">clientes</span> dizem
            </h2>
            <p className="text-muted-foreground">
              Mais de 500 empresas confiam em nossos produtos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Pronto para <span className="text-gradient">transformar</span> seu negócio?
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore nosso catálogo de produtos ou solicite uma solução personalizada.
              Estamos prontos para ajudar você a crescer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/produtos">
                  Explorar Produtos
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
