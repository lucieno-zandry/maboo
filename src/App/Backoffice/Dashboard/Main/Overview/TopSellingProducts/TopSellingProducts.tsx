const TopSellingProducts = () => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Top-Selling Products</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Product A - 300 sales</li>
          <li className="list-group-item">Product B - 250 sales</li>
          <li className="list-group-item">Product C - 200 sales</li>
        </ul>
      </div>
    </div>
  );
};

export default TopSellingProducts;
