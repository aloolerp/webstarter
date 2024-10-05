import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useFrappeAuth, useFrappeCreateDoc } from 'frappe-react-sdk';
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleSignIn from './GoogleSignIn';
interface LoginFormInput {
  usernameOrEmail: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<LoginFormInput>();
  const { login } = useFrappeAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    setLoginError(null); // Reset error state before trying to log in

    try {
      // Check if the user is 'Administrator' and handle login accordingly
      const isAdministrator = data.usernameOrEmail === 'Administrator';
      const username = isAdministrator ? 'Administrator' : data.usernameOrEmail;

      // Perform login
      await login({ username, password: data.password });
      reset();
      navigate('/home');
    } catch (err: any) {
      if (err?.message?.includes('User does not exist')) {
        setLoginError('User does not exist.');
      } else if (err?.message?.includes('Incorrect password')) {
        setLoginError('Incorrect password.');
      } else {
        setLoginError('Login failed. Please try again.');
      }
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          {loginError && (
            <div className="text-red-500 text-center">
              {loginError}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="usernameOrEmail">Email</Label>
              <Input
                id="usernameOrEmail"
                type="text"
                placeholder="warsame@example.com"
                {...register('usernameOrEmail', { required: 'Email or username is required' })}
              />
              {errors.usernameOrEmail && <span className="text-red-500">{errors.usernameOrEmail.message}</span>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={passwordVisible ? 'text' : 'password'}
                  {...register('password', { required: 'Password is required' })}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-2 top-2"
                >
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
              </div>
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <GoogleSignIn />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img src="/placeholder.svg" alt="Cover Image" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default Login;
