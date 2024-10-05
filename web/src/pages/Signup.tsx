// src/components/Signup.tsx

import React, { useState, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog } from "@/components/ui/dialog";
import { FrappeContext, useFrappeAuth } from 'frappe-react-sdk';
import { Link, useNavigate } from 'react-router-dom';
import GoogleSignIn from './GoogleSignIn';
import SetPassword from './SetPassword'; // Import the SetPassword component

interface SignupFormInput {
  first_name: string;
  last_name: string;
  email: string;
}

const Signup = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<SignupFormInput>();
  const { call } = useContext(FrappeContext);
  const { login } = useFrappeAuth(); // Extract the login function from Frappe SDK
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const defaultPassword = "Welcome@1234"; // Default password

  const onSubmit: SubmitHandler<SignupFormInput> = async (data) => {
    try {
      // Use Frappe's built-in sign_up method for signup
      const response = await call.post('frappe.core.doctype.user.user.sign_up', {
        email: data.email,
        full_name: `${data.first_name} ${data.last_name}`,
        redirect_to: '/home',
      });

      const [status, message] = response.message;

      if (status === 1 || status === 2) {
        // Auto login after successful signup
        await login({ username: data.email, password: defaultPassword });

        // Close the signup dialog and open the password creation dialog
        reset();
        setOpenDialog(true); // Open the SetPassword dialog
      } else {
        // Show error message
        setErrorMessage(message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-muted-foreground">Enter your information to create an account</p>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-center">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  {...register('first_name', { required: true })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  {...register('last_name', { required: true })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="wars@example.com"
                {...register('email', { required: true })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create an account'}
            </Button>
          </form>
          <GoogleSignIn />
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img src="/placeholder.svg" alt="Cover Image" className="h-full w-full object-cover" />
      </div>

      {/* Set Password Dialog */}
      <SetPassword open={openDialog} onOpenChange={setOpenDialog} />
    </div>
  );
};

export default Signup;
