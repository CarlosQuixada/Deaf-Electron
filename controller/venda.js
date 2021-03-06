var read = require('read-file-utf8');
var loki = require('lokijs');
var fileExists = require('file-exists'); 
var db = new loki(__dirname+'/db.json');
var data = {};

var exists = fileExists.sync(__dirname+'/db.json')

if(exists === true){
  data = read(__dirname+'/db.json');
  db.loadJSON(data);
}else{
  db.addCollection('vendas');
  db.addCollection('clientes');
  db.addCollection('produtos');
  db.save();
}

window.Vue = require('vue');
var produtos =db.getCollection('produtos');
var vendas = db.getCollection('vendas');
var clientes = db.getCollection('clientes');

new Vue({
  el:'body',
  data:{
    mode:'',
    produtos:{},
    vendas:{},
    clientes:{},
    sale_update:'',
    sale:{
      cliente:'',
      produto:'',
      preco:0,
      qtd:1
    }
  },
  ready:function(){
    this.produtos = produtos.data;
    this.vendas = vendas.data;
    this.clientes = clientes.data;
  },
  methods:{
    editSale:function(sale){
      this.mode = 'edicao';
      this.sale = sale;
      this.sale_update = sale;
    },
    saleStroreOrUpdate:function(){
      if(typeof this.sale.$loki != 'undefined'){
        vendas.update(this.sale);
        this.mode = '';
        this.sale={cliente:this.sale.cliente,produto:'',preco:0,qtd:1}
        this.sale_update ='';
      }else{
        this.sale.preco = produtos.find({nome:this.sale.produto})[0].preco;
        vendas.insert(this.sale);
        this.mode='';
        this.sale={cliente:this.sale.cliente,produto:'',preco:0,qtd:1}
        this.sale_update ='';
      }
      db.save();
    },
    cancelar: function () {
      this.mode = '';
      this.sale={cliente:this.sale.cliente,produto:'',preco:0,qtd:1}
      this.sale_update = '';
    }
  }
});