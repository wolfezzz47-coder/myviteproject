import type { IRegisterType } from "./type.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./validate.ts";
import axios from "axios";
import { useState, useRef } from "react";

const RegisterPage = () => {
    const defaultValues: IRegisterType = {
        email: "",
        password: "",
    };
    // написав трохи коментарів
    // окремий стан для вибраного файлу
    const [avatar, setAvatar] = useState<File | null>(null);
    // для прев'ю
    const [preview, setPreview] = useState<string | null>(null);
    // щоб мати можливість скинути input
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegisterType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues,
    });

    // обробка вибору файлу
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (!file) return;

        // перевірка, що це справді картинка
        if (!file.type.startsWith("image/")) {
            alert("Будь ласка, оберіть файл зображення");
            return;
        }

        // обмеження розміру, наприклад 5 МБ
        if (file.size > 5 * 1024 * 1024) {
            alert("Файл занадто великий (макс. 5 МБ)");
            return;
        }

        setAvatar(file);

        // створюємо URL для прев'ю
        if (preview) URL.revokeObjectURL(preview);
        setPreview(URL.createObjectURL(file));
    };

    const handleRemoveAvatar = () => {
        if (preview) URL.revokeObjectURL(preview);
        setAvatar(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const onSubmit = async (data: IRegisterType) => {
        console.log("Result submit: ", data, "avatar:", avatar);

        const url = "https://qrcode31kn-api.itstep.click/api/Account/Register";

        try {
            // Формуємо multipart/form-data, бо передаємо файл
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("password", data.password);
            if (avatar) {
                formData.append("avatar", avatar); // ім'я поля має відповідати бекенду
            }

            const response = await axios.post(url, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Response server: ", response);
            alert("дані вказані вірно");
        } catch (e) {
            console.log("Помилка запиту: ", e);
            alert("дані вказані не вірно");
        }
    };

    return (
        <div className="flex items-center justify-center px-4 mt-20">
            <div className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                <h1 className="text-center font-bold text-3xl text-black-700">
                    Register Page
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Фото користувача */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="avatar preview"
                                    className="w-24 h-24 rounded-full object-cover border border-gray-300"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center px-2">
                                    Немає фото
                                </div>
                            )}

                            {preview && (
                                <button
                                    type="button"
                                    onClick={handleRemoveAvatar}
                                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600"
                                    aria-label="Видалити фото"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        <label className="cursor-pointer text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                            {preview ? "Змінити фото" : "Обрати фото"}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Електронна пошта
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Пароль
                        </label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium transition-colors"
                    >
                        Реєстрація
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;