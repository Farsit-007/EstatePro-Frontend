

import { z } from 'zod';

export const houseSchema = z.object({
 
    name: z.string({ required_error: 'Please provide a Name' }),
    location: z.string({ required_error: 'Please provide a location' }),
    description: z.string({ required_error: 'Please provide a description' }),
    amount: z
      .string({
        required_error: 'House price is required',
      })
      .min(0, 'House price cannot be less than 0'),
    rooms: z.string({ required_error: 'Please provide a roomss' }),
    amenities : z.string({ required_error: 'Please provide house images' })
  
});