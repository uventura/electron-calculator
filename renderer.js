const formElement = document.getElementById('form-area')
function makeSubmit()
{
    formElement.submit();
}

function pressButton(value)
{
    console.log(value)
    const inputElement = document.querySelector('#input-calculator')
    inputElement.value += value;
}