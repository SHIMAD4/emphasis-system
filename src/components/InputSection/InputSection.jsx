import { useState } from 'react'
import '../InputSection/InputSection.scss'

function InputSection() {
    const [text, setText] = useState('')
    const [accentuatedText, setAccentuatedText] = useState('')

    const isVowel = (letter) => {
        const vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я']
        return vowels.includes(letter.toLowerCase())
    }

    const handleClick = (word, letterIndex) => {
        const accentedWord = word
            .split('')
            .map((letter, index) => {
                if (index === letterIndex && isVowel(letter)) {
                    return letter + '\u0301'
                }
                return letter
            })
            .join('')

        const newText = text.replace(word, accentedWord)
        setText(newText)
        setAccentuatedText(newText)
    }

    const renderStanza = (stanza) => {
        return stanza.split(' ').map((word, wordIndex) => (
            <span key={wordIndex}>
                {word.split('').map((letter, letterIndex) => (
                    <span key={letterIndex} onClick={() => handleClick(word, letterIndex)}>
                        {letter}
                    </span>
                ))}{' '}
            </span>
        ))
    }

    const showText = () => {
        document.querySelector('.content__textarea').style.display = 'none'
        document.querySelector('.content__button').style.display = 'none'
        setAccentuatedText(text)
    }

    return (
        <section className="content wrapper">
            <textarea
                className="content__textarea"
                name=""
                id=""
                cols="30"
                rows="10"
                onChange={(e) => setText(e.target.value)}></textarea>
            <button className="content__button" onClick={() => showText()}>
                accentuate
            </button>
            {accentuatedText && <div className="content__verse">{renderStanza(accentuatedText)}</div>}
        </section>
    )
}

export default InputSection
