const express = require('express');
//para enviar eventos para os demais microsserviços
const eventos = []
const axios = require('axios');
const app = express();
app.use(express.json());
app.post("/eventos", async(req, res) => {
    const evento = req.body;
    eventos.push(evento)
        //envia o evento para o microsserviço de lembretes
    axios.post("http://192.168.200.100:4000/eventos", evento)
        .catch((err) => {
            console.log("err", err);
        });
    //envia o evento para o microsserviço de observações
    axios.post("http://192.168.200.100:5000/eventos", evento)
        .catch((err) => {
            console.log("err", err);
        });
    //envia o evento para o microsserviço de consulta
    axios.post("http://192.168.200.100:6000/eventos", evento)
        .catch((err) => {
            console.log("err", err);
        });
    //envia o evento para o microsserviço de classificação
    axios.post("http://192.168.200.100:7000/eventos", evento)
        .catch((err) => {
            console.log("err", err);
        });
    res.status(200).send({
        msg: "ok"
    });
});

app.get('/eventos', (req, res) => {
    res.send(eventos)
})

app.listen(10000, () => {
    console.log('Barramento de eventos. Porta 10000.')
})