function BackButton() {
    const showInputSection = () => {
        document.querySelector('.content__textarea').style.display = 'flex'
        document.querySelector('.content__button').style.display = 'flex'
        document.querySelector('.content__verse').style.display = 'none'
        document.querySelector('.content__button--copy').style.display = 'none'
        document.querySelector('.content__button--exit').style.display = 'none'
    }

    return (
        <button className="content__button content__button--exit" onClick={() => showInputSection()}>
            Exit
        </button>
    )
}

export default BackButton
