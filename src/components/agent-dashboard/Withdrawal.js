import React, { useState } from "react";

const Withdrawal = () => {
  const [amount, setAmount] = useState("");
  const [savedMethods, setSavedMethods] = useState([
    { id: 1, name: "Opay", account: "9064591463" },
    { id: 2, name: "UBA", account: "2164485770" },
  ]);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleProceed = () => {
    if (!amount || !selectedMethod) {
      alert("Please enter amount and select a method.");
      return;
    }
    alert(
      `Withdrawing ₦${amount} via ${selectedMethod.name} (${selectedMethod.account})`
    );
  };

  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div className="col-md-10 rounded-4 p-4 shadow-sm">
          <div className="row g-4">
            {/* LEFT SIDE */}
            <div className="col-md-8 border-end">
              <h5 className="fw-bold text-success mb-3">
                Available Earnings: <span className="text-dark">₦500,000</span>
              </h5>

              <input
                type="number"
                className="form-control mb-3"
                placeholder="Enter amount to withdraw"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <p className="fw-semibold text-secondary mb-2">Saved Methods</p>
              <div className="d-flex flex-column gap-2 mb-3">
                {savedMethods.map((method) => (
                  <button
                    key={method.id}
                    className={`btn btn-sm ${
                      selectedMethod?.id === method.id
                        ? "btn-success text-white"
                        : "btn-outline-success"
                    }`}
                    onClick={() => setSelectedMethod(method)}
                  >
                    {method.name} ({method.account})
                  </button>
                ))}
              </div>

              <button
                className="btn btn-success w-100 fw-semibold"
                onClick={handleProceed}
              >
                Proceed
              </button>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-md-4 text-center">
              <p className="fw-bold text-success mb-3">
                <i className="fa-solid fa-plus me-2"></i>Add New Payment Method
              </p>

              <div className="d-flex flex-column gap-3 align-items-center">
                <button className="btn btn-outline-success w-75">
                  <i className="fa-solid fa-building-columns me-2"></i>Bank Transfer
                </button>
                <button className="btn btn-outline-success w-75">
                  <i className="fa-brands fa-bitcoin me-2"></i>Crypto
                </button>
                <button className="btn btn-outline-success w-75">
                  <i className="fa-solid fa-credit-card me-2"></i>Payment Gateway
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;