let firstNumber = '';
let secondNumber = '';
let sign = '';
let cashedSign = '';
let operationFinished = false;
let size = 4;
let len = 8;

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const actions = ['-', '+', '/', 'X'];

//display
const out = document.querySelector('.calc-screen p');

function clearAll(){
    firstNumber = '';
    secondNumber = '';
    sign = '';
    operationFinished = false;
    out.style.fontSize = '4rem';
    size = 4;
    out.textContent = '0';
    console.log('ac')
}

//function to resize font for display all digits
function resizeFont(a){
    let len = a.toString().length;
    if(len < 4) return 4;
    return 29 / len ;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    console.log(firstNumber, secondNumber, sign);

    if (firstNumber.toString().length >= len || (firstNumber.toString().length + secondNumber.length + 1) >= len){
        size = resizeFont(`${firstNumber}${secondNumber}${sign}`);
        out.style.fontSize = `${size}rem`;
    }
    
    //was pressed not buttnon
    if(!event.target.classList.contains('btn')) return;
    //was pressed ac
    if(event.target.classList.contains('ac')) return;

    //out.textContent = '';

    //get pressed key
    const key = event.target.textContent;

    //was pressed 0-9 or .
    if (digits.includes(key)){
        if (key === '.') dotWasPressed = true;
        if (secondNumber === '' && sign === ''){
            firstNumber += key;
            if(firstNumber[0] === '0' && firstNumber.length === 1) firstNumber = '0';
            if (firstNumber[0] === '0' && firstNumber[1] !== '.' && firstNumber[1] !== undefined){
                firstNumber = '0';
            }
            
            else if (firstNumber[0] === '.' && firstNumber.length === 1) firstNumber = '0' + firstNumber;
            else if (firstNumber.split('.').length > 2) firstNumber = firstNumber.slice(0, -1);
            out.textContent = firstNumber;
        }
        else if (firstNumber !== '' && secondNumber !== '' && operationFinished){
            secondNumber = key;
            operationFinished = false;
            out.textContent = `${firstNumber}${sign}${secondNumber}`;
        }
        else{
            secondNumber += key;
            if(secondNumber[0] === '0' && secondNumber.length === 1) secondNumber = '0';
            if (secondNumber[0] === '0' && secondNumber[1] !=='.' && secondNumber[1] !== undefined) secondNumber = '0';
            else if (secondNumber[0] === '.' && secondNumber.length === 1) secondNumber = '0' + secondNumber;
            else if (secondNumber.split('.').length > 2) secondNumber = secondNumber.slice(0, -1);
            out.textContent = `${firstNumber}${sign}${secondNumber}`;
        }
        console.log(firstNumber, secondNumber, sign);
        return;
    }

    //was pressed sign
    if (actions.includes(key)){
        cashedSign = key;
        if(firstNumber !=='' && secondNumber !==''){
            document.getElementById('equals').click();    
        }
        sign = key;
        out.textContent = `${firstNumber}${sign}`;
        console.log(firstNumber, secondNumber, sign);
        return;
    }

    //was pressed =
    if (key === '='){
        if (firstNumber !=='' && secondNumber ===''){
            out.textContent = (+firstNumber);
            sign = '';
            return;
        }
        switch(sign){
            case '+':
                firstNumber = (+firstNumber) + (+secondNumber);
                break;
            case '-':
                firstNumber = (+firstNumber) - (+secondNumber);
                break;
            case 'X':
                firstNumber = (+firstNumber) * (+secondNumber);
                break;
            case '/':
                firstNumber = (+firstNumber) / (+secondNumber);
                break;
        }

        operationFinished = true;
        size = resizeFont(firstNumber);
        out.style.fontSize = `${size}rem`;
        out.textContent = firstNumber;
        console.log(firstNumber, secondNumber, sign);

        if (firstNumber !=='' && secondNumber !=='' && (+secondNumber) === 0 && sign === '/'){
            out.style.fontSize = "2.5rem";
            out.textContent = 'ZeroDivision\nError';    
        }
        return;
    }

    // +/- was pressed
    if (key === '+/-'){
        firstNumber*= -1;
        out.textContent = firstNumber;    
    }

    //% was pressed
    if (key === '%'){
        let result = Number(firstNumber);
        if (firstNumber !=='' && secondNumber !=='' && sign !==''){  
            let percentage = (+secondNumber) * ((+firstNumber)/100);
            switch(sign){
                case '+':
                    result += percentage;
                    break;
                case '-':
                    result -= percentage;
                    break;
                case 'X':
                    result *= percentage;
                    break;
                case '/':
                    result /= percentage;
                    break;
            }
        }
        secondNumber = '';
        operationFinished = true;
        firstNumber = result.toString();
        size = resizeFont(firstNumber);
        out.style.fontSize = `${size}rem`;
        out.textContent = firstNumber;
        console.log(result, secondNumber, sign);
        return;
    }
}
