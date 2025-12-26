import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  featured?: boolean;
}

export const ProductCard = ({
  id,
  title,
  description,
  price,
  originalPrice,
  category,
  image,
  featured,
}: ProductCardProps) => {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div
      className={`group relative glass rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-elevated ${
        featured ? "ring-2 ring-primary/30" : ""
      }`}
    >
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-gradient-primary text-primary-foreground border-0">
            Destaque
          </Badge>
        </div>
      )}

      {discount > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="destructive">-{discount}%</Badge>
        </div>
      )}

      <div className="aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6 space-y-4">
        <Badge variant="outline" className="text-xs">
          {category}
        </Badge>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">
              R$ {price.toLocaleString("pt-BR")}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                R$ {originalPrice.toLocaleString("pt-BR")}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1" asChild>
            <Link to={`/produto/${id}`}>
              Ver Mais
            </Link>
          </Button>
          <Button className="flex-1 gap-2" asChild>
            <Link to={`/produto/${id}`}>
              Comprar
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
