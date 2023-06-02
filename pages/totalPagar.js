import Layout from "../layout/layout"
import { useEffect, useCallback } from "react";
import useKiosko from "../hooks/useKiosko";
import { formatearDinero } from "../helpers";

export default function totalPagar() {

   
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pedido, nombre, setNombre, colocarOrden, total } = useKiosko();

   
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const comprobarPedido = useCallback(() =>{
        return pedido.length === 0 || nombre === '' || nombre.length<3;
    },[pedido, nombre]);
    
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        comprobarPedido()
    },[pedido, comprobarPedido])

   
    return(
        <Layout pagina='Total y Confirmar pedido'>
            <h1 className="text-4xl font-black">Total y Confirmar pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuacion</p>

            <form
                onSubmit={colocarOrden}
            >
                <div>
                    <label 
                        htmlFor="nombre"
                        className="block uppercase text-slate-800 font-bold text-xl"
                    >
                        Nombre
                    </label>
                    <input 
                        id="nombre"
                        type="text"
                        className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mt-10 ">
                    <p className="text-2xl">Total a pagar: {''} <span className="font-bold">{formatearDinero(total)}</span></p>
                </div>

                <div className="mt-5">
                    <input
                        type="submit"
                        className={`${comprobarPedido() ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-800'} text-center w-full lg:w-auto rounded font-bold px-5 py-2 uppercase text-white`}
                        value='Confirmar pedido'
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>
        </Layout>
    )
}