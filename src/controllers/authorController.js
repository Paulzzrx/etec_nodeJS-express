import express from "express";
import authorEntity from "../entities/author.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();
<<<<<<< HEAD
const userRepository = AppDataSource.getRepository(authorEntity);
=======
const userRepository = AppDataSource.getRepository(userEntity);
>>>>>>> ff87df1d2724ccf520512806bc6bc3e4f084294c

route.post("/", async (request, response) => {
    // const name = request.body.name;

<<<<<<< HEAD
    const {name, birthday, nationaly} = request.body;
=======
    const {name, email, password, typeUser} = request.body;
>>>>>>> ff87df1d2724ccf520512806bc6bc3e4f084294c

    if(name.length < 2) {
        return response.status(400).send({"response": "O usuário não pode ser nulo ou vazio!"})
    }

<<<<<<< HEAD
    if(birthday.includes("-") == false || birthday.length < 9) {
        return response.status(400).send({"response": "O aniversário não pode ser nulo ou vazio!"})
    }

    if(nationaly.length < 2) {
        return response.status(400).send({"response": "A nacionalidade precisa ter no minimo 6 caracteres e no maximo 10!"})
    }

    const newAuthor = userRepository.create({name, birthday, nationaly});

    try {
        await userRepository.save(newAuthor);
=======
    if(email.includes("@") == false || email.length < 5) {
        return response.status(400).send({"response": "O email não pode ser nulo ou vazio!"})
    }

    if(password.length < 6 || password.length > 10) {
        return response.status(400).send({"response": "A senha precisa ter no minimo 6 caracteres e no maximo 10!"})
    }
    
    if(typeUser.toUpperCase() != "ADMIN" && typeUser.toUpperCase() != "COMUM") {
        return response.status(400).send({"response": "O tipo de usuário deve ser comum ou admin!"})
    }

    const newUser = userRepository.create({name, email, password, typeUser});

    try {
        await userRepository.save(newUser);
>>>>>>> ff87df1d2724ccf520512806bc6bc3e4f084294c
        return response.status(201).send({"response": `O usuário ${name} foi criado com sucesso!`});
    } catch(error) {
        return response.status(500).send({"response": `Houve um erro: ${error}`})
    }
});

route.get("/", async (request, response) => {
<<<<<<< HEAD
    const authors = await userRepository.find();
    return response.status(200).send({"response": authors})
=======
    const users = await userRepository.find();
    return response.status(200).send({"response": users})
>>>>>>> ff87df1d2724ccf520512806bc6bc3e4f084294c
});

// route.get("/:authorID", async (request, response) => {
//     try {
//         const { authorID } = request.params;
//         const user = await userRepository.findBy({id: authorID});
//         return response.status(200).send({"response": author});
//     } catch(error) {
//         return response.status(500).send({"response": `Houve um erro: ${error}`});
//     }
// });

route.get("/:name", async (request, response) => {
    try {
        const { name } = request.params;
        const user = await userRepository.findBy({name: Like(`%${name}%`)});
        return response.status(200).send({"response": user});
    } catch(error) {
        return response.status(500).send({"response": `Houve um erro: ${error}`});
    }
});

route.put("/", async (request, response) => {
<<<<<<< HEAD
    const {id, name, birthday, nationaly} = request.body;

    try {
        if(name.length < 2) {
        return response.status(400).send({"response": "O usuário não pode ser nulo ou vazio!"})
        }

        if(birthday.includes("-") == false || birthday.length < 9) {
            return response.status(400).send({"response": "O aniversário não pode ser nulo ou vazio!"})
        }

        if(nationaly.length < 2) {
            return response.status(400).send({"response": "A nacionalidade precisa ter no minimo 6 caracteres e no maximo 10!"})
        }

        await userRepository.update(id, {name, birthday, nationaly});
        return response.status(200).send({"response": `Dados atualizados com sucesso!`});
=======
    const {id, name, email, password, typeUser} = request.body;

    try {
        if(name.length < 2) {
            return response.status(400).send({"response": "O usuário não pode ser nulo ou vazio!"})
        }

        if(email.includes("@") == false || email.length < 5) {
            return response.status(400).send({"response": "O email não pode ser nulo ou vazio!"})
        }

        if(password.length < 6 || password.length > 10) {
            return response.status(400).send({"response": "A senha precisa ter no minimo 6 caracteres e no maximo 10!"})
        }   
    
        if(typeUser.toUpperCase() != "ADMIN" && typeUser.toUpperCase() != "COMUM") {
            return response.status(400).send({"response": "O tipo de usuário deve ser comum ou  admin!"})
        }
        await userRepository.update(id, {name, email, password, typeUser});
        return response.status(200).send({"response": `Dados atualizados com sucesso!`})
>>>>>>> ff87df1d2724ccf520512806bc6bc3e4f084294c
    } catch(error) {
        return response.status(500).send({"response": `Houve um erro ${error}`})
    }
    
});

<<<<<<< HEAD
route.delete("/:idAuthor", async (request, response) => {
    const { idAuthor } = request.params;

    // Soft delete
    await userRepository.update({id: idAuthor}, {deletedAt: () => "CURRENT_TIMESTAMP"});
    return response.status(200).send({"resposnse": `usuario excluido com sucesso!`});
});

=======
>>>>>>> ff87df1d2724ccf520512806bc6bc3e4f084294c
export default route;