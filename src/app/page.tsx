'use client';

import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="relative flex flex-col mt-6 text-gray-100 bg-black shadow-md bg-clip-border rounded-xl w-3/5">
        <div className="p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Next Auth / Auth Js
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          NextAuth.js is a popular open-source authentication library for Next.js applications. It provides a flexible and easy-to-use solution for adding authentication to your Next.js projects, supporting various authentication providers such as OAuth, JWT, email/password, and more.
          <br/>
          With NextAuth.js, you can handle user authentication, session management, and authorization easily, abstracting away much of the complexity involved in setting up authentication systems. It's particularly well-suited for Next.js applications due to its seamless integration with the framework.
          <br/>
          The library supports a wide range of authentication providers out of the box, including social login providers like Google, Facebook, GitHub, and others. Additionally, it offers hooks and utilities to streamline the authentication process within your Next.js components.
          <br/>
          NextAuth.js simplifies common authentication tasks, such as signing in, signing out, and accessing user information, allowing you to focus more on building your application's features rather than worrying about the intricacies of authentication implementation.
          </p>
        </div>
        <div className="flex justify-around p-6 pt-0">
          <button
          onClick={(e) => {router.push('/signup')}}
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
          >
            Sign Up
          </button>
          <button
            onClick={(e) => {router.push('/login')}}
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
