import Accordian from "../components/Accordian";
import productData from "../data/product.json";
import vendorData from "../data/vendor.json";

export default function SplitIndent() {
    return <>
        <div className="d-flex justify-content-center">
            <h3>List of Products</h3>
        </div>
        <Accordian products={productData} vendors={vendorData} />
    </>;
}