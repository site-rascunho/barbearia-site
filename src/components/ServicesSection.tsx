import { Scissors } from "lucide-react";
// IMPORTANTE: Adicione as imagens na pasta assets ou ajuste os caminhos abaixo
import beardImg from "@/assets/service-beard.png"; // Exemplo: foto para Barba
import comboImg from "@/assets/service-combo.png"; // Exemplo: foto para Corte + Barba
import browsImg from "@/assets/service-brows.png"; // Exemplo: foto para Sobrancelha

// Interface para tipar corretamente os serviços (pode ser imagem ou ícone)
type ServiceItem = {
  title: string;
  description: string;
  price: string;
  duration: string;
  type: "icon" | "image";
  icon?: React.ElementType;
  image?: string;
};

const services: ServiceItem[] = [
  {
    type: "icon",
    icon: Scissors,
    title: "Corte Masculino",
    description: "Corte clássico ou moderno, feito com técnica e precisão para realçar seu estilo.",
    price: "R$ 30",
    duration: "45 min",
  },
  {
    type: "image",
    image: beardImg,
    title: "Barba",
    description: "Modelagem e acabamento perfeito da barba com navalha e produtos premium.",
    price: "R$ 20",
    duration: "30 min",
  },
  {
    type: "image",
    image: comboImg,
    title: "Corte + Barba",
    description: "Combo completo: corte personalizado e tratamento completo da barba.",
    price: "R$ 45",
    duration: "75 min",
  },
  {
    type: "image",
    image: browsImg,
    title: "Sobrancelha",
    description: "Design e acabamento das sobrancelhas para um visual impecável.",
    price: "R$ 10",
    duration: "15 min",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">O que oferecemos</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nossos Serviços
          </h2>
          <div className="flex items-center justify-center">
            <div className="h-px w-20 bg-gold/50" />
            <div className="mx-3 w-2 h-2 rounded-full bg-gold" />
            <div className="h-px w-20 bg-gold/50" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative rounded-lg p-6 border border-border hover:border-gold/50 transition-all duration-300"
              style={{ background: "var(--gradient-card)" }}
            >
              {/* Gold top accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-lg gradient-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="mb-5">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/20 group-hover:bg-gold/20 transition-colors duration-300 overflow-hidden">
                  {service.type === "icon" && service.icon ? (
                    <service.icon size={28} className="text-gold" />
                  ) : (
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </div>
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border/60">
                <span className="text-gold font-display font-bold text-xl">{service.price}</span>
                <span className="text-muted-foreground text-xs tracking-wide">{service.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};