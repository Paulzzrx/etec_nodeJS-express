import express from "express";

const route = express.Router();

route.post("/", (request, response) => {
    // const name = request.body.name;

    const {name, email, password, typeUser} = request.body;

    if(name.length < 2) {
        return response.status(400).send({"response": "O usuário não pode ser nulo ou vazio!"})
    }

    if(email.Contains("@") == false || email.length < 5) {
        return response.status(400).send({"response": "O email não pode ser nulo ou vazio!"})
    }

    if(password.length < 6 || password.length > 10) {
        return response.status(400).send({"response": "A senha precisa ter no minimo 6 caracteres e no maximo 10!"})
    }
    
    if(typeUser.toUpperCase() != "ADMIN" && typeUser.toUpperCase() != "COMUM") {
        return response.status(400).send({"response": "O tipo de usuário deve ser comum ou admin!"})
    }

    return response.status(201).send({"response": `O usuário ${name} foi criado com sucesso!`});
});

export default route;