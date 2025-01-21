const RecentOrders = () => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Commandes récentes</h5>
        <div className="recent-orders">
          <table className="table">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1001</td>
                <td>John Doe</td>
                <td>$120</td>
                <td>Shipped</td>
              </tr>
              <tr>
                <td>#1002</td>
                <td>Jane Smith</td>
                <td>$80</td>
                <td>Pending</td>
              </tr>
              <tr>
                <td>#1003</td>
                <td>Mike Johnson</td>
                <td>$45</td>
                <td>Delivered</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
