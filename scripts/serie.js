function carregarSeries(){
    var url = "http://localhost:8080/series";


    var request = {
        method: "GET"
    }

    fetch(url, request)
    .then(response => response.json())
    .then(response =>  montarTabelaSeries(response))
    .catch(err => {
        window.alert('Falha ao listar séries!');
    })   
}


function montarTabelaSeries(series){
    var saida = 
        "<table class='table table-striped table-hover'>" + 
        "   <thead class='thead-dark'><tr>" + 
        "       <th scope='col'>Id</th>" + 
        "       <th scope='col'>Genero</th>" + 
        "       <th scope='col'>Lançamento</th>" + 
        "       <th scope='col'>Sinopse</th>" + 
        "       <th scope='col'>Título</th>" + 
        "       <th scope='col'>Provedora</th>" + 
        "       <th scope='col'>Ação</th>" + 
        "   </tr></thead>" + 
        "   <tbody>";
    
    for(cont=0; cont<series.length; cont++){
        saida +=
            "       <tr>" + 
            "           <td>" + series[cont].id + "</td>" + 
            "           <td>" + series[cont].genero + "</td>" + 
            "           <td>" + series[cont].lancamento + "</td>" + 
            "           <td>" + series[cont].sinopse + "</td>" + 
            "           <td>" + series[cont].titulo + "</td>" + 
            "           <td>" + series[cont].provedora.nome + "</td>" + 
            "           <td> <button type='button' class='btn btn-danger' onclick='excluir(" + series[cont].id + ")'><i class='bi bi-trash'></i></button></td>"
            "       </tr>" ;

    }

    saida += "  </tbody></table>";

    document.getElementById("dados").innerHTML = saida;
}



function salvar(){
    var url = "http://localhost:8080/novaserie";

    console.log('titulo: ' + document.getElementById("txtTitulo").value);
    console.log('genero: ' + document.getElementById("txtGenero").value);
    console.log('sinopse: ' + document.getElementById("txtSinopse").value);
    console.log('lancamento: ' + document.querySelector('input[name="txtLancamento"]:checked').value);
    console.log('provedora: ' + document.getElementById("txtProvedora").value);

    var serie = {
        "titulo" : document.getElementById("txtTitulo").value,
        "genero" : document.getElementById("txtGenero").value,
        "sinopse" : document.getElementById("txtSinopse").value,
        "lancamento" :document.querySelector('input[name="txtLancamento"]:checked').value,
        "provedora" : {
            "id" : document.getElementById("txtProvedora").value
        }

    }

    var request = {
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify(serie)
    }

    fetch(url, request)
    .then(response => response.json())
    .then(response =>{
        window.alert('Série cadastro com sucesso. Id criado: ' + response.id);
    })
    .catch(err => {
        window.alert('Falha ao cadastrar a série!');
    })

}

function carregarListaProvedores(){
    var url = "http://localhost:8080/provedoras";


    var request = {
        method: "GET"
    }

    fetch(url, request)
    .then(response => response.json())
    .then(response =>  preencherCombo(response))
    .catch(err => {
        window.alert('Falha ao listar séries!');
    })   
}

function preencherCombo(provedores){
    var saida = "";
    for(cont = 0; cont<provedores.length; cont++){
        saida += "<option value= '" + provedores[cont].id + "'>" +
                    provedores[cont].nome +
                "</option>";

    }

    document.getElementById("txtProvedora").innerHTML = saida;
}


function excluir(id){
    var resposta = window.confirm("Você realmente deseja excluir a série? " + id);

    if(resposta == true){
        var url = "http://localhost:8080/serie/" + id;
    
    
        var request = {
            method: "DELETE"
        }
    
        fetch(url, request)   
        .then(response =>  carregarSeries())
        .catch(err => {
            window.alert('Erro ao excluir uma série!');
        })  

    }
}
    