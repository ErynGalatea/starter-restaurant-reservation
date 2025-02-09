import { finishTable } from "../utils/api";

export default function DisplayTables({ tables, loadDashboard }) {
  // retrieves the table id and uses it to mark the status of table to finished
  const finishHandler = async (event) => {
    const tableId = event.target.getAttribute("data-table-id-finish");
    const abortController = new AbortController();
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      await finishTable(tableId, abortController.signal);
      loadDashboard();
      return () => abortController.abort();
    }
  };

  //format the table
  return tables.map((table, index) => {
    return (
      <tr key={index}>
        <td>
          <div name="table_id">{table.table_id}</div>
        </td>
        <td>
          <div name="table_name">{table.table_name}</div>
        </td>
        <td>
          <div name="capacity">{table.capacity}</div>
        </td>
        <td data-table-id-status={table.table_id}>
          <p>{table.reservation_id ? "Taken" : "Open"}</p>
        </td>
        {table.reservation_id ? (
          <td>
            <button
              type="button"
              data-table-id-finish={table.table_id}
              onClick={finishHandler}
              name="Finish"
              className="btn btn-danger"
            >
              <span className="oi oi-book"></span>&nbsp; Finish
            </button>
          </td>
        ) : null}
      </tr>
    );
  });
}
