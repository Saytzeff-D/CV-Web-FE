import React, { useState } from "react";
import Step1 from "../../components/create-admin/Step1";
import Step2 from "../../components/create-admin/Step2";
import Step3 from "../../components/create-admin/Step3";

const CreateAdmin = () => {  
  const [step, setStep] = useState(1);

  return (
    <>
        {
          step == 1
          ?
          <Step1 setStep={setStep} />
          :
          step == 2
          ?
          <Step2 setStep={setStep} />
          :
          <Step3 setStep={setStep} />
        }
    </>
  );
}

export default CreateAdmin;