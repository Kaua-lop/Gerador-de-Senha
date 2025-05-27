
let passwordLength = 16;
const inputElement = document.querySelector("#password");
const upperCaseCheckElement = document.querySelector('#uppercase-check');
const numberCheckElement = document.querySelector('#number-check');
const symbolCheckElement = document.querySelector('#symbol-check');
const securityIndicatorBarElement = document.querySelector('#security-indicator-bar');


function generatePassword(){
    let chars = "abcdefghjkmnpqrstuvwxyz";

    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const numberChars = "123456789";
    const symbolChars = "?!@&*()[]";

    if(upperCaseCheckElement.checked){
        chars += upperCaseChars;
    }
    if(numberCheckElement.checked){
        chars += numberChars;
    }
    if(symbolCheckElement.checked){
        chars += symbolChars;
    }
    

    let password = "";

    for (let i = 0; i < passwordLength; i++){ //Gerando Senha aleatoria
        const randomNumber = Math.floor(Math.random() * chars.length);  //Numero Randomico que vai de 1 a total de chars.
        password += chars.substring(randomNumber, randomNumber + 1); 
    }
    inputElement.value = password;
    calculateQuality();
    calculateFontSize();
    //console.log(password);
}

function calculateQuality(){ //Calcular o nivel de segurança da senha com Pesos.

    const percent = Math.round((passwordLength / 64) * 10 + 
        (upperCaseCheckElement.checked ? 25 : 0)  + 
        (symbolCheckElement.checked ? 35 : 0) +
        (numberCheckElement.checked ? 30 : 0)
    );
    securityIndicatorBarElement.style.width =`${percent}%`;
    
    if (percent > 69 ) { //Mudar a cor da barra de acordo com o percent
        //Safe
        securityIndicatorBarElement.classList.remove("critical");
        securityIndicatorBarElement.classList.remove("warning");
        securityIndicatorBarElement.classList.add("safe");
    } else if (percent > 50){
        // Warning
        securityIndicatorBarElement.classList.remove("critical");
        securityIndicatorBarElement.classList.add("warning");
        securityIndicatorBarElement.classList.remove("safe");
    }
    else{
        //Critical
        securityIndicatorBarElement.classList.add("critical");
        securityIndicatorBarElement.classList.remove("warning");
        securityIndicatorBarElement.classList.remove("safe");
    }
    if (percent >= 100){
        securityIndicatorBarElement.classList.add("completed");
    }
    else{
        securityIndicatorBarElement.classList.remove("completed")
    }
    //console.log(percent);
}

function calculateFontSize(){ //Mudar tamanho da fonte
    if(passwordLength > 45){
        inputElement.classList.remove('font-sm');
        inputElement.classList.remove('font-xs');
        inputElement.classList.add('font-xxs');
    } else if (passwordLength > 32){
        inputElement.classList.remove('font-sm');
        inputElement.classList.add('font-xs');
        inputElement.classList.remove('font-xxs');
    } else if (passwordLength > 22){
        inputElement.classList.add('font-sm');
        inputElement.classList.remove('font-xs');
        inputElement.classList.remove('font-xxs');
    }
    else{
        inputElement.classList.remove('font-sm');
        inputElement.classList.remove('font-xs');
        inputElement.classList.remove('font-xxs');

    }
}

function copy(){ //Copiar a Senha Gerada
    navigator.clipboard.writeText(inputElement.value);
}

const passwordLengthElement = document.querySelector('#password-length'); // Gerar senhas de acordo com tamnho do input range
passwordLengthElement.addEventListener('input', function(){
    passwordLength = passwordLengthElement.value;
    document.querySelector('#password-length-text').innerText = passwordLength;
    //console.log(passwordLength)
    generatePassword();
});
upperCaseCheckElement.addEventListener('click', generatePassword);
symbolCheckElement.addEventListener('click', generatePassword);
numberCheckElement.addEventListener('click', generatePassword);

document.querySelector('#copy-1').addEventListener('click', copy); 
document.querySelector('#copy-2').addEventListener('click', copy);
document.querySelector('#renew').addEventListener('click', generatePassword);


generatePassword();