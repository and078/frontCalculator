let a = ''; //first number
let b = ''; //second number
let sign = '';//operator
let cashedSign = '';
let finish = false;
let size = 4;
let len = 8;

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const actions = ['-', '+', '/', 'X'];

//display
const out = document.querySelector('.calc-screen p');

function clearAll(){
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.style.fontSize = '4rem';
    size = 4;
    out.textContent = '0';
    console.log('ac')
}

function resizeFont(a){
    let len = a.toString().length;
    if(len < 4) return 4;
    return 29 / len ;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    console.log(a, b, sign);

    if (a.toString().length >= len || (a.toString().length + b.length + 1) >= len){
        size = resizeFont(`${a}${b}${sign}`);
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
        if (b === '' && sign === ''){
            a += key;
            if(a[0] === '0' && a.length === 1) a = '0';
            if (a[0] === '0' && a[1] !== '.' && a[1] !== undefined){
                a = '0';
            }
            
            else if (a[0] === '.' && a.length === 1) a = '0' + a;
            else if (a.split('.').length > 2) a = a.slice(0, -1);
            out.textContent = a;
        }
        else if (a !== '' && b !== '' && finish){
            b = key;
            finish = false;
            out.textContent = `${a}${sign}${b}`;
        }
        else{
            b += key;
            if(b[0] === '0' && b.length === 1) b = '0';
            if (b[0] === '0' && b[1] !=='.' && b[1] !== undefined) b = '0';
            else if (b[0] === '.' && b.length === 1) b = '0' + b;
            else if (b.split('.').length > 2) b = b.slice(0, -1);
            out.textContent = `${a}${sign}${b}`;
        }
        console.log(a, b, sign);
        return;
    }

    //was pressed sign
    if (actions.includes(key)){
        cashedSign = key;
        if(a !=='' && b !==''){
            document.getElementById('equals').click();    
        }
        sign = key;
        out.textContent = `${a}${sign}`;
        console.log(a, b, sign);
        return;
    }

    //was pressed =
    if (key === '='){
        if (a !=='' && b ===''){
            out.textContent = (+a);
            sign = '';
            return;
        }
        switch(sign){
            case '+':
                a = (+a) + (+b);
                break;
            case '-':
                a = (+a) - (+b);
                break;
            case 'X':
                a = (+a) * (+b);
                break;
            case '/':
                a = (+a) / (+b);
                break;
        }

        finish = true;
        size = resizeFont(a);
        out.style.fontSize = `${size}rem`;
        out.textContent = a;
        console.log(a, b, sign);

        if (a !=='' && b !=='' && (+b) === 0 && sign === '/'){
            out.style.fontSize = "2.5rem";
            out.textContent = 'ZeroDivision\nError';    
        }
        return;
    }

    // +/- was pressed
    if (key === '+/-'){
        a*= -1;
        out.textContent = a;    
    }

    //% was pressed
    if (key === '%'){
        let result = Number(a);
        if (a !=='' && b !=='' && sign !==''){  
            let percentage = (+b) * ((+a)/100);
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
        b = '';
        finish = true;
        a = result.toString();
        size = resizeFont(a);
        out.style.fontSize = `${size}rem`;
        out.textContent = a;
        console.log(result, b, sign);
        return;
    }
}
