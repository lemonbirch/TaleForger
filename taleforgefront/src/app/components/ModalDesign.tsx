import React from 'react'

const ModalDesign = (props: { onClick: React.MouseEventHandler<HTMLButtonElement> | undefined }) => {
  return (
    <dialog id="my_modal_2" className="modal">
    <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Login or sign up for a free Account</p>
        <button onClick={props.onClick}>test</button>
    </div>
    <form method="dialog" className="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
  )
}

export default ModalDesign