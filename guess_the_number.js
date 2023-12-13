var jackpot = 0; // Initialize jackpot to 0
var attempts = 0;

function generateNewJackpot () {
    return Math.floor( Math.random() * 100 ) + 1;
}

function startGame () {
    document.querySelector( ".start-game-btn" ).style.display = "none";
    document.querySelector( ".won" ).style.display = "none";
    document.querySelector( ".container" ).innerHTML = '';
    jackpot = generateNewJackpot();
    generateCircles();
    attempts = 0;
}

function startNewGame () {
    document.querySelector( ".won" ).style.display = "none";
    document.querySelector( ".container" ).innerHTML = '';
    jackpot = generateNewJackpot();
    attempts = 0;
    document.querySelector( ".start-game-btn" ).style.display = "inline-block";
}

function generateCircles () {
    for ( i = 1; i <= 100; i++ ) {
        var circle = document.createElement( "div" );
        circle.classList.add( "circle" );
        circle.dataset.number = i;
        circle.textContent = i;
        circle.addEventListener( "click", handleCircleClick );
        document.querySelector( ".container" ).appendChild( circle );
    }
}

function handleCircleClick ( event ) {
    attempts++;
    var clickedNumber = Number( event.target.dataset.number );

    if ( attempts <= 7 ) {
        if ( jackpot === clickedNumber ) {
            document.querySelector( ".won" ).style.display = "block";
            document.querySelector( ".won h1" ).textContent = "Congratulations! You've won the jackpot!";
            disableAllNumbers();
            document.querySelector( ".new-game-btn" ).style.display = "block";
        } else {
            if ( attempts === 7 ) {
                // Chances are over, display "You lost the game" message
                document.querySelector( ".won" ).style.display = "block";
                document.querySelector( ".won h1" ).textContent = "Sorry! You lost the game. Better luck next time!";
                disableAllNumbers();
                document.querySelector( ".new-game-btn" ).style.display = "block";
            } else {
                if ( jackpot > clickedNumber ) {
                    alert( `jackpot is larger than ${ clickedNumber }` );
                    for ( i = 1; i <= clickedNumber; i++ ) {
                        document.querySelector( `.circle:nth-child(${ i })` ).classList.add( 'smaller-circle' );
                        document.querySelector( `.circle:nth-child(${ i })` ).style.pointerEvents = "none";
                    }
                } else if ( jackpot < clickedNumber ) {
                    alert( `jackpot is smaller than ${ clickedNumber }` );
                    for ( i = clickedNumber + 1; i <= 100; i++ ) {
                        document.querySelector( `.circle:nth-child(${ i })` ).classList.add( 'smaller-circle' );
                        document.querySelector( `.circle:nth-child(${ i })` ).style.pointerEvents = "none";
                    }
                }
            }
        }
    }
}

function disableAllNumbers () {
    var circles = document.querySelectorAll( '.circle' );
    circles.forEach( circle => {
        circle.style.pointerEvents = "none";
    } );
}