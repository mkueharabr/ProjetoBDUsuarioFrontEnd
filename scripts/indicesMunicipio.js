document.querySelector("#idUFSelecionar").addEventListener('change', function () {
    console.log("selecionado: " + this.value);
    carregarMunicipio(this.value);

});


function carregarMunicipio(uf) {
    var url = "http://localhost:8080/municipio/" + uf;


    var request = {
        method: "GET"
    }

    fetch(url, request)
        .then(response => response.json())
        .then(response => carregarSelectMunicipio(response))
        .catch(err => {
            window.alert('Falha ao carregar os municípios da UF ' + uf + ' !');
        })
}


function removerElementos(idSelect) {

    idSelect.selectedIndex = 0;


    for (cont = idSelect.length - 1; cont > 0; cont--) {
        idSelect.remove(cont);
    }

}

function carregarSelectMunicipio(municipio) {

    const municipioSelect = document.querySelector("#idMunicipioSelecionar");
    removerElementos(municipioSelect);


    for (cont = 1; cont < municipio.length; cont++) {
        option = new Option(municipio[cont].municipio, municipio[cont].coMunicipio);
        municipioSelect.options[municipioSelect.options.length] = option;
    }

}


function carregarUF() {
    var url = "http://localhost:8080/uf";


    var request = {
        method: "GET"
    }

    fetch(url, request)
        .then(response => response.json())
        .then(response => carregarSelectUF(response))
        .catch(err => {
            window.alert('Falha ao carregar as UFs!');
        })

}

function carregarSelectUF(uf) {
    console.log('montando...')
    const ufSelect = document.querySelector("#idUFSelecionar");

    for (cont = 0; cont < uf.length; cont++) {
        option = new Option(uf[cont].estado, uf[cont].id);
        ufSelect.options[ufSelect.options.length] = option;

    }

}


function pesquisar() {
    const ufSelect = document.querySelector("#idMunicipioSelecionar");

    if (ufSelect.value <= 0) {
        alert('Favor selecionar um Município');
        return;
    }
    console.log('Selecionado: ' + ufSelect.value);

    var url = "http://localhost:8080/indiceMunicipio/" + ufSelect.value;


    var request = {
        method: "GET"
    }

    fetch(url, request)
        .then(response => response.json())
        .then(response => carregarIndiceMunicipio(response))
        .catch(err => {
            window.alert('Falha ao carregar as UFs!');
        })
}




function carregarIndiceMunicipio(indice) {
    const codigoLocal = "pt-BR";

    var moeda = {
        style: "currency",
        currency: "R$"
    };

    var numero2dec = {
        maximumFractionDigits: 2,
        style: "decimal"
    };

    var numero3dec = {
        maximumFractionDigits: 3,
        style: "decimal"
    };

    var numeroInt = {
        style: "decimal",
        maximumFractionDigits: 0
    };

    document.querySelector("#areaMunicipio").innerHTML = indice.areaMunicipio.toLocaleString(codigoLocal, numero2dec);
    document.querySelector("#censoEstimativaPopulacao").innerHTML =
        indice.censoPopulacaoEstimada.toLocaleString(codigoLocal, numeroInt) + " (" + indice.censoAnoEstimativa + ")";
    document.querySelector("#censoPopulacao").innerHTML = indice.censo2010Populacao.toLocaleString(codigoLocal, numeroInt) + " (2010)";
    document.querySelector("#censoDensidadePopulacao").innerHTML = indice.censo2010DensidadeAprox.toLocaleString(codigoLocal, numero2dec);

    console.log('Católica: ' + indice.censo2010ReligiaoCatApostolicoRomano);

    var religiao = [
        ['Religião', 'Pessoas'],
        ['Católica', indice.censo2010ReligiaoCatApostolicoRomano],
        ['Evangélica', indice.censo2010ReligiaoEvangelica],
        ['Espírita', indice.censo2010ReligiaoEspirita],
        ['Outros', indice.censo2010ReligiaoSemOuNaoDeclarada]
    ];


    graficoReligiao(religiao);

    var dadosMunicipio = [
        ['Município', 'População'],
        [indice.municipio + ', ' + indice.microrregiaoMesorregiaoUfNome + ', Brasil', indice.municipio + ': ' + indice.censoPopulacaoEstimada]

    ];

    graficoMapa(dadosMunicipio);
    console.log('dados do municipio ' + indice.municipio + ', ' + indice.microrregiaoMesorregiaoUfNome + ', Brasil');
    console.log('população estimada: ' + indice.municipio + ': ' + indice.censoPopulacaoEstimada)


    // Educação
    document.querySelector("#idebAnosIniciais").innerHTML = indice.idebAnosIniciais.toLocaleString(codigoLocal, numero2dec) +
        ' (' + indice.idebAno + ')';
    document.querySelector("#idebAnosFinais").innerHTML = indice.idebAnosFinais.toLocaleString(codigoLocal, numero2dec) +
        ' (' + indice.idebAno + ')';

    // idhm
    document.querySelector('#idhmPosicaoGeral').innerHTML = indice.idhMunicipioPosicaoGeral + '&ordm;' + ' (' + indice.idhMunicipioAno + ')';
    document.querySelector('#idhmNotaGeral').innerHTML = indice.idhMunicipioIdhmGeral.toLocaleString(codigoLocal, numero3dec); + ' (' + indice.idhMunicipioAno + ')';

    kpiIdhm("#idhmRodape", indice.idhMunicipioIdhmGeral);


    document.querySelector('#idhmPosicaoGeralUF').innerHTML = indice.idhUfPosicaoGeral + '&ordm;' + ' (' + indice.idhUfAno + ')';
    document.querySelector('#idhmNotaGeralUF').innerHTML = indice.idhUfIdhmGeral.toLocaleString(codigoLocal, numero3dec) + ' (' + indice.idhUfAno + ')';

    kpiIdhm("#idhUFRodape", indice.idhUfIdhmGeral);


    // PIB
    document.querySelector('#pibPerCapita').innerHTML = indice.pibValorPibPerCapita.toLocaleString(codigoLocal, numero2dec) +
        ' (' + indice.pibAno + ')';

    // cce - empresas
    document.querySelector('#empresaLocal').innerHTML = indice.cceUnidadesLocais.toLocaleString(codigoLocal, numeroInt) +
        ' (' + indice.pibAno + ')';

    document.querySelector('#empresaPessoalOcupado').innerHTML = indice.ccePessoalOcupado.toLocaleString(codigoLocal, numeroInt) +
        ' (' + indice.pibAno + ')';

    document.querySelector('#empresaPessoalOcupadoSalario').innerHTML = indice.ccePessoalOcupadoAssalariado.toLocaleString(codigoLocal, numeroInt) +
        ' (' + indice.pibAno + ')';

    document.querySelector('#empresaSalarioMedio').innerHTML = indice.cceMediaSalarioMinimo.toLocaleString(codigoLocal, numero2dec) +
        ' (Salário Minímo)';

    document.querySelector('#empresaOutraRemuneracao').innerHTML = indice.cceSalariosXMil.toLocaleString(codigoLocal, numero2dec) +
        ' (x1000) R$';


    // dados do municipio
    let dadosArray = [
        ['Nome Microrregião', indice.microrregiaoNome],
        ['Nome Messorregião', indice.microrregiaoMesorregiaoNome],
        ['Nome UF', indice.microrregiaoMesorregiaoUfNome],
        ['Região', indice.microrregiaoMesorregiaoUfRegiaoNome],
        ['Amazônia Legal', indice.pibAmazoniaLegal],
        ['Semiárido', indice.pibSemiarido],
        ['Região Metropolitana SP', indice.pibRegiaoCidadeSp],
        ['1 Atividade Principal', indice.pibAtividadeMaiorValorBruto],
        ['2 Atividade Principal', indice.pibAtividadeSegValorBruto],
        ['3 Atividade Principal', indice.pibAtividadeTercValorBruto]
    ];

    tabelaMunicipio(dadosArray);

}


