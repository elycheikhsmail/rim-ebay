import React from "react";
import Image from "next/image";
//import { AnnonceUI } from "@/app/types";
import { Annonce } from "@/app/types";


const fallbackImageUrl = "/noimage.jpg";

export default function AnnonceDetailUI(
  props: { annonceId: number; annonce: Annonce },
) {
  const hostServerForImages = "https://picsum.photos";
  const getImageUrl = (imagePath: string) => {
    return `${hostServerForImages}/${imagePath}`;
  };

  const getImage = (imagePath: string, imageDescription: string = "") => {
    const imgUrl = getImageUrl(imagePath);
    return (
      <div className="relative h-48 w-full">
        <Image
          src={imgUrl}
          alt={imageDescription}
          fill
          unoptimized
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  };

  const NoImage = () => (
    <div className="relative h-48 w-full">
      <Image
        src={fallbackImageUrl}
        alt={"no image uploaded by user"}
        fill
        unoptimized
        style={{ objectFit: "cover" }}
      />
    </div>
  );

  const createdAt = new Date(props.annonce.createdAt)
  //props.annonce.createdAt
  //new Date(props.annonce.createdAt)

  const formatedDatePartOne = `${createdAt.getDay()}-${createdAt.getMonth()}-${createdAt.getFullYear()} `

  const formatedDatePartTwo = `${createdAt.getHours()} h : ${createdAt.getMinutes()} min`
  return (
    <main className="min-h-screen">
      <div className="p-8">
        <article className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto mt-8">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">

            {props.annonce.typeAnnonceNameAr} /  {props.annonce.categorieNameAr}

          </span>
          <h1 className="text-3xl font-bold mb-4">{props.annonce.title}</h1>
          <p className="text-gray-600 mb-4">{props.annonce.description}</p>
          <p className="text-2xl font-bold mb-4">
            {props.annonce.price} UMR / jour
          </p>

          <div className="space-y-4">
            {props.annonce.haveImage &&
              props.annonce.images.map((item) => getImage(item.imagePath))}
            {!props.annonce.haveImage && <NoImage />}
          </div>


          <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact</h2>
            <div className="space-y-2">
              <p className="text-gray-600">Téléphone :</p>
              <p className="text-xl font-semibold text-blue-600">22 33 44 55</p>
            </div>
          </div>

          <div className="p-6 flex-grow">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2">
              <span>  {formatedDatePartOne}  </span> |
              <span>  {formatedDatePartTwo}  </span>
            </span>
          </div>

        </article>
      </div>
    </main>
  );
}