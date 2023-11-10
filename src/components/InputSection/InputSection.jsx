import {useState} from 'react'
import BackButton from '../BackButton/BackButton'
import CopyButton from '../CopyButton/CopyButton'
import '../InputSection/InputSection.scss'

function InputSection() {
    const [text, setText] = useState('')
    const [accentuatedText, setAccentuatedText] = useState('')
    const wordStyles = {
        backgroundColor: "#b32400",
        opacity: .8,
        borderRadius: '.2rem',
        marginRight: '2px',
        paddingLeft: '2px'
    }

    const isVowel = (letter) => {
        const vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я']
        if (letter === undefined) return false
        return vowels.includes(letter.toLowerCase())
    }

    // const removeSpecialChars = (str) => {
    //     return str.replace(/[;,:"]/g, '');
    // }

    const handleClick = (clickedWord, letterIndex) => {
        let words = text.split(/\s+/)
        words.forEach((word, wordIndex) => {
            // word = removeSpecialChars(word)
            // clickedWord = removeSpecialChars(word)
            if (word === clickedWord) {
                if (isVowel(word[letterIndex]) && word[letterIndex + 1] !== '\u0301') {
                    words[wordIndex] = word
                        .split('')
                        .map((letter, index) => {
                            if (index === letterIndex) {
                                return letter + '\u0301'
                            }
                            return letter
                        })
                        .join('')
                } else if (word[letterIndex + 1] === '\u0301') {
                    words[wordIndex] = word.slice(0, letterIndex) + word[letterIndex] + word.slice(letterIndex + 2)
                }
            }
        })
        const newText = words.join(' ')
        setText(newText)
        setAccentuatedText(newText)
        renderStanza(text)
    }

    const renderStanza = (stanza) => {
        return stanza.split(' ').map((word, wordIndex) => {
            return (<span key={wordIndex} style={word.indexOf('\u0301') !== -1 ? {} : wordStyles}>
                        {word.split('').map((letter, letterIndex) => (
                            <span key={letterIndex} onClick={() => handleClick(word, letterIndex)}>
                                {letter}
                            </span>
                        ))}{' '}
                    </span>)
        })
    }

    const showText = () => {
        document.querySelector('.content__textarea').style.display = 'none'
        document.querySelector('.content__button').style.display = 'none'
        if (document.querySelector('.content__verse')) {
            document.querySelector('.content__verse').style.display = 'block'
            document.querySelector('.content__button--copy').style.display = 'block'
            document.querySelector('.content__button--exit').style.display = 'block'
        }
        setAccentuatedText(text)
    }

    return (
        <section className="content wrapper">
            <textarea className="content__textarea" onChange={(e) => setText(e.target.value)}></textarea>
            <button className="content__button" onClick={() => showText()}>
                Аccentuate
            </button>
            {accentuatedText && (
                <>
                    <div className="content__verse" id="text">
                        {renderStanza(accentuatedText)}
                    </div>
                    <CopyButton id="#text"/>
                    <BackButton/>
                </>
            )}
        </section>
    )
}

export default InputSection
