import {  useSearchParams } from "react-router-dom";
import CompraCliente from "../Detail/CreateReviews";


const Resumen = () => {
    const params = useSearchParams()
  return (
    <div>
     {JSON.stringify(params).split(",").join("\n\r\n")}
     <CompraCliente/>
    </div>
  );
};

export default Resumen;
