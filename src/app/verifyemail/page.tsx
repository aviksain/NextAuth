"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [errMassage, setErrorMassage] = useState("");

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (err: any) {
      setError(true);
      setErrorMassage(err.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative flex flex-col mt-6 text-gray-100 bg-black shadow-md bg-clip-border rounded-xl w-3/5">
        <div className="p-6">
          <h3 className="block mb-2 font-sans text-4xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Verify Email Page
          </h3>
          {error ? (
            <h4 className="text-red-600 text-2xl">Something Went Wrong</h4>
          ) : (
            <h4 className="text-green-600">Email Verified Successfully</h4>
          )}
        </div>
        <div className="flex justify-around p-6 pt-0">
          <button
            onClick={(e) => {
              router.push("/signup");
            }}
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
          >
            Sign Up
          </button>
          <button
            onClick={(e) => {
              router.push("/login");
            }}
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
