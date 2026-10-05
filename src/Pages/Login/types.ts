export interface ILoginType {
    email: string; //користувач вказує пошту - string
    password: string; //користувач вказує пароль - string
}
//Тут відповідь на авторизацію користувача
export interface ILoginResponse
{
    token: string; //Приходить token для авторизації
}
//Зберігає інформацію, яка є token користувача
export interface ITokenInfo
{
    email: string;
    roles: string;
    exp: number;
}

