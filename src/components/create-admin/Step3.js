import { Link } from "react-router-dom";
import VerifyImg from "../../assets/verified.png"

const Step3 = () => {    

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 bg-create-admin"
    >
      <div className="bg-opacity-75 p-4 rounded-4" style={{ width: "100%", maxWidth: "600px" }}>
        {/* Header */}
        <div className="mb-4">
          <h5 className="fw-bold text-success mb-1">Create Account For Administrator</h5>
          <p className="text-muted small mb-0">Proceed  to login page after verification </p>
        </div>

        {/* Step Progress */}
        <div className="d-flex justify-content-center align-items-center mb-4">
          <div className="border border-success rounded-circle" style={{ width: "14px", height: "14px" }}></div>
          <div className="flex-grow-1 border-top border-success mx-2"></div>
          <div className="border border-success rounded-circle" style={{ width: "14px", height: "14px" }}></div>
          <div className="flex-grow-1 border-top border-success mx-2"></div>
          <div className="bg-success rounded-circle" style={{ width: "14px", height: "14px" }}></div>          
        </div>
        <p className="text-center text-success small fw-semibold mb-4">Step 3 of 3</p>

        {/* Form */}
        <div>
          <p className="text-success text-center fs-3">
            Congratulations your Infomation is verified 
          </p>
          <div className="d-flex justify-content-center">
            <img src={VerifyImg} className="img-fluid" width={"150px"} />
          </div>
          <p className="text-center my-4">
            <Link to="/admin/login" className="text-success mt-4">
            Proceed to Login
          </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Step3;