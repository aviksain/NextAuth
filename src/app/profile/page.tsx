"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


function page() {
  const router = useRouter();
  const [user, setUser] = useState<any>({});

  const objectIdRoute = () => {
    router.push(`/profile/${user._id}`);
  }

  const logout = async() => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
    }
    catch(err:any) {
      toast.error(err.massage);
    }
  }

  const fetchData = async() => {
    try {
      const res = await axios.get('/api/users/me');
      setUser(res.data.data);
      console.log(res.data.data);
    }
    catch(err:any) {
      toast.error(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">{user.username}</h2>
          <p>email : {user.email}</p>
          <p>createdAt : {user.createdAt}</p>
          <p>updatedAt : {user.updatedAt}</p>
          <div className="card-actions justify-end">
            <button onClick={objectIdRoute}className="btn">ObjectId Route</button>
            <button onClick={logout}className="btn">Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
