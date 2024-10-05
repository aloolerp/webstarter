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
} from "../ui/dialog"; // Import Dialog from shadcn

interface Newsletter2Props {
    title?: string;
    subtitle?: string;
    email_group?: string;  // To allow custom email group names dynamically
    image?: string; // Image prop for dynamic image
}

const Newsletter2 = ({ title = "Newsletter Signup", subtitle = "Egestas consectetur a cras aliquam tincidunt tellus quam.", email_group = 'Newsletter Group', image }: Newsletter2Props) => {
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
    <section className="relative w-full max-w-7xl mx-auto my-16 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Content */}
      <div className="grid md:grid-cols-[1fr_0.5fr]">
        {/* Newsletter Form */}
        <div className="flex flex-col justify-center px-6 py-12 sm:pl-12 sm:pr-20 md:py-16">
          {/* Title */}
          {title && (
            <h3 className="mb-2 text-2xl font-bold md:text-4xl">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mb-6 text-sm text-gray-500 sm:text-base lg:mb-8">
              {subtitle}
            </p>
          )}
          {/* Form */}
          <form onSubmit={handleSubscribe} className="relative mb-4 max-w-full">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black placeholder:text-black"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="relative top-2 sm:top-1/2 sm:-translate-y-1/2 w-full cursor-pointer rounded-md bg-black px-6 py-2 font-semibold text-white sm:absolute sm:right-1 sm:w-36"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          <p className="text-sm text-gray-500">
            Zero spam. Only quality pixels.
          </p>
        </div>
        
        {/* Image */}
        {image && (
          <img
            src={image}
            alt="Newsletter Image"
            className="inline-block h-full max-h-60 w-full object-cover [grid-area:1/1/2/2] sm:max-h-full sm:[grid-area:1/2/2/3]"
          />
        )}
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

export default Newsletter2;