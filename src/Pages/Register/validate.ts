import { z } from "zod";

export const RegisterSchema = z
    .object({
        email: z.string().email("Вкажіть коректно пошту"),
        password: z.string().min(6, "Пароль має містити 6 символів"),
    });

