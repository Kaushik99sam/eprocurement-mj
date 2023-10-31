import { useParams } from "react-router-dom";
import Accordian from "../../components/vanguards/Accordian";
import { useGetProductWithVendorsQuery } from "../../service/product";
import { useDispatch, useSelector } from "react-redux";
import { productState } from "../../slices/productSlice";
import { useAddPoMutation } from "../../service/po";
export default function SplitTendor() {
//   const { id } = useParams();

    const product = useSelector(productState);

    const [addPo] = useAddPoMutation()
    const dispatch = useDispatch()


    function generatePo(){
      // console.log(product.refids)
      console.log({refTable:product.refids})

      dispatch(addPo({refTable:product.refids}))
    }
  const {
    isLoading,
    isError,
    isSuccess,
    data: Data,
    error,
  } = useGetProductWithVendorsQuery(1);
  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div style={{position:"relative"}}>
        <h3 className="ms-5" style={{position:"fixed", top:"15%", zIndex:1}}>Total: ₹{product.total}</h3>
        <div className="container pt-5">
    {
        Data.map((data,index)=>(
            <Accordian productVendor={data} key={index}/>
            
            ))
        }
    </div>
    <button className="btn btn-success" style={{position:"fixed", bottom:"6%", right:"0%", zIndex:1}} disabled={product.total === 0} onClick={generatePo}>Generate PO</button>
    </div>
  );
}
