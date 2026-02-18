import { MapPin, Clock, Phone, Instagram } from "lucide-react";

const hours = [
  { day: "Segunda – Sexta", time: "09:00 – 20:00" },
  { day: "Sábado", time: "08:00 – 18:00" },
  { day: "Domingo", time: "Fechado" },
];

export const LocationSection = () => {
  return (
    <section id="location" className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">Onde estamos</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Localização
          </h2>
          <div className="flex items-center justify-center">
            <div className="h-px w-20 bg-gold/50" />
            <div className="mx-3 w-2 h-2 rounded-full bg-gold" />
            <div className="h-px w-20 bg-gold/50" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-8">
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                <MapPin className="text-gold" size={20} />
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground mb-1">Endereço</h4>
                <p className="text-muted-foreground">Rua Principal, 123 – Centro</p>
                <p className="text-muted-foreground">Sua cidade – Estado</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Clock className="text-gold" size={20} />
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground mb-3">Horários</h4>
                <div className="space-y-2">
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-6 text-sm">
                      <span className="text-muted-foreground">{h.day}</span>
                      <span className={h.time === "Fechado" ? "text-destructive" : "text-gold font-medium"}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Phone className="text-gold" size={20} />
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground mb-1">Contato</h4>
                <a href="tel:+5500000000000" className="text-muted-foreground hover:text-gold transition-colors">
                  (00) 00000-0000
                </a>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Instagram className="text-gold" size={20} />
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground mb-1">Instagram</h4>
                <a
                  href="https://instagram.com/barbeariajaoaos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-gold transition-colors"
                >
                  @barbeariajaoaos
                </a>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="rounded-lg overflow-hidden border border-border min-h-[320px] flex items-center justify-center" style={{ background: "var(--gradient-card)" }}>
            <div className="text-center p-8">
              <MapPin size={48} className="text-gold/40 mx-auto mb-4" />
              <p className="font-display text-foreground text-lg mb-2">Barbearia JoãoS</p>
              <p className="text-muted-foreground text-sm mb-6">Adicione seu endereço para aparecer o mapa</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold text-sm hover:text-gold-light transition-colors border border-gold/30 rounded px-4 py-2 hover:border-gold"
              >
                <MapPin size={14} />
                Abrir no Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
