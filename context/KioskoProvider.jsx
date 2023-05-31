import { useEffect, useState, createContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'


const KioskoContext = createContext()


const KioskoProvider = ({children}) =>{
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto]= useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)


    const router = useRouter()





    const obtenerCategorias = async ()=>{
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }   

    useEffect(()=>{
        obtenerCategorias()
    }, [])

    useEffect(()=>{
        setCategoriaActual(categorias[0])
    }, [categorias])


    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0 )

        setTotal(nuevoTotal)
    },[pedido])


    const handleClickCategoria = id =>{
        const categoria = categorias.filter( cat=> cat.id === id )
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = producto =>{
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter( producto => producto.id === id)
        setProducto(productoActualizar[0])
        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)
        setPedido(pedidoActualizado)
    }

    


    //const handleAgregarPedido = ({categoriaId, imagen, ...producto}) con esta funcion saco la categoria y la imagen!!!
    const handleAgregarPedido = (producto) =>{
        if(pedido.some(productoState=> productoState.id === producto.id)){
            //actualiza la cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
            toast.success('⭐ Guardado Exitosamente!',{
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });

        }else{
            setPedido([...pedido, producto])
            toast.success('⭐ Agregado Exitosamente!',{
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }

        setModal(false)
    }


    const colocarOrden = async e=>{
        e.preventDefault();

        try {
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})
            

            //Resetear la app

            setCategoriaActual([0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('⭐ Pedido Realizado Exitosamente!',{
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });

            setTimeout(() => {
                router.push('/')
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }




    return(
        <KioskoContext.Provider 
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual,
                handleSetProducto,
                producto,
                handleChangeModal,
                modal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
                
                

            }}
        >
            {children}

        </KioskoContext.Provider>
    )
}


export {
    KioskoProvider
}

export default KioskoContext