import React, { useState } from 'react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFrappeCreateDoc, useFrappeGetDocList } from 'frappe-react-sdk';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"; // Import Dialog from shadcn

interface NewsletterProps {
  title?: string;
  subtitle?: string;
  email_group?: string;  // To allow custom email group names dynamically
}

const Newsletter = ({ title, subtitle, email_group = 'Newsletter Group' }: NewsletterProps) => {
  const [email, setEmail] = useState('');
  const [emailGroup, setEmailGroup] = useState(email_group); // Dynamic email group
  const [isDialogOpen, setIsDialogOpen] = useState(false);  // State for Dialog
  const { createDoc, isSubmitting } = useFrappeCreateDoc();
  const { data: emailGroups, error: emailGroupsError } = useFrappeGetDocList('Email Group', {});

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const existingGroup = emailGroups?.find((group) => group.name === emailGroup);

      if (!existingGroup) {
        await createDoc('Email Group', {
          title: emailGroup,
          email_group_name: emailGroup,
        });
      }

      await createDoc('Email Group Member', {
        email_group: emailGroup,
        email: email,
      });

      setEmail(''); // Clear the email field
      setIsDialogOpen(true); // Open thank-you dialog
    } catch (error) {
      console.error("Subscription error: ", error);
      alert("Failed to subscribe, please try again.");
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
      <div className="bg-gray-100 p-8 text-center sm:p-10 md:p-16 rounded-lg shadow-lg">
        {title && (
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mx-auto mb-6 max-w-2xl text-sm md:mb-10 lg:mb-12">
            {subtitle}
          </p>
        )}
        <div className="mx-auto mb-4 flex max-w-lg justify-center">
          <form onSubmit={handleSubscribe} className="flex w-full flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Notify me'}
            </Button>
          </form>
        </div>
      </div>

      {/* Thank You Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle>Thank You!</DialogTitle>
            <DialogDescription>
              You have successfully subscribed to our newsletter.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Newsletter;