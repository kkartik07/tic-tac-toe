export const playerIsWin = (array) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (array[a] && array[a] === array[b] && array[a] === array[c]) {
            return lines[i];
        }
    }
    return null;
}


export const highlight = (winningCells) => {
    const buttons = document.querySelectorAll('.block');
    let flashing = true;
    const flashInterval = setInterval(() => {
        if (flashing) {
            winningCells.forEach(index => {
                buttons[index].style.backgroundColor = 'yellow'; 
            });
        } else {
            winningCells.forEach(index => {
                buttons[index].style.backgroundColor = ''; 
            });
        }
        flashing = !flashing;
    }, 500); 

    setTimeout(() => {
        clearInterval(flashInterval); // Stop flashing after 3 seconds
        winningCells.forEach(index => {
            buttons[index].style.backgroundColor = 'yellow'; // Permanent color change
        });
    }, 3000);
}

export const resetCellColors = () => {
    const buttons = document.querySelectorAll('.block');
    buttons.forEach(button => {
        button.style.backgroundColor = ''; // Reset background color
    });
}