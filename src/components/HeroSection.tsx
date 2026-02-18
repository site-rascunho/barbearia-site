import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { Scissors, ChevronDown } from "lucide-react";
import heroImg from "@/assets/barbershop-2.jpg";
import logoImg from "@/assets/logo.png";

export const HeroSection = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const { user } = useAuth();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(0 0% 0% / 0.75) 0%, hsl(0 0% 5% / 0.9) 100%)" }} />

      {/* Subtle gold vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(42 80% 52% / 0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <img
            src={logoImg}
            alt="JoãoS Barbearia"
            className="h-36 md:h-48 w-auto drop-shadow-2xl"
          />
        </div>

        {/* Tagline */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-gold/60" />
          <p className="font-elegant text-gold text-lg tracking-[0.3em] uppercase">
            Desde 2019
          </p>
          <div className="h-px w-16 bg-gold/60" />
        </div>

        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
          Estilo & Precisão<br />
          <span className="gradient-text">em cada corte</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-xl mx-auto font-light">
          Uma experiência única de barbearia com atendimento personalizado e profissionais especializados.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!user && (
            <Button
              onClick={() => setAuthOpen(true)}
              size="lg"
              className="gradient-gold text-primary-foreground font-semibold tracking-wider uppercase px-10 py-6 shadow-gold hover:opacity-90 transition-opacity text-base"
            >
              <Scissors className="mr-2" size={18} />
              Agendar Horário
            </Button>
          )}
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-gold/40 text-gold hover:bg-gold/10 hover:border-gold uppercase tracking-wider px-10 py-6 text-base"
          >
            <a href="#services">Ver Serviços</a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/60 hover:text-gold transition-colors animate-bounce"
      >
        <ChevronDown size={28} />
      </a>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </section>
  );
};
