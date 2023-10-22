import { useState } from 'react'
import '../InputSection/InputSection.scss'

function InputSection() {
    const [text, setText] = useState('')

    const showText = (verse) => {
        const section = document.querySelector('.content')
        const textarea = section.querySelector('.content__textarea')
        const button = section.querySelector('.content__button')
        const p = document.createElement('p')

        textarea.style.display = 'none'
        button.style.display = 'none'

        p.innerText = verse
        p.classList.add('content__verse')

        section.append(p)
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
            <button className="content__button" onClick={() => showText(text)}>
                accentuate
            </button>
        </section>
    )
}

export default InputSection
