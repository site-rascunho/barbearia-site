import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User, Menu, X } from "lucide-react";
import logoImg from "@/assets/logo.png";

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Início", href: "#hero" },
    { label: "Serviços", href: "#services" },
    { label: "Galeria", href: "#gallery" },
    { label: "Localização", href: "#location" },
  ];

  const displayName =
    user?.user_metadata?.full_name ||
    user?.phone ||
    user?.email ||
    "Usuário";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#hero">
              <img src={logoImg} alt="JoãoS Barbearia" className="h-10 w-auto" />
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-gold transition-colors text-sm tracking-widest uppercase font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Auth button */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User size={16} className="text-gold" />
                    <span className="truncate max-w-[160px]">{displayName}</span>
                  </div>
                  <Button
                    onClick={signOut}
                    variant="outline"
                    size="sm"
                    className="border-gold/40 text-gold hover:bg-gold/10 hover:border-gold gap-2"
                  >
                    <LogOut size={14} />
                    Sair
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setAuthOpen(true)}
                  size="sm"
                  className="gradient-gold text-primary-foreground font-semibold tracking-wider uppercase gap-2 shadow-gold hover:opacity-90 transition-opacity"
                >
                  <LogIn size={14} />
                  Entrar
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-muted-foreground hover:text-foreground"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden glass border-t border-border/40 py-4 px-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-muted-foreground hover:text-gold transition-colors text-sm tracking-widest uppercase"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-border/40">
              {user ? (
                <Button
                  onClick={() => { signOut(); setMenuOpen(false); }}
                  variant="outline"
                  className="w-full border-gold/40 text-gold hover:bg-gold/10 gap-2"
                >
                  <LogOut size={14} />
                  Sair
                </Button>
              ) : (
                <Button
                  onClick={() => { setAuthOpen(true); setMenuOpen(false); }}
                  className="w-full gradient-gold text-primary-foreground font-semibold gap-2 shadow-gold"
                >
                  <LogIn size={14} />
                  Entrar
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};
