import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { Scissors, ChevronDown } from "lucide-react";
import heroImg from "@/assets/barbershop-2.jpg";
// Removi a importação da imagem da logo pois não será mais usada

export const HeroSection = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const { user } = useAuth();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      
      {/* Dark overlay com gradiente mais suave */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(0 0% 0% / 0.8) 0%, hsl(0 0% 5% / 0.95) 100%)" }} />

      {/* Efeito de vinheta dourada sutil */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(42 80% 52% / 0.08) 0%, transparent 70%)" }} />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Nova Logo em Texto */}
        <div className="flex flex-col items-center justify-center mb-10 animate-fade-in select-none">
          <h1 className="font-display italic font-bold text-8xl md:text-9xl leading-none gradient-text drop-shadow-2xl tracking-tight">
            JoãoS
          </h1>
          <span className="font-elegant text-gold/90 text-xl md:text-2xl tracking-[0.4em] uppercase mt-2 font-light">
            Barbearia
          </span>
        </div>

        {/* Tagline com linhas em gradiente */}
        <div className="flex items-center justify-center gap-4 mb-8 opacity-90">
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent via-gold/50 to-gold" />
          <p className="font-sans text-gold text-xs md:text-sm tracking-[0.3em] uppercase font-medium">
            Desde 2019
          </p>
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent via-gold/50 to-gold" />
        </div>

        {/* Título Principal */}
        <h2 className="font-display text-4xl md:text-6xl font-medium text-foreground mb-6 leading-tight max-w-4xl">
          Estilo & Precisão <br className="hidden md:block" />
          <span className="text-gold italic">em cada detalhe</span>
        </h2>

        {/* Descrição */}
        <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Uma experiência única de barbearia que une tradição e modernidade, com atendimento personalizado e profissionais especializados.
        </p>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
          {!user && (
            <Button
              onClick={() => setAuthOpen(true)}
              size="lg"
              className="gradient-gold text-primary-foreground font-semibold tracking-wider uppercase px-10 py-7 shadow-gold hover:opacity-90 transition-all hover:scale-[1.02] text-base"
            >
              <Scissors className="mr-2" size={18} />
              Agendar Horário
            </Button>
          )}
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-gold/30 text-gold hover:bg-gold/5 hover:border-gold hover:text-gold-light uppercase tracking-wider px-10 py-7 text-base transition-all"
          >
            <a href="#services">Ver Serviços</a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/40 hover:text-gold transition-colors animate-bounce p-2"
        aria-label="Rolar para baixo"
      >
        <ChevronDown size={32} />
      </a>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </section>
  );
};