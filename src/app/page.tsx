'use client'

import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  age: z.number().min(0, "Idade deve ser positiva"),
  birthDate: z.string().refine(val => !isNaN(Date.parse(val)), "Data inválida"),
})

type Schema = z.infer<typeof schema>

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(schema),
  })
  
  const onSubmit = async (data: Schema) => {
    const processedData = {
      ...data,
      birthDate: new Date(data.birthDate),
    };

    try {
      const response = await fetch('/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData)
      })

      if (!response.ok) {
        throw new Error('Erro na requisição!')
      }

      const result = await response.json();
      console.log('Resposta da API:', result);
    } catch (error) {
      console.error('Erro no envio do formulário:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-auto bg-gray-100 p-10 rounded-[10px]">
      <div className="flex justify-center mb-4">
        <h1 className="text-[40px] font-bold">Formulário teste</h1>
      </div>
      <div className="flex flex-col space-y-4">
        <input type="text" placeholder="Nome" className="border p-2 rounded" {...register('name')} />
        {errors.name && <span>{errors.name.message}</span>}
        
        <input type="number" placeholder="Idade" className="border p-2 rounded" {...register('age', { valueAsNumber: true })}/>
        {errors.age && <span>{errors.age.message}</span>}
        
        <input type="date" placeholder="Data de nascimento" className="border p-2 rounded" {...register('birthDate')} />
        {errors.birthDate && <span>{errors.birthDate.message}</span>}
        
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="condicao-especial" className="border p-2 rounded" />
          <label htmlFor="condicao-especial">Condição especial?</label>
        </div>
      </div>

      <button 
        type="submit"
        className="flex w-[135px] py-2 px-3 bg-gray-400 m-auto mt-10 items-center justify-center rounded-[10px]"
      >
        Enviar
      </button>
    </form>
  );
}
