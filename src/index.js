import express from 'express';
import { AppDataSource} from './database/data-source.js';
import routes from './routes.js';

const server = express();

// Recebimento de dados no formato json
server.use(express.json());

// Redirecionar 
server.use("/", routes);

AppDataSource.initialize().then(async() => {
    console.log("Banco de dados conectado!");

    server.listen(3000, () => {
        console.log("Server is running...");
    });
});

// server.get("/teste",(request, response) => {
//     response.status(200).send("Meu primeiro método HTTP");
// })

// server.get("/",(request, response) => {
//     response.status(200).send("MAIN PAGE");
// })