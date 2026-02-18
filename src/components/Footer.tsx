import logoImg from "@/assets/logo.png";
import { Instagram, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 pt-16 pb-8 px-4" style={{ background: "hsl(var(--charcoal))" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <img src={logoImg} alt="JoãoS Barbearia" className="h-14 w-auto" />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Tradição e estilo moderno se encontram. Oferecemos mais que um corte, oferecemos uma experiência de cuidado pessoal.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="h-px w-8 bg-gold/40" />
              <p className="text-gold/80 text-xs tracking-[0.2em] uppercase font-elegant">Desde 2019</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-display text-lg font-semibold mb-6">Navegação</h4>
            <ul className="space-y-4">
              {['Início', 'Serviços', 'Galeria', 'Localização'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace('início', 'hero').replace('localização', 'location')}`}
                    className="text-muted-foreground hover:text-gold transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-foreground font-display text-lg font-semibold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                <span>Rua Principal, 123 – Centro</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Phone size={18} className="text-gold shrink-0 mt-0.5" />
                <span>(00) 00000-0000</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock size={18} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <p>Seg – Sex: 09:00 – 20:00</p>
                  <p>Sáb: 08:00 – 18:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground/60 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Barbearia JoãoS · Todos os direitos reservados
          </p>
          
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gold transition-colors flex items-center gap-2 text-xs uppercase tracking-wider group"
            >
              Instagram <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};