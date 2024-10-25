import AddAnnonceUI from "./AddAnnonceUI";  
 
export default function AddAnnonce({ params }: { params: { locale: string } }) {
  return (
    <>
      <AddAnnonceUI lang={params.locale}  />
    </>
  );
}
