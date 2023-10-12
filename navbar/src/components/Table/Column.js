const columns = [
    {
      header: "Id",
      accessorKey: "id",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "description",
      cell: (info) => info.getValue(),
      header: () => "Description",
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "status",
      header: () => "Status",
      cell: (info) => (<><button className={`btn btn-sm ${info.getValue() === 'open' ? 'btn-primary' : 'btn-danger'}`} disabled={info.getValue() === 'closed'} onClick={() => navigate(`/suppliers/${info.row.original.id}`)}>{info.getValue()}</button></>),
      footer: (props) => props.column.id,
    }
]

export default columns;