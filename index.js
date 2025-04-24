import express from 'express';
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
    const data = fs.readFileSync("./db.json");
   return JSON.parse(data);
   } catch (error) {
    console.log(error);
   }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
       } catch (error) {
        console.log(error);
       }
};

app.get("/", (req, res) => {
    res.send("Welcome to my first API with node js!")
});

app.get("/Notas", (req, res) => {
    const data = readData();
    res.json(data.Notas);
});

app.get("/Notas/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const Nota = data.Notas.find((Nota) => Nota.id == id);
    res.json(Nota);
});

app.post("/Notas", (req, res) => {
    const data = readData();
    const body = req.body;
    const newNota = {
        id: data.Notas.length + 1,
        ...body,
    };
    data.Notas.push(newNota);
    writeData(data);
    res.json(newNota);
});

app.put("/Notas/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const NotaIndex = data.Notas.findIndex((Nota) => Nota.id === id);
    data.Notas[NotaIndex] = {
        ...data.Notas[NotaIndex],
        ...body
    };
    writeData(data);
    res.json({ message: "Nota updated successfully"});
});

app.delete("/Notas/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const NotaIndex = data.Notas.findIndex((Nota) => Nota.id === id);
    data.Notas.splice(NotaIndex, 1);
    writeData(data);
    res.json({ message: "Nota deleted successfully" });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
