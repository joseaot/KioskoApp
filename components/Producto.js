import Image from "next/image"
import { formatearDinero } from "../helpers"
import useKiosko from "../hooks/useKiosko"


const Producto = ({producto}) => {

    const { handleSetProducto, handleChangeModal } = useKiosko();

    const { nombre, imagen, precio } = producto;
  return (
    <div className="border p-3">
        <Image 
            src={`/assets/img/${imagen}.jpg`} 
            alt={`Imagen del platillo ${nombre}`}
            width={400}
            height={500}
        />
        <div className="p-5">
            <h3 className="text-2xl font-bold ">{nombre}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">
                {formatearDinero(precio)}
            </p>

            <button 
                type="button"
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold rounded-full" 
                onClick={()=> 
                    {
                        handleSetProducto(producto)
                        handleChangeModal()
                    }
                }
            >
                Agregar
            </button>
        </div>
    </div>

  )
}

export default Producto;