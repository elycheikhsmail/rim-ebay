"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "@/locales/client";
//  const t = useI18n() 

export default function PaginationUI(props: {
  totalPages: number;
  currentPage: number;
}) {
  const router = useRouter();
  const t = useI18n() 

  const handleClickToNextPage = () => {
    //const currentPage = Number(router.query.page) || 1;
    const nextPage = props.currentPage + 1;
    router.push(`?page=${nextPage}`);
  };

  const handleClickPrevPage = () => {
    //const currentPage = Number(router.query.page) || 1;
    const nextPage = props.currentPage - 1;
    router.push(`?page=${nextPage}`);
  };

  return (
    <>
    <div className="mt-8 flex justify-center">
      <button 
        onClick={() => handleClickPrevPage()}
        disabled={props.currentPage === 1}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 disabled:opacity-50"
      >
        {t('pagination.prev')}
      </button>
      <span className="py-2 px-4">
        {t('pagination.currentPage')} {props.currentPage} {t('pagination.of')} {props.totalPages}
      </span>
      <button 
        onClick={() => handleClickToNextPage()}
        disabled={props.currentPage === props.totalPages}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 disabled:opacity-50"
      >
        {t('pagination.next')}
      </button>
    </div>
  </>
  );
}
