import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RefundPolicy = () => {
  useEffect(() => {
    document.title = "CV Properties - Refund Policy";
  }, []);
  return (
    <div className="legal-page">
    <Navbar />
      <div className="container py-5 my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">

            <h1 className="mb-3 text-dark fw-bold text-center">Refund Policy</h1>

            <p className="text-muted mb-4">              
              <strong>Last Updated:</strong> February 8, 2026
            </p>

            <p>
              This Refund Policy explains how refunds are handled for payments made through the 
              Chuks and Vin Real Estate Management mobile application (“App”). 
              By making any payment through the App, you agree to this Refund Policy 
              in addition to our Terms of Service and Privacy Policy.
            </p>

            <hr className="my-4" />

            {/* 1 */}
            <h5 className="fw-bold text-dark">1. Scope of This Policy</h5>
            <p>This policy applies to payments made for:</p>
            <ul>
              <li>Application or inspection fees</li>
              <li>Agency or service fees</li>
              <li>Rent or caution fees (where processed through the App)</li>
              <li>Any other paid services offered by Chuks and Vin Real Estate Management</li>
            </ul>

            <hr className="my-4" />

            {/* 2 */}
            <h5 className="fw-bold text-dark">2. Non-Refundable Payments</h5>
            <p>
              The following payments are non-refundable, except where required by Nigerian law:
            </p>
            <ul>
              <li>Inspection or viewing fees after the inspection has taken place</li>
              <li>Agency fees once a tenant has been successfully introduced to a landlord</li>
              <li>Administrative or processing fees</li>
            </ul>

            <hr className="my-4" />

            {/* 3 */}
            <h5 className="fw-bold text-dark">3. Refundable Payments</h5>
            <p>Refunds may be issued under the following circumstances:</p>
            <ul>
              <li>Duplicate or erroneous charges</li>
              <li>
                Payment made for a property that becomes unavailable before inspection or agreement
              </li>
              <li>
                Failed transactions where money was debited but service was not provided
              </li>
              <li>
                Cancellation of a service by Chuks and Vin before it is delivered
              </li>
            </ul>

            <hr className="my-4" />

            {/* 4 */}
            <h5 className="fw-bold text-dark">4. Rent and Tenancy-Related Refunds</h5>
            <p>
              Rent and caution fees are governed by the specific Tenancy Agreement signed 
              between the landlord and tenant.
            </p>
            <p>
              Chuks and Vin shall not be responsible for refunding rent once a valid tenancy 
              agreement has been executed, except as stated in the agreement or required by law.
            </p>

            <hr className="my-4" />

            {/* 5 */}
            <h5 className="fw-bold text-dark">5. Refund Request Process</h5>
            <p>To request a refund, you must:</p>
            <ul>
              <li>Submit a refund request through the App or contact customer support</li>
              <li>Provide proof of payment (transaction reference or receipt)</li>
              <li>State the reason for the refund request</li>
            </ul>
            <p>All refund requests are subject to review and verification.</p>

            <hr className="my-4" />

            {/* 6 */}
            <h5 className="fw-bold text-dark">6. Refund Processing Time</h5>
            <ul>
              <li>Approved refunds will be processed within 7–14 business days</li>
              <li>Refunds will be issued to the original payment method used</li>
              <li>Processing times may vary depending on your bank or payment provider</li>
            </ul>

            <hr className="my-4" />

            {/* 7 */}
            <h5 className="fw-bold text-dark">7. Fraud and Abuse Prevention</h5>
            <p>We reserve the right to refuse a refund request where:</p>
            <ul>
              <li>Fraud or abuse is suspected</li>
              <li>The user has violated our Terms of Service</li>
              <li>False or misleading information was provided</li>
            </ul>

            <hr className="my-4" />

            {/* 8 */}
            <h5 className="fw-bold text-dark">8. Changes to This Refund Policy</h5>
            <p>
              We may update this Refund Policy from time to time. Updates will be 
              published in the App with a revised “Last Updated” date.
            </p>
            <p>
              Your continued use of the App constitutes acceptance of the updated policy.
            </p>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RefundPolicy;