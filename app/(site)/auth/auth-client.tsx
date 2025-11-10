'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import SectionHeading from '@/components/section-heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function AuthClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp, signInWithGoogle } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
        toast({
          title: "Account created",
          description: "Welcome to LA PIQÛRE. Your account has been created successfully.",
        });
      } else {
        await signIn(email, password);
        toast({
          title: "Welcome back",
          description: "You've successfully signed in.",
        });
      }
      router.push('/');
    } catch (err: any) {
      const message = err.message || 'Authentication failed';
      setError(message);
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
      toast({
        title: "Signed in with Google",
        description: "Welcome to LA PIQÛRE.",
      });
      router.push('/');
    } catch (err: any) {
      const message = err.message || 'Google sign-in failed';
      setError(message);
      toast({
        variant: "destructive",
        title: "Sign-in failed",
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="max-w-md w-full mx-auto px-6">
        <div className="text-center mb-12">
          <SectionHeading className="mb-4">Members</SectionHeading>
          <h1 className="font-display text-3xl tracking-luxury text-ink mb-4">
            Exclusive Access
          </h1>
          <p className="font-sans text-sm leading-relaxed text-ink-700">
            {isSignUp 
              ? 'Create an account to access exclusive pieces and early releases.'
              : 'Sign in to access early releases, private archive viewings, and exclusive pieces.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-accent-burgundy/10 border border-accent-burgundy/20">
            <p className="font-sans text-sm text-accent-burgundy text-center">{error}</p>
          </div>
        )}

        <div className="bg-sand/10 p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-display text-xs tracking-luxury uppercase">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-display text-xs tracking-luxury uppercase">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-12"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-ink text-paper px-8 py-3 text-xs font-sans tracking-editorial uppercase hover:bg-ink-800 hover:shadow-2xl hover:scale-105 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-sand/10 font-sans text-ink-700 uppercase tracking-editorial">
                Or
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-paper border border-border text-ink px-8 py-3 text-xs font-sans tracking-editorial uppercase hover:bg-sand/10 hover:border-ink transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue with Google
          </button>

          <div className="text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="font-sans text-xs text-ink-700 hover:text-ink transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="font-sans text-xs text-ink-700 leading-relaxed">
            Membership includes early collection previews, private archive viewings, 
            and exclusive access to limited pieces.
          </p>
        </div>
      </div>
    </div>
  );
}
