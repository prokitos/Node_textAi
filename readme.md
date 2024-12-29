перед запуском сервера сделать миграцию:  npx prisma migrate deploy
запуск сервера через   npm start   или   node src/index.js  
протестировать роуты можно через сваггер:  http://localhost:3001/api-doc


.env хранит порт и путь к базе данных.


Роуты:
[post] http://localhost:3001/api/auth/signup		создаст обычного пользователя
[post] http://localhost:3001/api/auth/login 		залогиниться. получаем токен и по нему доступ к другим роутам.
[post] http://localhost:3001/api/auth/debugSignup	создать администратора, для тестов


[post] http://localhost:3001/api/ai/chat		        отправить сообщение ИИ 
[post] http://localhost:3001/api/ai/addModel		    добавить модель в базу [только админам]
[delete] http://localhost:3001/api/ai/removeModel/{id}	убрать модель из базы  [только админам]
[put] http://localhost:3001/api/ai/updateModel/{id}	    обновить цену модели   [только админам]


[get] http://localhost:3001/api/balance/checkBalance/{id}	проверить баланс пользователя  [только админам]
[put] http://localhost:3001/api/balance/updateBalance/{id}	обновить баланс пользователя   [только админам]
[get] http://localhost:3001/api/balance/myBalance		    проверить мой баланс



сваггер:
http://localhost:3001/api-doc
