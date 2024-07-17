'use client'
import React from 'react'

const choiceCard = () => {
function handleClick(value: string) {
        console.log(value + 'clicked');
    }
  return (
    <div> <div className="card card-side bg-base-100 shadow-xl" style={{ transform: 'scale(0.9)' }}>
        
    <div className="card-body">
      <h2 className="card-title">Choices</h2>
      
      <div className="card-actions justify-end">
      
        <button onClick={() => handleClick('1')} className="btn btn-primary">you are a wizard</button>
        <button onClick={() => handleClick('2')} className="btn btn-primary">you are a knight</button>
        <button onClick={() => handleClick('3')} className="btn btn-primary">you are an elf</button>
        
      </div>
      
    </div>
    
  </div></div>
  )
}

export default choiceCard