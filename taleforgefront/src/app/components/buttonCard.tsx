'use client'
import React from 'react';

const ButtonCard = (props: any) => {
  const { price, features, buttonNames = ['Choose'] } = props.renderData;  // Default to 'Choose' if buttonNames not provided

  return (
    <div className="card glass w-96">
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{price}</h2>
        {features.map((feature: string, index: number) => (
          <p key={index}>{feature}</p>
        ))}
        <div className="card-actions w-full mt-4">
          {buttonNames.map((buttonName: string, index: number) => (
            <button
              key={index}
              type="button"
              className="btn btn-primary w-full"
              onClick={props.sendChoice}
            >
              {buttonName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonCard;


