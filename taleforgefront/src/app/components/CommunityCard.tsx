import React from 'react';

interface CommunityCardProps {
  image: string;
  title: string;
  description: string;
  availability: string;
  members: string;
  price: string;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  image,
  title,
  description,
  availability,
  members,
  price,
}) => {
  return (
    <div className="card bg-base-100 w-80 h-70 shadow-xl">
      
      <figure className="w-full h-48">
       <img src="https://picsum.photos/200" alt="Image Card" className="w-full h-full object-cover" />
      </figure>
    <div className="card-body p-4">
    <h2 className="card-title text-sm">{title}</h2>
    </div>
 
      <div className="card-body p-4">
        <h2 className="card-title text-sm">{title}</h2>
        <p className="text-xs">{description}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline text-xs">{availability}</div>
        </div>
        <div className="card-actions justify-end">
          <div className="badge badge-outline text-xs">{members}</div>
          <div className="badge badge-outline text-xs">{price}</div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;