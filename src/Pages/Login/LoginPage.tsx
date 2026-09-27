import type {ILoginType} from "./types.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "./validate.ts";
import axios from "axios";

const LoginPage = () =>
{
    const defaultValues: ILoginType = {
        email: "",
        password: "",
    }
    //console.log("defaultValues", defaultValues);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginType>({
        resolver: zodResolver(loginSchema),
        defaultValues
    });
    //console.log("Input", register);
    //console.log("Form", handleSubmit);

    const onSubmit = async (data: ILoginType) => {
        console.log("Result submit: ", data);
        //На сервері є користувач - admin@gmail.com - Admin123!
        //Є ще user - user@gmail.com - User123!
        const url = "https://qrcode31kn-api.itstep.click/api/Account/Login";
        // Найпростіший спосіб відправити запит на сервер - fetch, але я люблю axios
        try {
            const response = await axios.post(url, data);
            console.log("Response server: ", response);
            alert("дані вказані вірно");
        }
        catch (e) {
            console.log("Помилка запиту: ", e);
            alert("дані вказані не вірно");
        }
    }

    return (
        <>
            <div className="flex items-center justify-center px-4 mt-20">
                <div className="w-full max-w-md p-8 space-y-6 bg-white border
                border-gray-200 rounded-2xl shadow-sm">
                    <h1 className={"text-center font-bold text-3xl text-black-700"}>
                        Login Page
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className={"block text-sm font-medium text-gray-700 mb-1"}>
                                Електронна пошта
                            </label>
                            <input
                                type={"text"}
                                className={"w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm " +
                                    "focus:outline-none focus:ring-2 focus:ring-blue-500"}
                                {...register("email")}
                            />
                            {errors.email && <p className={"text-red-500 text-sm"}>{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className={"block text-sm font-medium text-gray-700 mb-1"}>
                                Пароль
                            </label>
                            <input
                                type={"password"}
                                className={"w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm " +
                                    "focus:outline-none focus:ring-2 focus:ring-blue-500"}
                                {...register("password")}
                            />
                            {errors.password && <p className={"text-red-500 text-sm"}>{errors.password.message}</p>}
                        </div>

                        <button type="submit"
                                className={"cursor-pointer w-full py-2.5 rounded-lg bg-indigo-600 " +
                                    "hover:bg-indigo-700 disabled:opacity-60 text-white font-medium " +
                                    "transition-colors"}>
                            Вхід
                        </button>
                    </form>
                </div>
            </div>
        </>
    )

}
export default LoginPage;
