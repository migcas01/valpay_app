import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { authClient } from "../../../auth/client";
import { Button } from "../../../shared";

export function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    if (signInError) {
      setError("Invalid email or password");
      setIsLoading(false);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
      <div className="md:min-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-md mb-4">
            <span className="text-white font-bold text-2xl">V</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Bienvenido a Valpay
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Ingresa a tu panel de control de pagos
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1"
              >
                Correo electrónico
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="nombre@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label
                  htmlFor="password"
                  className="text-[11px] font-bold text-gray-400 uppercase tracking-wider"
                >
                  Contraseña
                </label>
                <a
                  href="#"
                  className="text-[11px] font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-center px-1">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-gray-600 cursor-pointer select-none"
              >
                Recordar sesión
              </label>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <span>Entrar al Dashboard</span>
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="flex gap-2 justify-center text-center mt-8 text-sm text-gray-500">
          <p>¿No tienes una cuenta?</p>
          <a href="#" className="font-bold text-amber-600 hover:text-amber-700">
            Regístrate gratis
          </a>
        </p>
      </div>
    </div>
  );
}
