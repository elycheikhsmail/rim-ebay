"use client"
import { handleGetAnnonces } from "./page.handlers/handleGetAnnonces";
import ListAnnoncesUI from "./ui/ListAnnoncesUI";
 
import InputDialog from "./components/InputDialog";
import Input from "./components/Input";
 

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
 
  const currentPage = Number(searchParams?.page) || 1;
  const { pageAnnonceData, errorMessage } = await handleGetAnnonces()

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="p-5 sm:mx-16 ">
      
        <div className="flex justify-between px-14 py-2">
          <p className="font-extrabold text-gray-800 text-lg sm:text-xl mb-2 sm:mb-0">Tout l`anonnce </p>
          <Input />
        </div>
        
        {errorMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : (
          pageAnnonceData && (
       
                  
                     <ListAnnoncesUI
                      totalPages={pageAnnonceData.totalPages}
                      currentPage={currentPage}
                      annonces={pageAnnonceData.annonces}
                  />
                
                  
           
          
          )
        )}
      </div>
    </main>
  );
}
