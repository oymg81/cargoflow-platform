import { Request, Response } from 'express';

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // In a real application, we would:
    // 1. Save to database using Prisma
    // 2. Send email notification using Resend/SendGrid to sales@logisti-k.us
    
    // Log the submission and simulate email notification
    console.log('New Contact Submission:', { firstName, lastName, email, subject });
    console.log('Notification email sent to destination/recipient: sales@logisti-k.us');

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
