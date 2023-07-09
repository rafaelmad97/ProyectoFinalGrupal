import {  useSearchParams } from "react-router-dom";


const Resumen = () => {
    const params = useSearchParams()
  return (
    <div>
     {JSON.stringify(params).split(",").join("\n\r\n")}
    </div>
  );
};

export default Resumen;
