import logoImg from "@/assets/logo.png";
import { Instagram, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-10 px-4" style={{ background: "hsl(var(--charcoal))" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={logoImg} alt="JoãoS Barbearia" className="h-12 w-auto" />
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="tel:+5500000000000"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <Phone size={20} />
            </a>
          </div>

          <p className="text-muted-foreground text-sm text-center">
            © 2024 Barbearia JoãoS · Todos os direitos reservados
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-border/30 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-12 bg-gold/40" />
            <p className="text-gold/60 text-xs tracking-[0.3em] uppercase font-elegant">Desde 2019</p>
            <div className="h-px w-12 bg-gold/40" />
          </div>
          <p className="text-muted-foreground text-xs">
            Estilo & precisão em cada corte
          </p>
        </div>
      </div>
    </footer>
  );
};
