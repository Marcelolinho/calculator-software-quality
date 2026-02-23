import { useRef, useState } from 'react'
import { OperationsImpl } from './classes/OperationsImpl'
import './App.css'

function App() {
  const operationsRef = useRef(new OperationsImpl())
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('0')

  const evaluateExpression = (value: string): string => {
    if (!value.trim()) {
      return '0'
    }

    operationsRef.current.expression = value
    const resolved = operationsRef.current.resolveExpression()

    if (!Number.isFinite(resolved)) {
      return 'Erro'
    }

    return String(resolved)
  }

  const appendValue = (value: string) => {
    setExpression((previous) => {
      const nextExpression = `${previous}${value}`
      const liveResult = evaluateExpression(nextExpression)
      setResult((current) => (liveResult === 'Erro' ? current : liveResult))
      return nextExpression
    })
  }

  const clearAll = () => {
    setExpression('')
    setResult('0')
  }

  const clearEntry = () => {
    setExpression((previous) => {
      const nextExpression = previous.slice(0, -1)
      if (!nextExpression.trim()) {
        setResult('0')
      } else {
        const liveResult = evaluateExpression(nextExpression)
        setResult((current) => (liveResult === 'Erro' ? current : liveResult))
      }
      return nextExpression
    })
  }

  const resolve = () => {
    const finalResult = evaluateExpression(expression)
    if (finalResult === 'Erro') {
      setResult('Erro')
      return
    }

    setResult(finalResult)
    setExpression(finalResult)
  }

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      clearAll()
      return
    }

    if (value === 'CE') {
      clearEntry()
      return
    }

    if (value === '=') {
      resolve()
      return
    }

    appendValue(value)
  }

  return (
    <div className='container'>
      <div className='calculator'>
        <div className='text-block'>
          <input type='text' id='result-input' value={result} readOnly />
          <input type='text' id='main-input' value={expression} readOnly />
        </div>
        <div className='buttons'>
          <div className='buttons-block'>
            <button type='button' className='scientific-btn grid-col-1-2' onClick={() => handleButtonClick('(')}>(</button>
            <button type='button' className='scientific-btn grid-col-3-4' onClick={() => handleButtonClick(')')}>)</button>
          </div>
          <div className='buttons-block'>
            <button type='button' className='scientific-btn' onClick={() => handleButtonClick('C')}>C</button>
            <button type='button' className='scientific-btn' onClick={() => handleButtonClick('CE')}>CE</button>
            <button type='button' className='scientific-btn' onClick={() => handleButtonClick('/')}>/</button>
            <button type='button' className='scientific-btn' onClick={() => handleButtonClick('%')}>%</button>
          </div>
          <div className='buttons-block'>
            <button type='button' onClick={() => handleButtonClick('7')}>7</button>
            <button type='button' onClick={() => handleButtonClick('8')}>8</button>
            <button type='button' onClick={() => handleButtonClick('9')}>9</button>
            <button type='button' className='scientific-btn' onClick={() => handleButtonClick('*')}>*</button>
          </div>
          <div className='buttons-block'>
            <button type='button' onClick={() => handleButtonClick('4')}>4</button>
            <button type='button' onClick={() => handleButtonClick('5')}>5</button>
            <button type='button' onClick={() => handleButtonClick('6')}>6</button>
            <button type='button' className='scientific-btn' onClick={() => handleButtonClick('-')}>-</button>
          </div>
          <div className='buttons-block'>
            <button type='button' onClick={() => handleButtonClick('1')}>1</button>
            <button type='button' onClick={() => handleButtonClick('2')}>2</button>
            <button type='button' onClick={() => handleButtonClick('3')}>3</button>
            <button type='button' className='scientific-btn' onClick={() => handleButtonClick('+')}>+</button>
          </div>
          <div className='buttons-block'>
            <button type='button' className='zero-btn' onClick={() => handleButtonClick('0')}>0</button>
            <button type='button' className='equal-btn' onClick={() => handleButtonClick('=')}>=</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
