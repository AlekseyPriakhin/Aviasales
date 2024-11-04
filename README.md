This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Создать файл .env по примеру .env.example

Установить зависимости:

```bash
npm install
```

Настройка базы данных:

Выполнить команду для генерации БД SQLlite:

```bash
npm run db:migrate
```
Выполнить команду для заполнения БД: 

```bash
npm run db:seed
```

Запуск приложения:

```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

Для запуска интерфейса для работы с БД напрямую:
```bash
npm run db:studio
```
