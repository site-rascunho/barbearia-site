import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoImg from "@/assets/logo.png";
import { Phone, ArrowLeft } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "phone" | "otp";

export const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const reset = () => {
    setError("");
    setSuccess("");
    setPhone("");
    setOtp("");
    setFullName("");
    setStep("phone");
  };

  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const digits = value.replace(/\D/g, "");
    return digits;
  };

  const getFullPhone = () => {
    const digits = formatPhone(phone);
    // Se o usuário já incluiu +55, não adicionar novamente
    if (phone.startsWith("+")) {
      return phone.replace(/\D/g, "").replace(/^(\d+)/, "+$1");
    }
    // Adiciona +55 (Brasil) automaticamente
    return `+55${digits}`;
  };

  const formatDisplay = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 11);
    setPhone(raw);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const fullPhone = getFullPhone();

    if (formatPhone(phone).length < 10) {
      setError("Por favor, insira um número de telefone válido com DDD.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      phone: fullPhone,
      options: {
        data: fullName.trim() ? { full_name: fullName } : undefined,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Código enviado! Verifique seu celular.");
      setStep("otp");
    }

    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const fullPhone = getFullPhone();

    const { error } = await supabase.auth.verifyOtp({
      phone: fullPhone,
      token: otp,
      type: "sms",
    });

    if (error) {
      setError(
        error.message === "Token has expired or is invalid"
          ? "Código inválido ou expirado. Tente novamente."
          : error.message
      );
    } else {
      onOpenChange(false);
      reset();
    }

    setLoading(false);
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    const fullPhone = getFullPhone();

    const { error } = await supabase.auth.signInWithOtp({
      phone: fullPhone,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Novo código enviado!");
    }

    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val);
        if (!val) reset();
      }}
    >
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
                {step === "phone" ? "Entrar com seu celular" : "Confirmar código"}
              </DialogTitle>
              {step === "otp" && (
                <p className="text-center text-muted-foreground text-sm mt-2">
                  Enviamos um código SMS para{" "}
                  <span className="text-gold font-medium">
                    ({phone.slice(0, 2)}) {phone.slice(2, 7)}-{phone.slice(7)}
                  </span>
                </p>
              )}
            </DialogHeader>

            {step === "phone" ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="fullName"
                    className="text-muted-foreground text-xs tracking-widest uppercase"
                  >
                    Nome completo
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Seu nome"
                    className="bg-secondary border-border focus:border-gold/60 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground"
                  />
                  <p className="text-muted-foreground text-xs">
                    Opcional – preencha na primeira vez
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="phone"
                    className="text-muted-foreground text-xs tracking-widest uppercase"
                  >
                    Número de celular
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-muted-foreground text-sm pointer-events-none">
                      <Phone size={14} className="text-gold" />
                      <span>+55</span>
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      value={formatDisplay(phone)}
                      onChange={handlePhoneChange}
                      placeholder="(00) 00000-0000"
                      required
                      className="bg-secondary border-border focus:border-gold/60 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground pl-[4.5rem]"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 rounded px-3 py-2">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="text-sm text-gold bg-gold/10 rounded px-3 py-2">
                    {success}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-gold text-primary-foreground font-semibold tracking-wider uppercase text-sm py-5 shadow-gold hover:opacity-90 transition-opacity"
                >
                  {loading ? "Enviando..." : "Receber código SMS"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="otp"
                    className="text-muted-foreground text-xs tracking-widest uppercase"
                  >
                    Código de verificação
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    required
                    autoFocus
                    className="bg-secondary border-border focus:border-gold/60 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground text-center text-2xl tracking-[0.5em] font-mono"
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 rounded px-3 py-2">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="text-sm text-gold bg-gold/10 rounded px-3 py-2">
                    {success}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="w-full gradient-gold text-primary-foreground font-semibold tracking-wider uppercase text-sm py-5 shadow-gold hover:opacity-90 transition-opacity"
                >
                  {loading ? "Verificando..." : "Confirmar código"}
                </Button>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("phone");
                      setOtp("");
                      setError("");
                      setSuccess("");
                    }}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    <ArrowLeft size={14} />
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={loading}
                    className="text-gold text-sm hover:text-gold-light transition-colors font-medium"
                  >
                    Reenviar código
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
