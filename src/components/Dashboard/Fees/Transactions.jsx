import React from "react";
import BankDetailsTable from "./BankDetailsTable";

const Transactions = () => {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h3 className="card-title">Payments</h3>
      </div>
      <div className="card-body">
        <div className="table-container">
          {/* You don’t need a closing tag if no children are passed */}
          <BankDetailsTable />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
