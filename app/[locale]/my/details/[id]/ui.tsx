"use client";
import { Annonce } from "@/app/types";
import React from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const fallbackImageUrl = "/noimage.jpg";
export default function MyAnnonceDetailsCompo(props: { annonceId: number; annonce: Annonce }) {
  const hostServerForImages = "https://picsum.photos";
  const getImageUrl = (imagePath: string) => `${hostServerForImages}/${imagePath}`;

  const getImage = (imagePath: string, imageDescription: string = "") => {
    const imgUrl = getImageUrl(imagePath);
    return (
      <div className="relative h-40 sm:h-60 w-full">
        <Image
          src={imgUrl}
          alt={imageDescription}
          fill
          unoptimized
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>
    );
  };

  const NoImage = () => (
    <div className="relative h-40 sm:h-60 w-full">
      <Image
        src={fallbackImageUrl}
        alt="no image uploaded by user"
        fill
        unoptimized
        style={{ objectFit: "cover" }}
        className="rounded-lg"
      />
    </div>
  );

  const createdAt = new Date(props.annonce.createdAt);
  const formattedDate = `${createdAt.getDate()}-${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`;
  const formattedTime = `${createdAt.getHours()}h : ${createdAt.getMinutes()} min`;

  return (
    <article className="flex flex-col gap-4 bg-white shadow-lg rounded-xl p-4 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] mx-auto my-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">Mon annonce</h2>
      <div className="space-y-2 h-40 sm:h-60 w-full">
        {props.annonce.haveImage ? (
          <Carousel className="rounded-xl" infiniteLoop autoPlay showThumbs={false}>
            {props.annonce.images.map((item, index) => (
              <div className="h-40 sm:h-60" key={index}>
                {getImage(item.imagePath)}
              </div>
            ))}
          </Carousel>
        ) : (
          <NoImage />
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center">
          <span className="inline-block bg-green-800 rounded-md px-2 py-1 text-xs sm:text-sm font-semibold text-white">
            {props.annonce.typeAnnonceNameAr} / {props.annonce.categorieNameAr}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
            {formattedDate} | {formattedTime}
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold my-2">{props.annonce.title}</h1>
        
        <p className="text-gray-600 text-sm sm:text-base mb-4">{props.annonce.description}</p>

        <div className="hover:bg-gray-100 rounded-md p-0">
          <div className="border-t border-green-800 my-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base font-bold">PRIX</span>
            <p className="text-base sm:text-lg text-green-800 font-bold">{props.annonce.price} UMR / jour</p>
          </div>
          <div className="border-t border-green-800 my-2"></div>
        </div>

        <div className="hover:bg-gray-100 rounded-md p-0 mt-2">
          <div className="border-t border-green-800 my-2"></div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Contact</h2>
            <p className="text-md font-semibold text-blue-600">22 33 44 55</p>
          </div>
          <div className="border-t border-green-800 my-2"></div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
          <button className="bg-red-500 w-full sm:w-44 h-10 hover:bg-red-600 rounded-lg text-white font-bold">
            Retirer
          </button>
          <button className="bg-green-500 w-full sm:w-44 h-10 rounded-lg hover:bg-green-600 text-white font-bold">
            Edit
          </button>
        </div>
      </div>
    </article>
  );
}
