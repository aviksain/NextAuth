'use client';

import {useRouter} from 'next/navigation';


function page({params}: any) {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">
            This is ObjectId Route
          </h2>
          <p>Your MongoDb ObjectId is {params.id}</p>
          <div className="card-actions justify-end">
            <button onClick={(e) => {router.push('/profile')}}className="btn">
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
