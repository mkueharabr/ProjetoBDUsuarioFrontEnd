
function autorizar(){
    var url = "http://localhost:8080/login";

    console.log("Autorizar");

    var usuario = {
        "username" : "conectarme",
        "password" : "h0la!Mund0"
    }

    var request = {
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify(usuario)
    }

    fetch(url, request)
    .then(res => res.json())
    .then(response =>{
        localStorage.setItem("token", JSON.stringify(response))
        autenticar()
    })
    .catch(err => {
        window.alert('usuario ou senha inválidos!');

    })

}

function autenticar(){
    console.log("autenticar");

     if(document.querySelector("#idEmail").value == '' || document.querySelector("#idSenha").value == '' ){
        mostrarAlerta("#alertaErro","Favor informar o usuário ou senha!");
        return;
     }

     var url = "http://localhost:8080/autenticar";

    var usuario = {
        "email" : document.querySelector("#idEmail").value,
        "senha" : document.querySelector("#idSenha").value
    }

    var request = {
        method: "POST",
        headers: {
            "Content-type":"application/json",
        },
        body: JSON.stringify(usuario)
    }

    fetch(url, request)
    .then(res => res.json())
    .then(response =>{

        guardarInfo(response);
        window.location="home.html"
    })
    .catch(err => {
        console.log('erro: ' + err);
        mostrarAlerta("#alertaErro",'Usuário ou senha inválido!');
    })

}


function guardarInfo(resp){
    if(resp.apelido == null){
        localStorage.setItem("usuarioLogado", resp.nome);
    } else {
        localStorage.setItem("usuarioLogado", resp.apelido);
    }
    
    localStorage.setItem("usuarioId", resp.id);
    localStorage.setItem("urlFoto", resp.urlFoto);
}


function carregarFotoUsuario(){
    let urlFoto = localStorage.getItem("urlFoto");


    if(urlFoto == ""){
        urlFoto = "./image/usuario.png";
    }

    let imgFoto = document.querySelector("#fotoUsuario");
    imgFoto.setAttribute("src",urlFoto);
    
   
}


function mostrarAlerta(idObjeto, mensagem){
    document.querySelector(idObjeto).innerHTML = 
    "<div class='alert alert-danger d-flex align-items-center' role='alert'>" +
    "<svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/>" +
    "</svg>" +
    "<div>" + mensagem + "</div>" +
    "</div>";
}

function apagarAlerta(idObjeto){
    document.getElementById(idObjeto).innerHTML = '';
}


function deslogar(){
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("fotoUsuario");
    localStorage.removeItem("usuarioId");
    document.getElementById("nomeUsuarioLogado").innerHTML = "";
    carregarFotoUsuario();
    location.reload();

}

  
function carregarUsuario(){
    carregarFotoUsuario();
    var usuarioLogado = localStorage.getItem("usuarioLogado");
    if(usuarioLogado == null){
        window.location="login.html";
    } else {
        

        document.getElementById("nomeUsuarioLogado").innerHTML = 
            "<p> Olá, " + usuarioLogado + "!" + "</p>";
    }

}


function verificar(){
    if(document.querySelector("#idNome") == null ||
        document.querySelector("#idSobrenome") == null ||
        document.querySelector("#idApelido") == null ||
        document.querySelector("#idEmail") == null ||
        document.querySelector("#idSenha") == null ||
        document.querySelector("#idDataNascimento") == null ||
        document.querySelector("#idDDD") == null ||
        document.querySelector("#idTelefone") == null ||
        document.querySelector("#idUrlFoto") == null
        ){
        console.log('nome é obrigatório')
        mostrarAlerta("#alertaErro",'Alguns campos obrigatórios não foram preenchidos. Favor revisá-los!');
        
        return false;
    }
}

function salvar(){
    if(verificar()){
        var url = "http://localhost:8080/novoUsuario";

        var usuario = {
            "nome" : document.getElementById("idNome").value,
            "sobrenome" : document.getElementById("idSobrenome").value,
            "apelido" : document.getElementById("idApelido").value,
            "nomeSocial" : document.getElementById("idNomeSocial").value,
            "sexo" : document.querySelector('input[name="idSexo"]:checked').value,
            "email" : document.getElementById("idEmail").value,
            "senha" : document.getElementById("idSenha").value,
            "dataNascimento": document.getElementById("idDataNascimento").value,
            "ddd": document.getElementById("idDDD").value,
            "telefone": document.getElementById("idTelefone").value,
            "urlFoto" : document.getElementById("idUrlFoto").value,
            "urlFacebook" : document.getElementById("idUrlFacebook").value,
            "urlInstagram" : document.getElementById("idUrlInstagram").value,
            "urlLinkedin" : document.getElementById("idUrlLinkedIn").value,
            "urlTwitter" : document.getElementById("idUrlTwitter").value
        }

        var request = {
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(usuario)
        }

        fetch(url, request)
        .then(res => res.json())
        .then(response =>{
            window.alert('Usuario cadastro com sucesso. Id criado: ' + response.id);
        })
        .catch(err => {
            window.alert('Falha ao cadastrar o usuário!');
        });
    }
    

}

