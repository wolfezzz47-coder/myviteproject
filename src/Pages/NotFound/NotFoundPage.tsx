import {Link} from "react-router";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center">

                {/* Код помилки */}
                <h1 className="text-9xl font-extrabold text-gray-200">
                    404
                </h1>

                {/* Заголовок */}
                <h2 className="mt-4 text-3xl font-bold text-gray-900">
                    Сторінку не знайдено
                </h2>

                {/* Опис */}
                <p className="mt-3 text-gray-500">
                    На жаль, сторінка, яку ви шукаєте, не існує
                    або була переміщена.
                </p>

                {/* Кнопка */}
                <Link
                    to="/"
                    className="inline-block mt-6 rounded-lg bg-blue-600 px-6 py-3
                               font-medium text-white transition
                               hover:bg-blue-700 focus:outline-none
                               focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    На головну
                </Link>

            </div>
        </div>
    );
};

export default NotFoundPage;
