document.addEventListener('DOMContentLoaded', function () {
    const livros = document.querySelectorAll('.livro');
    const mensagem = document.getElementById('mensagem');
    const porta = document.getElementById('porta');

    // Referências aos elementos de áudio
    const somArmadilha = document.getElementById('somArmadilha'); // Som para os livros da armadilha
    const somPorta = document.getElementById('somPorta'); // Som da passagem

    // Gerar 3 IDs de livros aleatórios (sem repetição)
    const idsLivros = Array.from({ length: livros.length }, (_, i) => i + 1); // Cria um array [1, 2, ..., número de livros]
    const livrosArmadilha = [];
    for (let i = 0; i < 3; i++) {
        const indiceAleatorio = Math.floor(Math.random() * idsLivros.length);
        livrosArmadilha.push(idsLivros[indiceAleatorio]);
        idsLivros.splice(indiceAleatorio, 1); // Remove o ID escolhido para evitar repetição
    }

    console.log('Livros da armadilha:', livrosArmadilha); // Para depuração

    // Definir o livro secreto (para abrir a passagem)
    const livroSecreto = Math.floor(Math.random() * livros.length) + 1;

    livros.forEach(livro => {
        livro.addEventListener('click', function () {
            const id = parseInt(this.getAttribute('data-id'));

            if (id == livroSecreto) {
                // Livro correto: ativa a passagem secreta
                somPorta.currentTime = 0;
                somPorta.play();

                mensagem.textContent = 'Você encontrou a passagem secreta!';
                mensagem.style.color = 'green';
                porta.style.display = 'block'; // Mostra a porta
                porta.classList.add('aberta'); // Ativa a animação
            } else if (livrosArmadilha.includes(id)) {
                // Livros da armadilha: ativa o som e exibe mensagem
                somArmadilha.currentTime = 0;
                somArmadilha.play();

                mensagem.textContent = 'Cuidado! Você ativou uma armadilha!';
                mensagem.style.color = 'red';
            } else {
                // Livros normais: sem som, exibe mensagem padrão
                mensagem.textContent = 'Nada acontece.';
                mensagem.style.color = 'gray';
                porta.classList.remove('aberta'); // Remove a animação
                setTimeout(() => {
                    if (!porta.classList.contains('aberta')) {
                        porta.style.display = 'none'; // Esconde após a transição
                    }
                }, 500); // Espera a transição de 0.5s
            }
        });
    });
});