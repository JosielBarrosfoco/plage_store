import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Clock,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@plage.com.br",
    href: "mailto:contato@plage.com.br",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "(95)98424-0100 ",
    href: "tel:+5595984240100",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "(95)984240100 ",
    href: "https://wa.me/5595984240100",
  },
  {
    icon: Clock,
    label: "Horário",
    value: "Seg-Sex, 9h às 18h",
    href: null,
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Mensagem enviada!",
      description: "Retornaremos em breve. Obrigado pelo contato!",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Entre em <span className="text-gradient">Contato</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Tire suas dúvidas, solicite um orçamento ou simplesmente diga olá.
            Estamos prontos para ajudar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Informações</h2>

            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="glass rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <info.icon size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="glass rounded-2xl p-6 text-center">
              <MessageCircle size={32} className="text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Resposta Rápida</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Prefere uma resposta imediata? Fale conosco pelo WhatsApp.
              </p>
              <Button variant="hero" className="w-full" asChild>
                <a
                  href="https://wa.me/5595984240100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={18} />
                  Abrir WhatsApp
                </a>
              </Button>
            </div>

            {/* Location */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <MapPin size={20} className="text-primary" />
                <h3 className="font-semibold">Localização</h3>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>832 Avenida General Ataíde Teive</p>
                <p>Mecejana, Boa Vista - RR</p>
                <p>CEP: 69304-360</p>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Atendemos clientes de todo o Brasil e exterior de forma remota.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass rounded-3xl p-6 md:p-10">
              <h2 className="text-2xl font-bold mb-6">Envie uma mensagem</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome completo *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      required
                      className="h-12 bg-secondary/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">E-mail *</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      required
                      className="h-12 bg-secondary/50 border-border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Telefone</label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                      className="h-12 bg-secondary/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Assunto *</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Ex: Orçamento para automação"
                      required
                      className="h-12 bg-secondary/50 border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Mensagem *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Descreva sua necessidade ou dúvida..."
                    required
                    rows={6}
                    className="bg-secondary/50 border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send size={18} />
                      Enviar Mensagem
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Ao enviar, você concorda com nossa política de privacidade.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
