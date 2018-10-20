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
var clientes = db.getCollection('clientes');

new Vue({
  el: 'body',
  data: {
    mode: '',
    clientes: [],
    cliente_update: '',
    client: {
      nome: '',
      telefone: ''
    }
  },
  ready: function () {
    this.clientes = clientes.data;
  },
  methods: {
    editClient: function (client) {
      this.mode = 'edicao';
      this.client = client;
      this.cliente_update = client;
    },
    clientStroreOrUpdate: function () {
      if (typeof this.client.$loki != 'undefined') {
        clientes.update(this.client);
        this.mode = '';
        this.client = { nome: '', telefone: '' };
        this.cliente_update = '';
      } else {
        clientes.insert(this.client);
        this.mode = '';
        this.client = { nome: '', telefone: '' };
        this.cliente_update = '';
      }
      db.save();
    },
    removeClient:function(client){
      clientes.remove(client)
      db.save();
    },
    cancelar: function () {
      this.mode = '';
      this.client = { nome: '', telefone: '' };
      this.cliente_update = '';
    }
  }
});