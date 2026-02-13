import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const TermsOfService = () => {
  return (
    <>
    <Navbar />
    <div className="container py-5 my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">

          <h1 className="fw-bold text-center mb-3">Terms of Service</h1>

          <div className="text-muted mb-4">            
            <div><strong>Last Updated:</strong> February 8, 2026</div>
          </div>

          <p>
            These Terms of Service (“Terms”) govern your access to and use of the 
            Chuks and Vin Real Estate Management mobile application (“App”) 
            and related services provided by <strong>Chuks and Vin Real Estate Management</strong> 
            (“Chuks and Vin”, “we”, “our”, or “us”).
          </p>

          <p>
            By downloading, accessing, or using this App, you agree to be bound by these Terms. 
            If you do not agree, please do not use the App.
          </p>

          <hr className="my-4" />

          {/* 1 */}
          <h4 className="fw-bold">1. Eligibility</h4>
          <p>
            You must be at least 18 years old and legally capable of entering into a 
            binding contract under Nigerian law to use this App for property transactions.
          </p>

          <hr className="my-4" />

          {/* 2 */}
          <h4 className="fw-bold">2. User Accounts</h4>
          <ul>
            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
            <li>You agree to provide accurate, current, and complete information during registration.</li>
            <li>You are responsible for all activities that occur under your account.</li>
          </ul>
          <p>
            We reserve the right to suspend or terminate any account that provides 
            false information or violates these Terms.
          </p>

          <hr className="my-4" />

          {/* 3 */}
          <h4 className="fw-bold">3. Services Provided</h4>
          <p>The App enables users to:</p>
          <ul>
            <li>View and search property listings in Lagos, Abuja, and Ogbomoso</li>
            <li>Request inspections and initiate tenancy agreements</li>
            <li>Make payments related to rent, agency fees, or approved charges</li>
            <li>Receive notifications related to property management and maintenance</li>
          </ul>
          <p>
            Chuks and Vin acts as an intermediary between landlords and tenants 
            and does not guarantee property availability at all times.
          </p>

          <hr className="my-4" />

          {/* 4 */}
          <h4 className="fw-bold">4. Property Listings and Accuracy</h4>
          <p>
            We strive to ensure that all property listings are accurate and up to date. 
            However, availability, pricing, and property details may change without notice.
          </p>
          <p>
            Users must not upload false, misleading, or fraudulent property information.
          </p>
          <p>
            We reserve the right to remove any listing that violates our policies or Nigerian law.
          </p>

          <hr className="my-4" />

          {/* 5 */}
          <h4 className="fw-bold">5. Payments and Refunds</h4>
          <ul>
            <li>All payments are subject to the relevant Tenancy Agreement or service contract.</li>
            <li>Payments are processed by third-party providers (e.g., Paystack or Flutterwave).</li>
            <li>Refunds (where applicable) are processed within 7–14 business days.</li>
          </ul>

          <hr className="my-4" />

          {/* 6 */}
          <h4 className="fw-bold">6. Prohibited Conduct</h4>
          <p>You agree not to:</p>
          <ul>
            <li>Use the App for unlawful purposes</li>
            <li>Post or transmit false or misleading information</li>
            <li>Harass, abuse, or threaten landlords, tenants, or staff</li>
            <li>Scrape or reuse data for competing platforms</li>
            <li>Bypass security features or reverse-engineer the App</li>
            <li>Introduce viruses, malware, or harmful code</li>
          </ul>

          <hr className="my-4" />

          {/* 7 */}
          <h4 className="fw-bold">7. Intellectual Property</h4>
          <p>
            All content within the App, including logos, text, images, designs, 
            and software, is the property of Chuks and Vin or its licensors 
            and is protected by applicable copyright and trademark laws.
          </p>
          <p>
            You may not copy, reproduce, or distribute any content 
            without prior written permission.
          </p>

          <hr className="my-4" />

          {/* 8 */}
          <h4 className="fw-bold">8. Suspension and Termination</h4>
          <p>We may suspend or terminate your access if:</p>
          <ul>
            <li>You breach these Terms</li>
            <li>You engage in fraudulent or illegal activity</li>
            <li>Required by law or regulatory authorities</li>
          </ul>
          <p>
            Termination does not affect obligations arising before termination.
          </p>

          <hr className="my-4" />

          {/* 9 */}
          <h4 className="fw-bold">9. Disclaimer of Warranties</h4>
          <p>
            The App and services are provided on an “as is” and “as available” basis. 
            We make no warranties regarding:
          </p>
          <ul>
            <li>Continuous or uninterrupted access</li>
            <li>Accuracy of property listings</li>
            <li>Suitability of properties for your intended use</li>
          </ul>

          <hr className="my-4" />

          {/* 10 */}
          <h4 className="fw-bold">10. Limitation of Liability</h4>
          <p>
            To the maximum extent permitted by Nigerian law, Chuks and Vin 
            shall not be liable for:
          </p>
          <ul>
            <li>Indirect, incidental, or consequential damages</li>
            <li>Loss of profits or business opportunities</li>
            <li>Disputes between landlords and tenants</li>
          </ul>
          <p>
            Our total liability shall not exceed the amount paid by you (if any) 
            for the service giving rise to the claim.
          </p>

          <hr className="my-4" />

          {/* 11 */}
          <h4 className="fw-bold">11. Indemnification</h4>
          <p>
            You agree to indemnify and hold harmless Chuks and Vin from any claims, 
            losses, damages, or expenses arising from:
          </p>
          <ul>
            <li>Your misuse of the App</li>
            <li>Your violation of these Terms</li>
            <li>Your breach of any law or third-party rights</li>
          </ul>

          <hr className="my-4" />

          {/* 12 */}
          <h4 className="fw-bold">12. Governing Law and Jurisdiction</h4>
          <p>
            These Terms are governed by the laws of the Federal Republic of Nigeria. 
            Any disputes shall be subject to the exclusive jurisdiction of Nigerian courts.
          </p>

          <hr className="my-4" />

          {/* 13 */}
          <h4 className="fw-bold">13. Changes to These Terms</h4>
          <p>
            We may update these Terms periodically. Updated versions will be 
            published in the App with a revised “Last Updated” date.
          </p>
          <p>
            Continued use of the App constitutes acceptance of the updated Terms.
          </p>

          <hr className="my-4" />

          {/* 14 */}
          <h4 className="fw-bold">14. Contact Information</h4>
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

export default TermsOfService;