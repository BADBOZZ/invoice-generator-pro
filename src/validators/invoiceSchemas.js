const { z } = require('zod');

const isoDateSchema = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: 'Invalid ISO date.',
  });

const invoiceItemSchema = z.object({
  description: z.string().min(1).max(200),
  quantity: z.number().int().min(1).max(1000),
  unitPrice: z.number().min(0.01).max(100000),
  taxRate: z.number().min(0).max(100).optional(),
});

const invoiceCreateSchema = z.object({
  customerName: z.string().min(2).max(120),
  customerEmail: z.string().email(),
  currency: z.string().length(3),
  dueDate: isoDateSchema,
  notes: z.string().max(2000).optional(),
  items: z.array(invoiceItemSchema).min(1).max(100),
});

const invoiceIdSchema = z.object({
  id: z.string().uuid({ message: 'Invoice ID must be a valid UUID.' }),
});

module.exports = {
  invoiceCreateSchema,
  invoiceIdSchema,
};
