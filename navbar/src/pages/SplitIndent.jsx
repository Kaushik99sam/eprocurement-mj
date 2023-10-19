import Accordian from "../components/Accordian";
import productData from "../data/product.json";
import vendorData from "../data/vendor.json";

export default function SplitIndent() {
    return <Accordian products={productData} vendors={vendorData}/>
}