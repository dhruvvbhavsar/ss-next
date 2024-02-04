import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email({
        message: "Please provide a valid email"
    }),
    password: z.string().min(8, {
        message: "Must be of 8 Characters."
    })
})

export const registerSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	gender: z.string(),
	caste: z.string(),
	dateOfBirth: z.string(),
	timeOfBirth: z.string(),
	city: z.string(),
    state: z.string(),
	country: z.string(),
	maritalStatus: z.string(),
	other_caste: z.string().optional(),
	passwordHash: z.string().min(8, {message: "Must be of 8 Characters"}),
    confirmPassword: z.string().min(8, {message: "Must be of 8 Characters"}),
	mobileNumber: z.string().min(10).max(10),
	email: z.string().email()
})