import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "CV Properties - Privacy Policy";
  }, []);
  return (
    <>
    <Navbar />
    <div className="container py-5 my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">

          <h1 className="fw-bold mb-4 text-center">Privacy Policy</h1>

          <p className="text-muted">
            <strong>Last Updated:</strong> {new Date('2026-02-08').toLocaleDateString()}
          </p>

          <p>
            <strong>Chuks and Vin Real Estate Management</strong> (“Chuks and Vin”, “we”, “our”, or “us”) is committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application (“App”) and related services.
          </p>

          <p>
            This policy is prepared in accordance with the Nigeria Data Protection Act (NDPA) 2023, 
            the Nigeria Data Protection Regulation (NDPR), and Google Play Developer Policies.
          </p>

          <p>
            By using our App, you consent to the practices described in this Privacy Policy.
          </p>

          <hr className="my-4" />

          {/* Section 1 */}
          <h4 className="fw-bold">1. Information We Collect</h4>

          <h6 className="mt-3 fw-semibold">a. Personal Information</h6>
          <ul>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Residential or mailing address</li>
          </ul>

          <h6 className="mt-3 fw-semibold">b. Identity Verification (KYC)</h6>
          <ul>
            <li>National Identification Number (NIN)</li>
            <li>Driver’s License or other valid government-issued ID</li>
          </ul>

          <h6 className="mt-3 fw-semibold">c. Location Information</h6>
          <ul>
            <li>Approximate or precise GPS location</li>
          </ul>

          <h6 className="mt-3 fw-semibold">d. Financial Information</h6>
          <ul>
            <li>Payment history and transaction references</li>
            <li>
              Billing details processed securely by third-party payment processors 
              (e.g., Paystack or Flutterwave). We do not store full card details.
            </li>
          </ul>

          <h6 className="mt-3 fw-semibold">e. Device and Usage Information</h6>
          <ul>
            <li>IP address</li>
            <li>Device type and operating system</li>
            <li>App usage data and log files</li>
          </ul>

          <hr className="my-4" />

          {/* Section 2 */}
          <h4 className="fw-bold">2. Legal Basis for Processing</h4>
          <ul>
            <li>Consent</li>
            <li>Contractual necessity</li>
            <li>Legitimate interest</li>
            <li>Legal obligation</li>
          </ul>

          <hr className="my-4" />

          {/* Section 3 */}
          <h4 className="fw-bold">3. How We Use Your Information</h4>
          <ul>
            <li>Create and manage your account</li>
            <li>Display relevant property listings</li>
            <li>Facilitate inspections and tenancy agreements</li>
            <li>Send rent and maintenance notifications</li>
            <li>Prevent fraud</li>
            <li>Improve app performance</li>
            <li>Comply with legal obligations</li>
          </ul>

          <hr className="my-4" />

          {/* Section 4 */}
          <h4 className="fw-bold">4. Data Sharing and Disclosure</h4>
          <p>We do not sell or rent your personal data.</p>
          <ul>
            <li>Professional partners (lawyers, surveyors)</li>
            <li>Cloud hosting providers and analytics services</li>
            <li>Payment processors</li>
            <li>Law enforcement authorities (where required by law)</li>
          </ul>

          <hr className="my-4" />

          {/* Section 5 */}
          <h4 className="fw-bold">5. Data Retention</h4>
          <p>
            We retain personal data only as long as necessary to fulfil the purposes stated 
            in this policy and comply with legal requirements (typically up to six (6) years for financial records).
          </p>

          <hr className="my-4" />

          {/* Section 6 */}
          <h4 className="fw-bold">6. Your Data Protection Rights</h4>
          <ul>
            <li>Access your personal data</li>
            <li>Request correction</li>
            <li>Request deletion</li>
            <li>Withdraw consent</li>
            <li>Object to processing</li>
            <li>Request data portability</li>
          </ul>

          <p>
            You may request deletion through <strong>Settings &gt; Delete Account</strong> 
            in the App or by contacting us directly. Requests will be processed within 30 days.
          </p>

          <hr className="my-4" />

          {/* Section 7 */}
          <h4 className="fw-bold">7. Security Measures</h4>
          <ul>
            <li>Encryption using TLS protocols</li>
            <li>Secure servers with restricted access</li>
            <li>Regular monitoring and updates</li>
          </ul>
          <p>
            While we strive to protect your data, no system can be guaranteed 100% secure.
          </p>

          <hr className="my-4" />

          {/* Section 8 */}
          <h4 className="fw-bold">8. Children’s Privacy</h4>
          <p>
            Our services are not intended for individuals under the age of 18.
          </p>

          <hr className="my-4" />

          {/* Section 9 */}
          <h4 className="fw-bold">9. International Data Transfers</h4>
          <p>
            Your information may be stored or processed outside Nigeria. 
            Appropriate safeguards are implemented in line with NDPA requirements.
          </p>

          <hr className="my-4" />

          {/* Section 10 */}
          <h4 className="fw-bold">10. Changes to This Privacy Policy</h4>
          <p>
            We may update this Privacy Policy periodically. Continued use of the App 
            after changes indicates acceptance of the updated policy.
          </p>

          <hr className="my-4" />

          {/* Section 11 */}
          <h4 className="fw-bold">11. Contact Information</h4>
          <p>
            <strong>Chuks and Vin Real Estate Management</strong><br />
            Lagos, Abuja & Ogbomoso<br />
            Email: candvproperty@gmail.com<br />
            Phone: +2348114590077
          </p>

        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default PrivacyPolicy;