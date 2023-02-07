import React, { useState } from "react";
import getMovie from "./App"
import "./Card.css"

export default function Card({Title,Year,Thumb,Rank,Description,Imdbid,HandleClick}){
        
      

    return(

        <div onClick={HandleClick} id={Imdbid} className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4  rounded-md h-auto">
           <div className="hvr-underline-from-center card_content m-4 rounded-md overflow-hidden shadow-2xl"> 
            <img className="w-full" src={Thumb} />
            <div className="p-2 font-semibold text-slate-300 text-md">
             {Rank && <h3>Rank: {Rank}</h3>}
            <h1 className="font-bold text-xl
             border-b-2 pt-1 text-slate-300 pb-3 border-gray-600 ">{Title} <span className="font-semibold text-lg
            ">( {Year} )</span> </h1>
         
            <p className=" overflow-hidden mt-4 font-semibold p-1 text-slate-400 text-sm mb-3">{Description}</p></div>
        </div></div>
    )
}