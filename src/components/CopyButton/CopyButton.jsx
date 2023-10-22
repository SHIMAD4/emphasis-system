/* eslint-disable react/prop-types */
import ClipboardJS from 'clipboard'

function CopyButton({ id }) {
    const copyText = () => {
        new ClipboardJS('.content__button--copy')
    }
    return (
        <button
            className="content__button content__button--copy"
            onClick={copyText}
            data-clipboard-target={id}>
            Copy Text
        </button>
    )
}

export default CopyButton
