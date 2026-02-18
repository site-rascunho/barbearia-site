import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { Scissors, ChevronDown } from "lucide-react";
import heroImg from "@/assets/barbershop-2-hero.png";
import logoImg from "@/assets/logo-texto.png";

export const HeroSection = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const { user } = useAuth();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden py-10 md:py-0">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      
      {/* Dark overlay suavizado */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(0 0% 0% / 0.8) 0%, hsl(0 0% 5% / 0.9) 100%)" }} />

      {/* Vinheta sutil */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(42 80% 52% / 0.05) 0%, transparent 70%)" }} />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Logo (Substituindo o texto "JoãoS") */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <img
            src={logoImg}
            alt="JoãoS Barbearia"
            className="h-28 md:h-36 w-auto drop-shadow-2xl opacity-95 hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Tagline Compacta */}
        <div className="flex items-center justify-center gap-3 mb-5 opacity-80">
          <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent via-gold/40 to-gold/80" />
          <p className="font-sans text-gold text-[10px] md:text-xs tracking-[0.4em] uppercase font-medium">
            Desde 2019
          </p>
          <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent via-gold/40 to-gold/80" />
        </div>

        {/* Título Principal - Tamanho reduzido e mais elegante */}
        <h1 className="font-display text-3xl md:text-5xl font-medium text-foreground mb-4 leading-tight">
          Estilo & Precisão <br className="hidden xs:block" />
          <span className="text-gold italic font-normal">em cada detalhe</span>
        </h1>

        {/* Descrição - Texto menor e mais próximo */}
        <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">
          Tradição e modernidade em uma experiência de barbearia única.
        </p>

        {/* Botões - Mais compactos */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto">
          {!user && (
            <Button
              onClick={() => setAuthOpen(true)}
              size="lg"
              className="gradient-gold text-primary-foreground font-semibold tracking-widest uppercase px-8 py-6 shadow-gold hover:opacity-90 hover:shadow-lg hover:shadow-gold/20 transition-all text-sm"
            >
              <Scissors className="mr-2" size={16} />
              Agendar
            </Button>
          )}
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-gold/30 text-gold hover:bg-gold/5 hover:border-gold hover:text-gold-light uppercase tracking-widest px-8 py-6 text-sm transition-all"
          >
            <a href="#services">Serviços</a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold/30 hover:text-gold transition-colors animate-bounce p-2"
        aria-label="Rolar para baixo"
      >
        <ChevronDown size={24} />
      </a>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </section>
  );
};