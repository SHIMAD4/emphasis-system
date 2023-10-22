import { useState } from 'react'
import CopyButton from '../CopyButton/CopyButton'
import '../InputSection/InputSection.scss'

function InputSection() {
    const [text, setText] = useState('')
    const [accentuatedText, setAccentuatedText] = useState('')

    const isVowel = (letter) => {
        const vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я']
        return vowels.includes(letter.toLowerCase())
    }

    const handleClick = (word, letterIndex) => {
        if (isVowel(word[letterIndex]) && word[letterIndex + 1] !== '\u0301') {
            const accentedWord = word
                .split('')
                .map((letter, index) => {
                    if (index === letterIndex) {
                        return letter + '\u0301'
                    }
                    return letter
                })
                .join('')

            const newText = text.replace(word, accentedWord)
            setText(newText)
            setAccentuatedText(newText)
        } else if (word[letterIndex + 1] === '\u0301') {
            const deaccentedWord =
                word.slice(0, letterIndex) + word[letterIndex] + word.slice(letterIndex + 2)
            const newText = text.replace(word, deaccentedWord)
            setText(newText)
            setAccentuatedText(newText)
        }
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
            <textarea className="content__textarea" onChange={(e) => setText(e.target.value)}></textarea>
            <button className="content__button" onClick={() => showText()}>
                accentuate
            </button>
            {accentuatedText && (
                <>
                    <div className="content__verse" id="text">
                        {renderStanza(accentuatedText)}
                    </div>
                    <CopyButton id="#text" />
                </>
            )}
        </section>
    )
}

export default InputSection
