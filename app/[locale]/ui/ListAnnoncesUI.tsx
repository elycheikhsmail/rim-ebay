import Link from "next/link";
import Image from "next/image";
import { Annonce } from "@/app/types";
import PaginationUI from "./PaginationUI";

const fallbackImageUrl = "/noimage.jpg";


function AnnonceItemUI(annonce: Annonce) {
  const getImage = () => {
    const hostServerForImages = "https://picsum.photos"
    const imgUrl = `${hostServerForImages}/${annonce.firstImagePath}`
    return (<>
      <Image
        src={imgUrl}
        alt={annonce.description}
        fill
        unoptimized
        style={{ objectFit: "cover" }}
      />
    </>)
  } 
  const createdAt = new Date(annonce.createdAt)

  const formatedDatePartOne = `${createdAt.getDay()}-${createdAt.getMonth()}-${createdAt.getFullYear()} `

  const formatedDatePartTwo = `${createdAt.getHours()} h : ${createdAt.getMinutes()} min`
  return (
    <>
      <article className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="p-6 flex-grow">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2">
            {annonce.typeAnnonceName} {" "} / {" "}
            {annonce.categorieName}
          </span>
          <h2 className="text-xl font-semibold mb-2">
            {annonce.title}
          </h2>
          <p className="text-gray-600 mb-2">{annonce.description}</p>
          <p className="text-lg font-bold">{annonce.price} UMR / jour</p>
         
        </div>

        <div className="relative h-48 w-full">
          {
            annonce.haveImage && (getImage())
          }
          {
            !annonce.haveImage && (<Image
              src={fallbackImageUrl}
              alt={annonce.description}
              fill
              unoptimized
              style={{ objectFit: "cover" }}
            />)
          }
        </div>

        <div className="p-6 flex-grow">

          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2">
            <span>  {formatedDatePartOne}  </span> |
            <span>  {formatedDatePartTwo}  </span>
          </span>

        </div>

      </article>
    </>
  );
}




export default function ListAnnoncesUI(
  { totalPages, currentPage, annonces }: { totalPages: number; currentPage: number; annonces: Annonce[] },
) {
  return (
    <>
      <div className="container mx-auto">
        <PaginationUI totalPages={totalPages} currentPage={currentPage} />
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {annonces.map((annonce) => (
            <Link
              href={`/p/annonces/details/${annonce.id}`}
              key={annonce.id}
              className="block"
            >
              <AnnonceItemUI {...annonce} />
            </Link>
          ))}
        </div>
        <PaginationUI totalPages={totalPages} currentPage={currentPage} />
      </div>
    </>
  );
}