function kpiIdhm(objeto, valor) {
    let icone = "";

    if (valor < 0.5) {
        icone = "<i class='bi bi-arrow-down-square-fill kpi__muitoBaixo lead'></i> Muito Baixo";

    } else if (valor >= 0.5 && valor < 0.6) {
        icone = "<i class='bi bi-arrow-down-left-square-fill kpi__baixo lead'></i> Baixo";

    } else if (valor >= 0.6 && valor < 0.7) {
        icone = "<i class='bi bi-arrow-left-square-fill kpi__medio lead'></i> Medio";

    } else if (valor >= 0.7 && valor < 0.8) {

        icone = "<i class='bi bi-arrow-up-left-square-fill kpi__alto lead'></i> Alto";

    } else {
        icone = "<i class='bi bi-arrow-up-square-fill kpi__muitoAlto lead'></i> Muito Alto";

    }

    document.querySelector(objeto).innerHTML = icone;
}


google.charts.load('current', {
    'packages': ['Map'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyDeFVWel5RQUB5yAiRXkDxQg6Fw_x7sCb0',
    'language': 'pt-br',
    callback: graficoMapa

});


// plota o mapa
function graficoMapa(arrMapa) {
    if (document.querySelector("#idMunicipioSelecionar").selectedIndex == 0) {
        var arrMapa = [
            ['Município', 'População'],
            ['Brasilia, DF, Brasil', 'Brasil: 201,032,714']
        ];
    }

    var dataMapa = google.visualization.arrayToDataTable(arrMapa);

    var url = 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/';

    var options = {
        showTooltip: true,
        showInfoWindow: true,
        zoomLevel: 9,

    };

  
    var map = new google.visualization.Map(document.getElementById('mapaMunicipio'));
    map.draw(dataMapa, options);

}



google.charts.load("current", {
    packages: ["corechart"],
    'language': 'pt-br',
    callback: graficoReligiao
});

//google.charts.setOnLoadCallback(graficoReligiao);

function graficoReligiao(arrReligiao) {
    if (document.querySelector("#idMunicipioSelecionar").selectedIndex == 0) {
        var arrReligiao = [
            ['Religião', 'Pessoas'],
            ['Católica', 1]
        ];
    }


    var data = google.visualization.arrayToDataTable(arrReligiao);

    var options = {
        'legend': 'bottom',
        'height': '300px',
        'pieHole': 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('graficoReligiao'));
    chart.draw(data, options);

}


// tabela
google.charts.load('current', {
    'packages': ['table'],
    'language': 'pt-br',
    callback: tabelaMunicipio
});

function tabelaMunicipio(arrMunicipio) {
    if (document.querySelector("#idMunicipioSelecionar").selectedIndex == 0){
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('string', 'Característica');
        dataTable.addColumn('string', 'Descrição');
    } else {
        if(arrMunicipio.length > 0){
            var dataTable = new google.visualization.DataTable();
            dataTable.addColumn('string', 'Característica');
            dataTable.addColumn('string', 'Descrição');
            dataTable.addRows(arrMunicipio);
        }
        
    }
    console.log('aqui tabela')
    var table = new google.visualization.Table(document.getElementById('dadosMunicipio'));

    table.draw(dataTable, {
        showRowNumber: false,
        width: '100%',

        page : 'enable',
        pageSize: 10
    });
}