import { useState, useContext } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useFrappeCreateDoc, useFrappeGetDoc } from 'frappe-react-sdk';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../ui/card';
import { FrappeContext, FrappeConfig } from 'frappe-react-sdk';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    message: ''
  });

  const { call } = useContext(FrappeContext) as FrappeConfig;
  const { createDoc } = useFrappeCreateDoc();
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: settings, error: settingsError } = useFrappeGetDoc('Contact Us Settings', 'Contact Us Settings');
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (fieldname: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldname]: value }));
    if (fieldname === 'email') {
      setErrorMessage(validateEmail(value) ? "" : "Please enter a valid email address");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    try {
      setIsSubmitting(true);

      // Make API request to Frappe's send_message method
      await call.post('frappe.www.contact.send_message', {
        sender: formData.email,
        message: formData.message,
        
      });

      // Create a new Contact Form record in Frappe
      await createDoc('Contact Form', {
        full_name: formData.full_name,
        email: formData.email,
        message: formData.message,
      });

      // Reset form and show the thank-you dialog
      setFormData({
        full_name: '',
        email: '',
        message: ''
      });
      setOpenDialog(true);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (settingsError) return <div>Error loading Contact Us Settings</div>;

  return (
    <>
      <Card className="max-w-lg mx-auto shadow-lg rounded-lg">
        <CardHeader>
          {settings && (
            <>
              <h1 className="text-xl font-bold">{settings.heading}</h1>
              <div
                dangerouslySetInnerHTML={{ __html: settings.introduction }}
                className="prose"
              />
            </>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={formData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Your email"
                type="email"
                required
              />
              {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            </div>

            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Your message"
                required
              />
            </div>

            <Button type="submit" disabled={isSubmitting || !!errorMessage} className="w-full">
              {isSubmitting ? 'Sending...' : 'Submit'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Thank You Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle>Thank You!</DialogTitle>
            <DialogDescription>
              Your message has been successfully sent. We will respond as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="primary" onClick={() => navigate('/')}>Go to Home</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactForm;