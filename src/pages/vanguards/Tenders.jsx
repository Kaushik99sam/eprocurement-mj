import { useEffect, useMemo, useState } from "react";
import {TableVendor,Table,Table2} from "../../components/vanguards";

import { useNavigate } from "react-router-dom";
import { useGetAllRfpQuery } from "../../service/product";

export default function Tenders() {
  const {
    isLoading,
    isError,
    isSuccess,
    data: Data,
    error,
  } = useGetAllRfpQuery();

  const navigate = useNavigate();

  const [data, setData] = useState(() => Data);

  const columns = ["id", "isSplit", "description", "status"];

  if (isLoading) {
    return <h1>Loading ....</h1>;
  }

  if (Data) {
    // console.log(Data);
    return (
      <>
        <Table2 datas={Data} columns={columns} />
      </>
    );
  }
}
