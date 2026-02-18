import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scissors } from "lucide-react";
import logoImg from "@/assets/logo.png";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Mode = "login" | "signup";

export const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const reset = () => {
    setError("");
    setSuccess("");
    setEmail("");
    setPassword("");
    setFullName("");
  };

  const switchMode = (m: Mode) => {
    reset();
    setMode(m);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(
          error.message === "Invalid login credentials"
            ? "Email ou senha incorretos."
            : error.message
        );
      } else {
        onOpenChange(false);
        reset();
      }
    } else {
      if (!fullName.trim()) {
        setError("Por favor, insira seu nome completo.");
        setLoading(false);
        return;
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Conta criada! Verifique seu email para confirmar o cadastro.");
      }
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass border-gold/20 p-0 overflow-hidden">
        <div className="relative">
          {/* Gold top bar */}
          <div className="h-1 w-full gradient-gold" />

          <div className="p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img src={logoImg} alt="JoãoS Barbearia" className="h-20 w-auto" />
            </div>

            <DialogHeader className="mb-6">
              <DialogTitle className="text-center font-display text-xl text-foreground">
                {mode === "login" ? "Entrar na sua conta" : "Criar nova conta"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-muted-foreground text-xs tracking-widest uppercase">
                    Nome completo
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Seu nome"
                    required
                    className="bg-secondary border-border focus:border-gold/60 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-muted-foreground text-xs tracking-widest uppercase">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="bg-secondary border-border focus:border-gold/60 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-muted-foreground text-xs tracking-widest uppercase">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="bg-secondary border-border focus:border-gold/60 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 rounded px-3 py-2">{error}</p>
              )}
              {success && (
                <p className="text-sm text-gold bg-gold/10 rounded px-3 py-2">{success}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full gradient-gold text-primary-foreground font-semibold tracking-wider uppercase text-sm py-5 shadow-gold hover:opacity-90 transition-opacity"
              >
                {loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-muted-foreground text-sm">
                {mode === "login" ? "Não tem conta?" : "Já tem conta?"}
              </span>{" "}
              <button
                onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                className="text-gold text-sm hover:text-gold-light transition-colors font-medium"
              >
                {mode === "login" ? "Criar conta" : "Entrar"}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
