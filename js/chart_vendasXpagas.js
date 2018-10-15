new Chart(document.getElementById("myChart"),{
    "type":"bar",
    "data":{
      "labels":["January","February","March","April","May","June","July"],
      "datasets":[
        {
        "label":"Total",
        "data":[65,59,80,81,56,55,40],
        "fill":false,
        "borderColor":"rgb(255, 0, 0)",
        "backgroundColor":"rgb(255, 0, 0)",
        "lineTension":0.1},
        {
        "label":"Pagas",
        "data":[65,-59,-80,-81,-56,-55,-40],
        "fill":false,
        "borderColor":"rgb(75, 192, 192)",
        "backgroundColor":"rgb(75, 192, 192)",
        "lineTension":0.1
      },
      ]},
      "options":{}});