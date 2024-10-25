"use client";

import React from "react";
import Link from "next/link";
import {
  FaHome,
  FaList,
  FaPlus,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useI18n } from "@/locales/client";

export const NavAuthUI = ({ lang = "ar" }) => {

  const isAr = lang === "ar"
  console.log({ lang })
  const router = useRouter();
  const t = useI18n()

  const handleLogout = async () => {
    const response = await fetch(`/${lang}/api/logout`, { method: "POST" });
    if (response.ok) {
      console.log("logout")
      router.push(`/`);
      //router.push(`${lang}/p/users/connexion`);
      router.refresh();
    }
  };

  return (
    <nav className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
      <div className="left">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-yellow-300 transition duration-300"
        >
          <FaHome className="inline-block mr-2" />
          {t('nav.rimIjar')}
        </Link>
      </div>
      <div className="right flex space-x-6">
        <Link
          href={`/${lang}/my/list`}
          className="flex items-center hover:bg-blue-600 px-3 py-2 rounded transition duration-300"
        >
          <FaList className="mr-2" />
          {t('nav.myListings')}
        </Link>
        <Link
          href={`/${lang}/my/add`}
          id="addannonce"
          className="flex items-center hover:bg-blue-600 px-3 py-2 rounded transition duration-300"
        >
          <FaPlus className="mr-2" /> <span> <br /></span>
          {t('nav.addListing')}
        </Link>
        <button
          id="deconnexion"
          onClick={handleLogout}
          className="flex items-center hover:bg-purple-500 px-3 py-2 rounded transition duration-300"
        >
          {t('nav.logout')}
        </button>

        {!isAr && <Link
          href="/ar"
          className="flex items-center hover:bg-purple-500 px-3 py-2 rounded transition duration-300"
        >
          العربية
        </Link>}
        {isAr && <Link
          href="/fr"
          className="flex items-center hover:bg-purple-500 px-3 py-2 rounded transition duration-300"
        >
          francais
        </Link>}
      </div>
    </nav>
  );
};

export const NavNonAuthUI = ({ lang = "ar" }) => {
  const isAr = lang === "ar"
  console.log({ lang })
  const t = useI18n()

  return (
    <nav className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
      <div className="left">

        <Link
          href={`/${lang}`}
          className="text-2xl font-bold hover:text-yellow-300 transition duration-300"
        >
          <FaHome className="inline-block mr-2" />
          {t('nav.rimIjar')}
        </Link>

      </div>


      {/* <div className="left">
        <Link
          href="/p/labo"
          className="text-2xl font-bold hover:text-yellow-300 transition duration-300"
        >
          {t('nav.labo')}
        </Link>
      </div> */}
      <div className="right flex space-x-6">
        <Link
          href={`/${lang}/p/users/connexion`}
          className="flex items-center hover:bg-green-500 px-3 py-2 rounded transition duration-300"
        >
          <FaSignInAlt className="mr-2" />  <span> <br /></span>
          {t('nav.login')}
        </Link>
        <Link
           href={`/${lang}/p/users/register`}
          className="flex items-center hover:bg-purple-500 px-3 py-2 rounded transition duration-300"
        >
          <FaUserPlus className="mr-2" />
          {t('nav.signup')}
        </Link>
        {!isAr && <Link
          href="/ar"
          className="flex items-center hover:bg-purple-500 px-3 py-2 rounded transition duration-300"
        >
          العربية
        </Link>}
        {isAr && <Link
          href="/fr"

          className="flex items-center hover:bg-purple-500 px-3 py-2 rounded transition duration-300"
        >
          francais
        </Link>}

      </div>
    
    </nav>
  );
};