import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Instagram, Github } from "lucide-react";
import { Logo } from "./Logo";
import { LogoText } from "./LogoText";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <LogoText className="h-8" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Softhouse especializada em soluções digitais premium. 
              Transformamos ideias em produtos que geram resultados.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Produtos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/produtos?categoria=sites" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sites Institucionais
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=automacoes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Automações
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=wordpress" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  WordPress
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=excel" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Planilhas Excel
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=powerbi" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboards Power BI
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/sobre" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={16} className="text-primary" />
                contato@plage.com.br
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={16} className="text-primary" />
                (00) 00000-0000
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={16} className="text-primary mt-0.5" />
                <div>
                  <div>832 Avenida General Ataíde Teive</div>
                  <div>Mecejana, Boa Vista - RR</div>
                  <div>CEP: 69304-360</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PLAGE STORE. Todos os direitos reservados.
            </p>
            <p className="text-sm text-muted-foreground">
              Feito com tecnologia de ponta 🚀
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
