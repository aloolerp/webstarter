import React, { useState } from 'react';
import { CurrentUserProvider, useCurrentUser } from './CurrentUser';
import SetPassword from './SetPassword';
import { Button } from "@/components/ui/button";

const SetPasswordPageContent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to set your password.</div>;
  }

  return (
    <div>
      <h1>Set Your Password</h1>
      <Button onClick={() => setIsOpen(true)}>Open Set Password Dialog</Button>
      <SetPassword open={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
};

const SetPasswordPage: React.FC = () => {
  return (
    <CurrentUserProvider>
      <SetPasswordPageContent />
    </CurrentUserProvider>
  );
};

export default SetPasswordPage;