function carregarProvedoras(){
    var url = "http://localhost:8080/provedoras";


    var request = {
        method: "GET"
    }

    fetch(url, request)
    .then(response => response.json())
    .then(response =>  montarTabelaProvedoras(response))
    .catch(err => {
        window.alert('Falha ao listar séries!');
    })   
}


function montarTabelaProvedoras(provedoras){
    var saida = 
        "<table class='table table-striped table-hover'>" + 
        "   <thead class='thead-dark'><tr>" + 
        "       <th scope='col'>Id</th>" + 
        "       <th scope='col'>Fundação</th>" + 
        "       <th scope='col'>Nome</th>" + 
        "       <th scope='col'>Site</th>" + 
        "   </tr></thead>" + 
        "   <tbody>";
    
    for(cont=0; cont<provedoras.length; cont++){
        saida +=
            "       <tr>" + 
            "           <td>" + provedoras[cont].id + "</td>" + 
            "           <td>" + provedoras[cont].fundacao + "</td>" + 
            "           <td>" + provedoras[cont].nome + "</td>" + 
            "           <td>" + provedoras[cont].site + "</td>" + 
            "       </tr>" ;

    }

    saida += "  </tbody></table>";

    document.getElementById("dados").innerHTML = saida;
}

function salvar(){
    var url = "http://localhost:8080/novaprovedora";

    var provedora = {
        "nome" : document.getElementById("txtNome").value,
        "data" : document.getElementById("txtData").value,
        "site" : document.getElementById("txtSite").value
    };

    var request = {
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify(provedora)
    };

    fetch(url, request)
    .then(res => res.json())
    .then(response =>{
        window.alert('Provedora cadastrada com sucesso. Id criado: ' + response.id);
    })
    .catch(err => {
        window.alert('Falha ao cadastrar a provedora!');
    })

}

function filtrar(){
    var nomefiltro = document.getElementById("txtNome").value;

    var url = "http://localhost:8080/provedoras/filter";

    if(nomefiltro != null){
        url += "?nome=" + nomefiltro;
    }

    var request = {
        method: "GET"
    }

    fetch(url, request)
    .then(response => response.json())
    .then(response =>  montarTabelaProvedoras(response))
    .catch(err => {
        window.alert('A sua pesquisa não retornou nada!');
        limparTabelaProvedoras();
    })   
}


function limparTabelaProvedoras(){
    var saida = 
        "<table class='table table-striped table-hover'>" + 
        "   <thead class='thead-dark'><tr>" + 
        "       <th scope='col'>Id</th>" + 
        "       <th scope='col'>Fundação</th>" + 
        "       <th scope='col'>Nome</th>" + 
        "       <th scope='col'>Site</th>" + 
        "   </tr></thead>" + 
        "   <tbody>";
    


    saida += "  </tbody></table>";

    document.getElementById("dados").innerHTML = saida;
}
