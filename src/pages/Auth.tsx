import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Check, X } from 'lucide-react';
import { SEO } from '@/components/SEO';

// Password validation schema
const validatePassword = (password: string) => {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\;'/`~]/.test(password),
  };
};

const isPasswordValid = (password: string) => {
  const validation = validatePassword(password);
  return Object.values(validation).every(Boolean);
};

interface PasswordRequirementProps {
  met: boolean;
  text: string;
}

const PasswordRequirement = ({ met, text }: PasswordRequirementProps) => (
  <div className={`flex items-center gap-2 text-sm ${met ? 'text-green-600' : 'text-muted-foreground'}`}>
    {met ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
    <span>{text}</span>
  </div>
);

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const { signIn, signUp, resetPassword, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordValidation = validatePassword(password);
  const newPasswordValidation = validatePassword(newPassword);

  useEffect(() => {
    // Check if we're in password recovery mode
    const checkRecoveryMode = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const type = hashParams.get('type');
      
      if (type === 'recovery') {
        setIsRecoveryMode(true);
        return;
      }
    };
    
    checkRecoveryMode();
  }, []);

  useEffect(() => {
    // Only redirect if not in recovery mode
    if (user && !isRecoveryMode) {
      navigate('/');
    }
  }, [user, navigate, isRecoveryMode]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn(email, password);
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPasswordValid(password)) {
      toast({
        title: "Contraseña débil",
        description: "La contraseña debe cumplir todos los requisitos de seguridad",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    const { error } = await signUp(email, password);
    if (!error) {
      setEmail('');
      setPassword('');
    }
    setLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await resetPassword(email);
    setLoading(false);
    setShowResetPassword(false);
    setEmail('');
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    if (!isPasswordValid(newPassword)) {
      toast({
        title: "Contraseña débil",
        description: "La contraseña debe cumplir todos los requisitos de seguridad",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada exitosamente.",
      });
      setIsRecoveryMode(false);
      setNewPassword('');
      setConfirmPassword('');
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Acceso" description="Acceso al panel de Grupo Cultural Dauro." noindex />
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Acceso Grupo Dauro</CardTitle>
            <CardDescription>
              Inicia sesión o crea una cuenta para acceder al panel de administración
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isRecoveryMode ? (
              <div className="space-y-4">
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nueva Contraseña</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    {newPassword && (
                      <div className="mt-2 p-3 bg-muted rounded-lg space-y-1">
                        <PasswordRequirement met={newPasswordValidation.minLength} text="Mínimo 8 caracteres" />
                        <PasswordRequirement met={newPasswordValidation.hasUppercase} text="Una letra mayúscula" />
                        <PasswordRequirement met={newPasswordValidation.hasLowercase} text="Una letra minúscula" />
                        <PasswordRequirement met={newPasswordValidation.hasNumber} text="Un número" />
                        <PasswordRequirement met={newPasswordValidation.hasSymbol} text="Un símbolo (!@#$%...)" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {confirmPassword && newPassword !== confirmPassword && (
                      <p className="text-sm text-destructive">Las contraseñas no coinciden</p>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading || !isPasswordValid(newPassword) || newPassword !== confirmPassword}>
                    {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
                  </Button>
                </form>
              </div>
            ) : showResetPassword ? (
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowResetPassword(false)}
                  className="mb-4"
                >
                  ← Volver al inicio de sesión
                </Button>
                
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="info@grupodauro.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
                  </Button>
                </form>
              </div>
            ) : (
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                  <TabsTrigger value="signup">Registrarse</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="info@grupodauro.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Contraseña</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </Button>
                  </form>
                  
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline w-full text-center"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowResetPassword(true);
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </TabsContent>
              
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="info@grupodauro.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Contraseña</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setShowPasswordRequirements(true)}
                        required
                      />
                      {showPasswordRequirements && password && (
                        <div className="mt-2 p-3 bg-muted rounded-lg space-y-1">
                          <PasswordRequirement met={passwordValidation.minLength} text="Mínimo 8 caracteres" />
                          <PasswordRequirement met={passwordValidation.hasUppercase} text="Una letra mayúscula" />
                          <PasswordRequirement met={passwordValidation.hasLowercase} text="Una letra minúscula" />
                          <PasswordRequirement met={passwordValidation.hasNumber} text="Un número" />
                          <PasswordRequirement met={passwordValidation.hasSymbol} text="Un símbolo (!@#$%...)" />
                        </div>
                      )}
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading || !isPasswordValid(password)}>
                      {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}
