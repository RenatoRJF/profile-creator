import { z } from 'zod';

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),

  bio: z
    .string()
    .max(500, 'Bio must be less than 500 characters')
    .optional()
    .or(z.literal('')),

  profileImageUrl: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),

  skills: z
    .string()
    .min(1, 'At least one skill is required')
    .transform((val) =>
      val.split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    )
    .refine((skills) => skills.length > 0, {
      message: 'At least one skill is required',
    })
    .refine((skills) => skills.length <= 20, {
      message: 'Maximum 20 skills allowed',
    }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
