var read = require('read-file-utf8');
var loki = require('lokijs');
var fileExists = require('file-exists');
var db = new loki(__dirname + '/db.json');
var data = {};

var exists = fileExists.sync(__dirname + '/db.json')

if (exists === true) {
  data = read(__dirname + '/db.json');
  db.loadJSON(data);
} else {
  db.addCollection('vendas');
  db.addCollection('clientes');
  db.addCollection('produtos');
  db.save();
}

window.Vue = require('vue');
var produtos = db.getCollection('produtos');

new Vue({
  el: 'body',
  data: {
    mode: '',
    produtos: [],
    produto_update: '',
    product: {
      nome: '',
      qtd: '',
      preco: ''
    }
  },
  ready: function () {
    this.produtos = produtos.data;
    console.log(this.produtos);
  },
  methods: {
    editProduct: function (product) {
      this.mode = 'edicao';
      this.product = product;
      this.produto_update = product;
    },
    productStroreOrUpdate: function () {
      if (typeof this.product.$loki != 'undefined') {
        produtos.update(this.product);
        this.mode = '';
        this.product = { nome: '', qtd: '', preco: '' };
        this.produto_update = '';
      } else {
        produtos.insert(this.product);
        this.mode = '';
        this.product = { nome: '', qtd: '', preco: '' };
        this.produto_update = '';
      }
      db.save();
    },
    removeProduct:function(product){
      produtos.remove(product)
      db.save();
    },
    cancelar: function () {
      this.mode = '';
      this.product = { nome: '', qtd: '', preco: '' };
      this.produto_update = '';
    }
  }
});