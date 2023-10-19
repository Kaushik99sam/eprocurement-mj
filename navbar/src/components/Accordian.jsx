const AccordianItem = ({ product, vendors }) => {
  return <>
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading-${product.id}`}>
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${product.id}`} aria-expanded="true" aria-controls={`collapse-${product.id}`}>
          {product.product_name}
        </button>
      </h2>
      <div id={`collapse-${product.id}`} className="accordion-collapse collapse" aria-labelledby={`heading-${product.id}`} data-bs-parent="#productaccordian">
        <div className="accordion-body">
          <table className="table table-striped">
            <thead>
              <th>Vendor</th>
              <th>Bid Price[₹]</th>
              <th>Select</th>
            </thead>
            <tbody>
              {vendors.map((vendor) => {
                return <tr key={vendor.id}>
                  <td>{vendor.vendor_name}</td>
                  <td>{vendor.bid_price}</td>
                  <td><input type="checkbox"/></td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
}

export default function Accordian({ products, vendors }) {
  return (
    <>
      <div className="card p-4 m-3">
        <div className="accordion" id="productaccordian">
          {products.map((product) => {
            return <AccordianItem product={product} vendors={vendors}/>
          })}
        </div>
      </div>
    </>
  );
}