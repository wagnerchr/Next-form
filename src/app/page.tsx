'use client'

import Image from "next/image";
import { FormEvent } from "react";

export default function Home() {

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log('foi enviado!!!')
  }



  return (
      <form onSubmit={onSubmit} className="flex flex-col w-auto bg-gray-100 p-10 rounded-[10px]">
        <div className="flex justify-center mb-4">
          <h1 className="text-[40px] font-bold">Formulário teste</h1>
        </div>
        <div className="flex flex-col space-y-4">
          <input type="text" placeholder="Nome" className="border p-2 rounded" />
          <input type="number" placeholder="Idade" className="border p-2 rounded" />
          <input type="date" placeholder="Data de nascimento" className="border p-2 rounded" />
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="condicao-especial" className="border p-2 rounded" />
            <label htmlFor="condicao-especial">Condição especial?</label>
          </div>
        </div>

        <button 
          type="submit"
          className="flex w-[135px] py-2 px-3 bg-gray-400 m-auto mt-10 items-center justify-center rounded-[10px]"
          >Enviar</button>
      </form>
  
  );
}
