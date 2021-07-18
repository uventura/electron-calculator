class Stack
{
    constructor()
    {
        this.stack = []
    }
    top()
    {
        return this.stack[this.stack.length-1]
    }
    push(element)
    {
        this.stack.push(element)
    }
    pop()
    {
        let activeTop = this.stack[this.stack.length-1];
        this.stack.pop()
        return activeTop
    }
    empty()
    {
        return this.stack.length === 0
    }
}

function lexicalAnalysis(expr)
{
    /*
        SOLVE THE PARANTHESIS PROBLEM, LIKE (8+42-) 
    */

    let lexical = []
    let number = ''
    expr = expr.split('')
    expr.forEach(element => {
        if( element === '(' || element === ')' || element === '*' || element === '+' || element === '-' || element === '/')
        {
            if(number !== '')lexical.push(parseFloat(number))
            lexical.push(element)
            number = ''
        }
        else
        {
            number += element
        }
    })
    if(number !== '')lexical.push(parseFloat(number))
    return lexical
}

function syntacticAnalysis(lexical)
{
    let order = {'(':0,'+':1,'-':1,'*':2,'/':2}

    let opestack = new Stack
    let elements = new Stack
    let wrong = false

    lexical.forEach(element => {
        if(element == '(') opestack.push('(')
        else if(element == ')')
        {
            let foundOpenParen = false
            while(opestack.top()!=='('&&!opestack.empty())
            {
                elements.push(opestack.pop())
                if(opestack.top()==='(')foundOpenParen=true;
            }
            if(foundOpenParen)opestack.pop()
            else
            {
                console.log('Error in expression')
                wrong = true
                return false
            }
        }
        else if(element === '+'||element==='-'||element==='*'||element==='/')
        {
            if(!opestack.empty())
            {
                while(order[element]<order[opestack.top()]&& !opestack.empty())
                {
                    elements.push(opestack.pop())
                }
            }
            opestack.push(element)
        }
        else elements.push(element)
    });

    if(wrong) return []

    while(!opestack.empty())
    {
        elements.push(opestack.pop())
        if(opestack.top()=='('){break}
    }

    return elements
}

function getResult(syntacticAnalysis)
{
    let value = []
    syntacticAnalysis.stack.forEach(element => {
        if(element !== '*' && element !== '+' && element !== '-' && element !== '/')
        {
            value.push(element)
        }
        else
        {
            let result = 0
            switch(element)
            {
                case '+':
                    result = value[value.length-1] + value[value.length-2]
                    break
                case '-':
                    result = value[value.length-2] - value[value.length-1]
                    break
                case '*':
                    result = value[value.length-1] * value[value.length-2]
                    break
                default:
                    if(value[value.length-1]!=0)
                        result = value[value.length-2] / value[value.length-1]
                    else
                    {
                        return false
                    }
            }
            value.pop()
            value.pop()
            value.push(result)
        }
    })

    return value[0]
}

function makeOperation(expression)
{
    let lexical = lexicalAnalysis(expression)
    let elements = syntacticAnalysis(lexical)
    let val = getResult(elements)
    return val
}
console.log(makeOperation('43.3*7'))