import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

export const TestimonialCard = ({
  name,
  role,
  content,
  rating,
  avatar,
}: TestimonialCardProps) => {
  return (
    <div className="glass rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-card">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "text-primary fill-primary" : "text-muted"}
          />
        ))}
      </div>

      <blockquote className="text-foreground mb-6 leading-relaxed">
        "{content}"
      </blockquote>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            name.charAt(0)
          )}
        </div>
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
};
