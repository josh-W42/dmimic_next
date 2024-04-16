'use server';

import { z } from 'zod';
import prisma from '../prisma';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: 'Server must have a name',
    })
    .trim()
    .min(3, { message: 'Server names Must at least be 3 characters long' }),
  description: z.string(),
  isPublic: z.boolean({
    required_error: 'Please state if the server is Public or Private.',
    invalid_type_error: 'isPublic must be a boolean',
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const CreateServer = FormSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type State = {
  errors?: {
    name?: string[] | undefined;
    description?: string[] | undefined;
    isPublic?: string[] | undefined;
  };
  message?: string | null;
};

export async function createServer(initialState: State, formData: FormData) {
  // Validation
  const validatedFields = CreateServer.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    isPublic: formData.get('isPublic') ? true : false,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Server',
    };
  }

  const { name, description, isPublic } = validatedFields.data;
  const date = new Date();

  try {
    await prisma.servers.create({
      data: {
        id: nanoid(),
        name,
        description,
        isPublic,
        createdAt: date,
        updatedAt: date,
      },
    });

    revalidatePath('/servers');
    redirect('/servers');
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Server',
    };
  }
}
