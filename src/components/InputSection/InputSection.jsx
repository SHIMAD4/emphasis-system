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

    const removeSpecialChars = (word) => {
        if (word.length === 0) {
            return word
        }
        let isFirstCharUpperCase = false

        if (word[0] === word[0].toUpperCase()) {
            isFirstCharUpperCase = true
        }
        const cleanedWord = word.replace(/[,:"]/g, '')

        return isFirstCharUpperCase ? cleanedWord : cleanedWord.toLowerCase()
    }

    const handleClick = (clickedWord, letterIndex) => {
        let words = text.split(/\s+/)
        words.forEach((word, wordIndex) => {
            const originalCase = word

            word = removeSpecialChars(word.toLowerCase())
            clickedWord = removeSpecialChars(clickedWord.toLowerCase())

            if (word === clickedWord) {
                if (isVowel(word[letterIndex]) && word[letterIndex + 1] !== '\u0301') {
                    words[wordIndex] = originalCase
                        .split('')
                        .map((letter, index) => {
                            if (index === letterIndex) {
                                return letter + '\u0301'
                            }
                            return letter
                        })
                        .join('')
                } else if (word[letterIndex + 1] === '\u0301') {
                    words[wordIndex] = originalCase.slice(0, letterIndex) + originalCase[letterIndex] + originalCase.slice(letterIndex + 2)
                }
            }
        })

        const newText = words.join(' ')
        setText(addAccentuation(newText))
        setAccentuatedText(addAccentuation(newText))
        renderStanza(addAccentuation(newText))
    }

    const renderStanza = (stanza) => {
        return stanza.split(' ').map((word, wordIndex) => {
            const isAccented = word.indexOf('\u0301') !== -1
            const isSingleLetter = /^[\u0400-\u04FF]$/i.test(word)
            const shouldExcludeStyling = word.toLowerCase() === 'ль'

            return (
                <span key={wordIndex}
                      style={shouldExcludeStyling ? {} : (isAccented || isSingleLetter) ? {} : wordStyles}>
                {word.split('').map((letter, letterIndex) => (
                    <span key={letterIndex} onClick={() => handleClick(word, letterIndex)}>
                        {letter}
                    </span>
                ))}{' '}
            </span>
            )
        })
    }

    const addAccentuation = (text) => {
        const words = text.split(/\s+/)

        const accentuatedWords = words.map((word) => {
            if (word.length === 1) return word

            return word.toLowerCase() === 'или'
                ? word.replace(/[аеёиоуыэюяАЕЁИОУЫЭЮЯ]/, (match) => match + '\u0301')
                : word
        })

        return accentuatedWords.join(' ')
    }

    const showText = () => {
        document.querySelector('.content__textarea').style.display = 'none'
        document.querySelector('.content__button').style.display = 'none'
        if (document.querySelector('.content__verse')) {
            document.querySelector('.content__verse').style.display = 'block'
            document.querySelector('.content__button--copy').style.display = 'block'
            document.querySelector('.content__button--exit').style.display = 'block'
        }

        const updatedText = text.split(/\s+/).map(word => {
            if (word.toLowerCase() === 'или') {
                return word.replace(/[аеёиоуыэюяАЕЁИОУЫЭЮЯ]/, match => match + '\u0301')
            }
            return word
        }).join(' ')

        setAccentuatedText(addAccentuation(updatedText))
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
