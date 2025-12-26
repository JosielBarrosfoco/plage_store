import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Target,
  Lightbulb,
  Users,
  TrendingUp,
  Award,
  ArrowRight,
} from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Foco em Resultados",
    description: "Cada produto e serviço é desenvolvido com um objetivo claro: gerar valor real para seu negócio.",
  },
  {
    icon: Lightbulb,
    title: "Inovação Constante",
    description: "Estamos sempre atualizados com as melhores tecnologias e práticas do mercado.",
  },
  {
    icon: Users,
    title: "Cliente no Centro",
    description: "Ouvimos, entendemos e entregamos soluções que realmente atendem suas necessidades.",
  },
  {
    icon: Award,
    title: "Qualidade Premium",
    description: "Não abrimos mão da excelência em cada linha de código e pixel de design.",
  },
];

const stats = [
  { value: "500+", label: "Clientes Atendidos" },
  { value: "50+", label: "Produtos Digitais" },
  { value: "5+", label: "Anos de Experiência" },
  { value: "98%", label: "Taxa de Satisfação" },
];

const About = () => {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Sobre a <span className="text-gradient">PLAGE</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Somos uma softhouse especializada em criar soluções digitais que 
            <strong className="text-foreground"> economizam tempo</strong>, 
            <strong className="text-foreground"> aumentam produtividade</strong> e 
            <strong className="text-foreground"> impulsionam resultados</strong>.
          </p>
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
              <TrendingUp size={16} className="text-primary" />
              Nossa Missão
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Democratizar o acesso a
              <span className="text-gradient"> tecnologia de qualidade</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Acreditamos que toda empresa, independente do tamanho, merece 
              acesso a ferramentas e soluções digitais profissionais. Por isso, 
              criamos produtos prontos para uso que entregam resultados sem 
              complicações técnicas.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Combinamos expertise técnica com design centrado no usuário para 
              criar soluções que não apenas funcionam, mas que encantam e 
              geram valor real para nossos clientes.
            </p>
          </div>

          <div className="glass rounded-3xl p-8 md:p-10">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4">
                  <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nossos <span className="text-gradient">Valores</span>
            </h2>
            <p className="text-muted-foreground">
              Os pilares que guiam tudo o que fazemos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="glass rounded-2xl p-6 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-card"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <value.icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Us */}
        <div className="max-w-4xl mx-auto glass rounded-3xl p-8 md:p-12 mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Por que <span className="text-gradient">trabalhar conosco</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Expertise Técnica</h3>
              <p className="text-muted-foreground">
                Nossa equipe domina as tecnologias mais modernas do mercado, 
                garantindo soluções robustas, escaláveis e atualizadas.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Entrega Ágil</h3>
              <p className="text-muted-foreground">
                Produtos prontos para uso e projetos personalizados entregues 
                no prazo, sem surpresas ou atrasos.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Suporte Dedicado</h3>
              <p className="text-muted-foreground">
                Não abandonamos nossos clientes após a entrega. Oferecemos 
                suporte contínuo para garantir seu sucesso.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Preço Justo</h3>
              <p className="text-muted-foreground">
                Soluções de alta qualidade com preços acessíveis. 
                Acreditamos que tecnologia boa não precisa ser cara.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Explore nossos produtos ou entre em contato para discutir 
            uma solução personalizada para seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/produtos">
                Ver Produtos
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contato">Falar Conosco</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
