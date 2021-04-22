const express = require('express');
const router = express.Router();
const Produto = require('../models/produtos');
const mongoose = require('mongoose');

//Recuperando todos
router.get('/', (req, res) => {
    Produto.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

//Recuperando apenas um produto
router.get('/:produtoId', (req, res) => {
    const id = req.params.produtoId;
    Produto.findOne({
        _id: id
    }).exec()
        .then(result => {
            res.status(200).json({
                message: 'POST Resquest produto encontrado',
                Produto: result
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Produta não encontrado',
                error
            })
        })
});

//Criando novo produto e salvando
router.post('/', (req, res) => {
    const produto = new Produto(
        {
            _id: new mongoose.Types.ObjectId(),
            nome: req.body.nome,
            preco: req.body.preco
        });

    produto.save()
        .then(result => {
            res.status(201).json({
                message: 'POST Resquest para /produtos',
                produto: produto
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

});

//Atualizando unico produto
router.put('/:produtoId', (req, res) => {
    const id = req.params.produtoId
    Produto.updateOne({ _id: id }, { nome: 'Naruto Utimate Ninja 5', preco: 10000 })
        .then(result => {
            res.status(204).json({
                message: 'Atualizado'
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Produta não encontrado',
                error
            })
        })

})


//Deletando um unico produto
router.delete('/:produtoId', (req, res) => {
    const id = req.params.produtoId;
    Produto.deleteOne({ _id: id })
    .then(result => {
        res.status(200).json({
            message: 'Excluido'
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Produta não encontrado',
            error
        })
    })

})

module.exports = router;