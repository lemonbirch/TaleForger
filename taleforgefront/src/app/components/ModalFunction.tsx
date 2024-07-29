'use client'

const Modal = () => {
    const showModal = () => {
        const modal = document.getElementById('my_modal_2')
        if (modal instanceof HTMLDialogElement) {
            modal.showModal()
        }
    };
    const handleClick = () => {
        alert('hello')
    }

    return (
        <div>
            <button className="btn" onClick={showModal}>
                open modal
            </button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Login or sign up for a free Account</p>
                    <button onClick={handleClick}>test</button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default Modal