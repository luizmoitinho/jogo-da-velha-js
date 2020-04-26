
$(document).ready(function () {
  var rodada = 1;
  var matrizJogo = new Array('a', 'b', 'c');
  matrizJogo['a'] = new Array(3)
  matrizJogo['b'] = new Array(3)
  matrizJogo['c'] = new Array(3)

  for (linha of matrizJogo) {
    matrizJogo[linha][1] = 0;
    matrizJogo[linha][2] = 0;
    matrizJogo[linha][3] = 0;
  }


  $("#img-play").click(function () {

    if ($('#player1').val() === "") { alert('Apelido do jogador 1 não foi preenchido'); return false }

    else if ($('#player2').val() === "") { alert('Apelido do jogador 2 não foi preenchido'); return false }

    else {
      $('#menu').css('display', 'none')
      $('#game-player').fadeIn('slow')

      $("#name-jogador1").text($('#player1').val());
      $("#name-jogador2").text($('#player2').val());

    }
  })

  $('.move').click(function () {
    var idCampoClicado = this.id
    $('#'+idCampoClicado).off();
    jogada(idCampoClicado);

  })

  function jogada(id) {
    var icone = '';
    var ponto = 0;
    if (rodada % 2 == 1) {
      icone = 'url("img/marcacao_1.png")'
      ponto = -1;
    } else {
      icone = 'url("img/marcacao_2.png")'
      ponto = 1;
    }
    rodada++;

    $('#' + id).css('background-image', icone);
    $('#' + id).css('background-repeat', 'no-repeat');
    $('#' + id).css('justify-self', 'center');

    var linhaColuna = id.split('-');
    matrizJogo[linhaColuna[0]][linhaColuna[1]] = ponto;
    isCampeao();

  }

  // verifica na horizontal e na vertical
  function isCampeao() {
    var pontos = 0;
    var coluna = 1;
    let boolCampeao = false;
    //horizontal
    for (let linha of matrizJogo)
      if (campeao(pontosPorLinha(linha))) return;
    
    for (let coluna = 1; coluna <= 3; coluna++)
      if (campeao(pontosPorColuna(coluna))) return;
    
    let i=1;
    for(let linha of  matrizJogo){
       pontos += matrizJogo[linha][i];
       i++
    }
    if(campeao(pontos)) return;
   
    i=3;
    pontos=0;
    for(let linha of  matrizJogo){
       pontos += matrizJogo[linha][i];
       i--
    }
    if(campeao(pontos)) return;

  }

  function pontosPorColuna(coluna) {
    let pontos = 0;
    pontos += matrizJogo['a'][coluna];
    pontos += matrizJogo['b'][coluna];
    pontos += matrizJogo['c'][coluna];

    return pontos;

  }
  function pontosPorLinha(linha) {
    var coluna = 1, pontos = 0;
    while (coluna <= 3) {
      pontos += matrizJogo[linha][coluna];
      coluna++;
    }
    return pontos;
  }

  function campeao(pontos) {
    if (pontos == -3) {
      alert($('#player1').val()+' é o vencedor!!!');
      $('.move').off();
      return true;
    } else if (pontos == 3) {
      alert($('#player2').val()+' é o vencedor!!!');
      $('.move').off();
      return true;
    }

  }
})







