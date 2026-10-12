import {useEffect, useState} from "react";
import axios from "axios";
import type {IPagedResult, IUser} from "./types.ts";

const HomePage = () =>
{
    //Буде викликатися 1 раз після відображення головної сторінки
    const [users, setUsers] = useState<IUser[]>([]);
    console.log("users", users);
    useEffect(() => {
        console.log("Render HomePage");
        //адреса по якій отримуємо список користувачів
        const url = "https://qrcode31kn-api.itstep.click/api/Users";
        axios.get<IPagedResult<IUser>>(url, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("auth")
            }
        }).then(response => {
            console.log("Response: ", response.data);
            setUsers(response.data.items); // зберіг користувачів у state
        }).catch(error => {
                console.log("Error: ", error);
            }
        )
    },[]);


    return (
        <>
            <div className="container mx-auto px-4 py-8">
                {/* Заголовок сторінки */}
                <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
                    Список користувачів
                </h1>

                {/* Відображаємо картки користувачів */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {users.map(user => (
                        <div
                            key={user.id}
                            className="overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl"
                        >
                            {/* Фото користувача */}
                            <img
                                src={`https://qrcode31kn-api.itstep.click/myimages/${user.image}_432.webp`}
                                alt={user.fullName}
                                className="h-56 w-full object-cover"
                            />

                            {/* Інформація про користувача */}
                            <div className="p-5">
                                <h2 className="mb-2 text-xl font-semibold text-gray-800">
                                    {user.fullName}
                                </h2>

                                <p className="break-words text-sm text-gray-600">
                                    {user.email}
                                </p>

                                <p className="mt-3 text-xs text-gray-400">
                                    ID: {user.id}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Повідомлення, якщо користувачів немає */}
                {users.length === 0 && (
                    <p className="mt-8 text-center text-gray-500">
                        Користувачів не знайдено.
                    </p>
                )}
            </div>

        </>
    )
}
export default HomePage;
