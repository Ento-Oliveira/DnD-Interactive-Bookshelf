document.addEventListener('DOMContentLoaded', function () {
    const livros = document.querySelectorAll('.livro');
    const mensagem = document.getElementById('mensagem');
    const porta = document.getElementById('porta');
    const gas = document.getElementById('gas');

    const somArmadilha = document.getElementById('somArmadilha');
    const somPorta = document.getElementById('somPorta');

    const idsLivros = Array.from({ length: livros.length }, (_, i) => i + 1);
    const livrosArmadilha = [];
    for (let i = 0; i < 3; i++) {
        const indiceAleatorio = Math.floor(Math.random() * idsLivros.length);
        livrosArmadilha.push(idsLivros[indiceAleatorio]);
        idsLivros.splice(indiceAleatorio, 1);
    }

    console.log('Livros da armadilha:', livrosArmadilha);

    const livroSecreto = Math.floor(Math.random() * livros.length) + 1;

    livros.forEach(livro => {
        livro.addEventListener('click', function () {
            const id = parseInt(this.getAttribute('data-id'));

            if (id == livroSecreto) {
                somPorta.currentTime = 0;
                somPorta.play();

                porta.style.visibility = 'visible';
                porta.classList.add('aberta');
            } else if (livrosArmadilha.includes(id)) {
                somArmadilha.currentTime = 0;
                somArmadilha.play();

                gas.classList.remove('libera');

                void gas.offsetWidth;

                gas.classList.add('libera');

                setTimeout(() => {
                    gas.classList.remove('libera');
                }, 3000);
            } else {
                porta.classList.remove('aberta');
                setTimeout(() => {
                    if (!porta.classList.contains('aberta')) {
                        porta.style.visibility = 'hidden';
                    }
                }, 500);
            }
        });
    });
});
