import axios from 'axios'
import express from 'express'

const router = express.Router()

router.get('/tests/cep/sync/:cep', async (req, res) => {
    const { cep } = req.params
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    res.send(response.data)
})

router.get('/tests/cep/async/:cep', async (req, res) => {
    const { cep } = req.params
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            console.log('Sucesso')
            console.log(response.data)
        })
        .catch(error => {
            console.log('Erro')
            console.log(error.response.status)
        })
        .finally(() => {
            console.log('Sempre executa')
        })
    console.log('Sequência da rota')
    res.send()
})

const metodoAssincrono = async (numero) => {
    return new Promise(
        (resolve, reject) => {
            if (numero % 2 === 0) {
                resolve('O número é par')
            } else {
                reject('Ocorreu um erro')
            }
        }
    )
}

router.get('/tests/promise/:numero', async (req, res) => {
    const { numero } = req.params
    metodoAssincrono(
        parseInt(numero)
    )
        .then(response => {
            console.log('Sucesso')
            console.log(response)
        })
        .catch(error => {
            console.log('Erro')
            console.log(error)
        })
        .finally(() => {
            console.log('Sempre executa')
        })
    res.send()
})

export { router as cepRouter }