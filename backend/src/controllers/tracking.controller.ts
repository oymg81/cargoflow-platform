import { Request, Response } from 'express';

// Mock data to match frontend tracking format
const getMockTrackingData = (trackingNumber: string) => ({
  trackingNumber,
  status: 'In Transit',
  eta: 'May 12, 2026',
  destination: 'Miami, FL, USA',
  origin: 'Shanghai, China',
  timeline: [
    { status: 'Shipment Picked Up', location: 'Shanghai, China', date: 'May 05, 2026', completed: true },
    { status: 'Processed at Origin Hub', location: 'Shanghai, China', date: 'May 06, 2026', completed: true },
    { status: 'Departed Facility', location: 'Shanghai, China', date: 'May 07, 2026', completed: true },
    { status: 'In Transit', location: 'Ocean Transit', date: 'May 08, 2026', completed: true },
    { status: 'Arrived at Destination Port', location: 'Los Angeles, CA', date: 'Pending', completed: false },
    { status: 'Out for Delivery', location: 'Miami, FL', date: 'Pending', completed: false },
  ]
});

export const getTrackingStatus = async (req: Request, res: Response) => {
  try {
    const { trackingNumber } = req.params;
    
    if (!trackingNumber) {
      return res.status(400).json({ success: false, message: 'Tracking number is required' });
    }

    // In a real application, we would query the database using Prisma here
    // const shipment = await prisma.shipment.findUnique({ where: { trackingNumber } })
    
    // For MVP/Foundation, return mock data
    const trackingData = getMockTrackingData(trackingNumber);
    
    res.status(200).json({
      success: true,
      data: trackingData
    });
  } catch (error) {
    console.error('Error in getTrackingStatus:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
