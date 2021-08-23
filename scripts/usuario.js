function logar(){
    var url = "http://localhost:8080/login";

    var usuario = {
        "email" : document.getElementById("txtemail").value,
        "senha" : document.getElementById("txtsenha").value
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
        localStorage.setItem("usuarioLogado", JSON.stringify(response))
        window.location="usuario.html"
    })
    .catch(err => {
        window.alert('usuario ou senha inválidos!');
    })


}

function carregarUsuario(){
    var usuarioLogado = localStorage.getItem("usuarioLogado");
    if(usuarioLogado == null){
        window.location="login.html";
    } else {

        var usuarioLogadoDes = JSON.parse(usuarioLogado);
        document.getElementById("foto").innerHTML = 
            "<img width = '40%' heigth='100%' alt='Foto' src='style/images/" + usuarioLogadoDes.foto + "'>";

        document.getElementById("dados").innerHTML = 
            "<h3>" + usuarioLogadoDes.nome + "<br>" + usuarioLogadoDes.email +
                "<br>ID: " + usuarioLogadoDes.id + "<h3>"
    }

}

function salvar(){
    var url = "http://localhost:8080/novousuario";

    var usuario = {
        "email" : document.getElementById("txtEmail").value,
        "senha" : document.getElementById("txtSenha").value,
        "foto" : document.getElementById("txtFoto").value,
        "nome" : document.getElementById("txtNome").value

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
    })

}

function listarUsuarios(){
     var url = "http://localhost:8080/usuarios";


    var request = {
        method: "GET"
    }

    fetch(url, request)
    .then(response => response.json())
    .then(response =>  montarTabelaUsuarios(response))
    .catch(err => {
        window.alert('Falha ao listar usuários!');
    })   

}

function montarTabelaUsuarios(usuarios){
    var saida = 
        "<table class='table table-striped table-hover'>" + 
        "   <thead class='thead-dark'><tr>" + 
        "       <th scope='col'>Id</th>" + 
        "       <th scope='col'>Nome</th>" + 
        "       <th scope='col'>Email</th>" + 
        "       <th scope='col'>Foto</th>" + 
        "   </tr></thead>" + 
        "   <tbody>";
    
    for(cont=0; cont<usuarios.length; cont++){
        saida +=
            "       <tr>" + 
            "           <td>" + usuarios[cont].id + "</td>" + 
            "           <td>" + usuarios[cont].nome + "</td>" + 
            "           <td>" + usuarios[cont].email + "</td>" + 
            "           <td>" + usuarios[cont].foto + "</td>" + 
            "       </tr>" ;

    }

    saida += "  </tbody></table>";

    document.getElementById("dados").innerHTML = saida;
}