import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FrappeConfig, FrappeContext, useFrappeAuth } from "frappe-react-sdk";
import { Link } from "react-router-dom";
import GoogleSignIn from "@/components/auth/GoogleSignIn";
import SetPassword from "@/components/auth/SetPassword";
import { toast } from "@/hooks/use-toast";
import { CurrentUserProvider, useCurrentUser } from './CurrentUser';

interface SignupFormInput {
  first_name: string;
  last_name: string;
  email: string;
}

const SignupContent = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupFormInput>();
  const { call } = useContext(FrappeContext) as FrappeConfig;
  const { login, currentUser } = useFrappeAuth();
  const { showDialog, mutate } = useCurrentUser();
  const [errorMessage, setErrorMessage] = useState("");
  const defaultPassword = "Welcome@1234";
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  const onSubmit: SubmitHandler<SignupFormInput> = async (data) => {
    try {
      const response = await call.post(
        "frappe.core.doctype.user.user.sign_up",
        {
          email: data.email,
          full_name: `${data.first_name} ${data.last_name}`,
          redirect_to: "/dashboard",
        }
      );

      const [status, message] = response.message;

      if (status === 1 || status === 2) {
        try {
          await login({
            username: data.email,
            password: defaultPassword,
          });

          // Force refresh of the current user data
          await mutate();

          showDialog(
            "Account Created",
            "Your account has been created successfully. Please set your password now."
          );

          setOpenPasswordDialog(true);
        } catch (loginError) {
          console.error("Auto-login failed:", loginError);
          setErrorMessage(
            "Account created, but auto-login failed. Please try logging in manually."
          );
        }
      } else {
        setErrorMessage(message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  {...register("first_name", { required: true })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  {...register("last_name", { required: true })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="wars@example.com"
                {...register("email", { required: true })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create an account"}
            </Button>
          </form>
          <GoogleSignIn />
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Cover Image"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Set Password Dialog */}
      {currentUser && (
        <SetPassword
          open={openPasswordDialog}
          onOpenChange={setOpenPasswordDialog}
        />
      )}
    </div>
  );
};

const Signup = () => {
  return (
    <CurrentUserProvider>
      <SignupContent />
    </CurrentUserProvider>
  );
};

export default Signup;
