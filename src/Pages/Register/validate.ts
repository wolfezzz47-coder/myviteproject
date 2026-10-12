import { z } from "zod";

export const RegisterSchema = z
    .object({
        email: z.string().email("Вкажіть коректно пошту"),
        password: z.string().min(6, "Пароль має містити 6 символів"),
        firstName: z
            .string()
            .min(2, "Ім'я має містити мінімум 2 символи")
            .max(20, "Ім'я занадто довге"),
        lastName: z
            .string()
            .min(2, "Прізвище має містити мінімум 2 символи")
            .max(20, "Прізвище занадто довге"),
    });

