import React from 'react';

const ButtonCard = (props: any) => {
  // Ensure props.buttonNames is an array to avoid runtime errors
  const buttonNames = Array.isArray(props.buttonNames) ? props.buttonNames : [];

  return (
    <div className="card glass w-96">
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{props.price}</h2>
        {props.features.map((feature: string, index: number) => (
          <p key={index} value={feature}>{feature}</p>
        ))}
        <div className="card-actions w-full mt-4">
          {buttonNames.map((buttonName: string, index: number, type: string) => (
            <button key={index} type={type} className="btn btn-primary w-full">{buttonName}</button>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default ButtonCard;
