import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  Check,
  ShoppingCart,
  MessageCircle,
  Shield,
  Download,
  Clock,
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Button asChild>
            <Link to="/produtos">
              <ArrowLeft size={18} />
              Voltar aos Produtos
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar aos Produtos
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-card border border-border">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass rounded-xl p-4 text-center">
                <Shield size={24} className="text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Compra Segura</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <Download size={24} className="text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Download Imediato</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <Clock size={24} className="text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Suporte Incluso</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                {product.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {product.longDescription}
              </p>
            </div>

            {/* Price */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-foreground">
                  R$ {product.price.toLocaleString("pt-BR")}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      R$ {product.originalPrice.toLocaleString("pt-BR")}
                    </span>
                    <Badge variant="destructive">-{discount}%</Badge>
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="hero" size="lg" className="flex-1">
                  <ShoppingCart size={20} />
                  Comprar Agora
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://wa.me/5595984240100" target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={20} />
                    Tirar Dúvidas
                  </a>
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                Pagamento seguro via cartão, boleto ou PIX
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Benefícios</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check size={12} className="text-primary" />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Includes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">O que está incluso</h3>
              <ul className="space-y-2">
                {product.includes.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check size={12} className="text-primary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Audience */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Para quem é indicado</h3>
              <div className="flex flex-wrap gap-2">
                {product.targetAudience.map((audience, index) => (
                  <Badge key={index} variant="secondary">
                    {audience}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Perguntas <span className="text-gradient">Frequentes</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {product.faq.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass rounded-xl px-6 border-0"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
