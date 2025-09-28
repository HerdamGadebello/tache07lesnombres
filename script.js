// quiz-responsivo.js
// Arquivo JavaScript para responsividade e gestos móveis

document.addEventListener('DOMContentLoaded', () => {
    // Ajustar elementos para diferentes tamanhos de tela
    adjustLayoutForScreenSize();
    
    // Adicionar event listeners para gestos móveis
    addMobileGestures();
    
    // Reajustar layout quando a janela for redimensionada
    window.addEventListener('resize', adjustLayoutForScreenSize);
});

function adjustLayoutForScreenSize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Elementos a serem ajustados
    const mainSquares = document.querySelectorAll('.main-square');
    const mascotes = document.querySelectorAll('.mascote');
    const logos = document.querySelectorAll('.logo');
    const optionsContainers = document.querySelectorAll('.options-container');
    const mascotNeutro = document.getElementById('mascot-neutro');
    
    if (screenWidth <= 768) {
        // Layout para dispositivos móveis
        mainSquares.forEach(square => {
            square.style.padding = '15px';
            square.style.width = '95%';
        });
        
        mascotes.forEach(mascote => {
            mascote.style.maxWidth = '80px';
            mascote.style.bottom = '-10px';
            mascote.style.left = '-10px';
        });
        
        logos.forEach(logo => {
            logo.style.maxWidth = '100px';
            logo.style.top = '10px';
            logo.style.left = '10px';
        });
        
        if (mascotNeutro) {
            mascotNeutro.style.maxWidth = '250px';
        }
        
        optionsContainers.forEach(container => {
            container.style.gridTemplateColumns = '1fr';
            container.style.gap = '10px';
        });
        
        // Ajustar tamanho da fonte para melhor legibilidade
        document.body.style.fontSize = '14px';
    } else if (screenWidth <= 1024) {
        // Layout para tablets
        mainSquares.forEach(square => {
            square.style.padding = '20px';
            square.style.width = '85%';
        });
        
        mascotes.forEach(mascote => {
            mascote.style.maxWidth = '100px';
        });
        
        logos.forEach(logo => {
            logo.style.maxWidth = '120px';
        });
        
        if (mascotNeutro) {
            mascotNeutro.style.maxWidth = '280px';
        }
        
        optionsContainers.forEach(container => {
            container.style.gridTemplateColumns = '1fr 1fr';
        });
        
        document.body.style.fontSize = '16px';
    } else {
        // Layout para desktop
        mainSquares.forEach(square => {
            square.style.padding = '30px';
            square.style.width = '600px';
        });
        
        mascotes.forEach(mascote => {
            mascote.style.maxWidth = '120px';
        });
        
        logos.forEach(logo => {
            logo.style.maxWidth = '150px';
        });
        
        if (mascotNeutro) {
            mascotNeutro.style.maxWidth = '300px';
        }
        
        optionsContainers.forEach(container => {
            container.style.gridTemplateColumns = '1fr 1fr';
        });
        
        document.body.style.fontSize = '16px';
    }
    
    // Ajustar altura mínima para garantir que o conteúdo seja visível
    document.querySelectorAll('.quiz-container, #home-page, #results-page').forEach(container => {
        container.style.minHeight = `${screenHeight}px`;
    });
}

function addMobileGestures() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    // Detectar toque inicial
    document.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].screenX;
        startY = e.changedTouches[0].screenY;
    });
    
    // Detectar fim do toque
    document.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].screenX;
        endY = e.changedTouches[0].screenY;
        handleGesture();
    });
    
    function handleGesture() {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Ignorar gestos muito pequenos
        if (Math.abs(deltaX) < 50 && Math.abs(deltaY) < 50) return;
        
        // Determinar direção do gesto
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Gestos horizontais (navegação)
            if (deltaX > 0) {
                // Deslizar para a direita - voltar
                navigateQuestion(-1);
            } else {
                // Deslizar para a esquerda - avançar
                navigateQuestion(1);
            }
        }
    }
    
    function navigateQuestion(direction) {
        // Verificar se estamos em uma tela de quiz
        const quizEasy = document.getElementById('quiz-easy');
        const quizDifficult = document.getElementById('quiz-difficult');
        
        if (quizEasy.style.display === 'flex' || quizDifficult.style.display === 'flex') {
            // Simular clique no botão de navegação correspondente
            if (direction === -1) {
                // Botão voltar
                const prevButton = quizEasy.style.display === 'flex' ? 
                    document.getElementById('easy-prev-button') : 
                    document.getElementById('difficult-prev-button');
                
                if (!prevButton.disabled) {
                    prevButton.click();
                }
            } else {
                // Botão avançar
                const nextButton = quizEasy.style.display === 'flex' ? 
                    document.getElementById('easy-next-button') : 
                    document.getElementById('difficult-next-button');
                
                nextButton.click();
            }
        }
    }
    
    // Adicionar feedback tátil para botões em dispositivos móveis
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', () => {
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', () => {
            button.style.transform = 'scale(1)';
        });
    });
    
    // Melhorar acessibilidade para toque
    document.querySelectorAll('.option').forEach(option => {
        option.style.minHeight = '44px'; // Tamanho mínimo recomendado para toque
        option.style.display = 'flex';
        option.style.alignItems = 'center';
        option.style.justifyContent = 'center';
    });
}
