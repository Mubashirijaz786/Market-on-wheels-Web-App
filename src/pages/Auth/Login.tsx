import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide both email and password.');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      login(email);
      setLoading(false);
      navigate('/');
    }, 600);
  };

  const handleDemoLogin = () => {
    login('ahmed.malik@example.com');
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        {/* Brand */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold text-slate-900">
              Market on <span className="text-brand-600">Wheels</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-500">
            Sign in to access your multi-vendor cart and saved delivery addresses
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold">
              {error}
            </div>
          )}

          <Input
            label="Email or Mobile Phone"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="ahmed.malik@example.com"
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
              />
              <span>Remember me</span>
            </label>
            <Link to="/auth/forgot-password" className="text-brand-600 hover:text-brand-700 font-bold">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full font-bold shadow-md"
            isLoading={loading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign In to Account
          </Button>

          {/* Quick Demo Login Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 rounded-xl border border-dashed border-brand-300 bg-brand-50/70 hover:bg-brand-100 text-brand-800 text-xs font-bold transition-colors"
          >
            ⚡ One-Click Demo Customer Login (Ahmed Malik)
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-100">
          Don't have an account yet?{' '}
          <Link to="/auth/register" className="text-brand-600 font-bold hover:underline">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
};
