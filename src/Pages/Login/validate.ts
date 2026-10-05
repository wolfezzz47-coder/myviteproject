import { z } from "zod";

export const loginSchema = z
    .object({
        email: z.string().email("Вкажіть коректно пошту"),
        password: z.string().min(6, "Пароль має містити 6 символів"),
    });