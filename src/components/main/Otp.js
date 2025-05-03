import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import OtpInput from 'react-otp-input'

const Otp = () => {

  const navigate = useNavigate()
    const baseUrl = "http://localhost:5000/"

    const [otp, setOtp] = useState()
    const [data, setData] = useState({ phone: '' })
    const [verify, setVerify] = useState({ phone: "", otp: "" })
    const [click, setClick] = useState(true)

    let res

    const OTPP = async (event) => {
        event.preventDefault();

        await axios.post("http://localhost:5000/user/otp", data).then(() => {
          console.log(data);
        });
        sessionStorage.setItem("phone", data.phone);
        setVerify({ ...verify, phone: data.phone });
        setClick(false);

    };

    const ver = async (event) => {
        event.preventDefault();
        console.log(verify);


        try {
          res = await axios.post("http://localhost:5000/user/verify", verify);
              if (res.status === 200) {
                sessionStorage.setItem("token", res.data.token);
                navigate("/signup");
              }
        } catch (e) {
            // Handle error
        }
    };
  // const navigate = useNavigate();
  // const [data, setData] = useState({
  //   phone: "",
  // });

  // const [verify, setVerify] = useState({
  //   phone: "",
  //   otp: "",

  // });

  // let res;

  // const [click, setClick] = useState(true);
  // const [phoneError, setPhoneError] = useState("");


  // const OTPP = async (event) => {
  //   event.preventDefault();
    
  //   if (/^\d{10}$/.test(data.phone)) {
  //     setPhoneError("");
  //   } else {
  //     setPhoneError("Phone number must be exactly 10 digits.");
  //     return;
  //   }
  //   await axios.post("http://localhost:5000/user/otp", data).then(() => {
  //     console.log(data);
  //   });
  //   setVerify({ ...verify, phone: data.phone });
  //   setClick(false);
  // };

  // const ver = async (event) => {
  //   event.preventDefault();
  //   try {
  //     res = await axios.post("http://localhost:5000/user/verify", verify);
  //     if (res.status === 200) {
  //       sessionStorage.setItem("token", res.data.token);
  //       sessionStorage.setItem("phone", data.phone);
  //       navigate("/signup");
  //     }
  //   } catch (e) {}

  //   await axios.post("http://localhost:5000/user/verify", verify).then(() => {
  //     console.log(verify);
  //   });
  // };

  return (
    // <div className="flex items-center justify-center min-h-screen">
    //   <form className="bg-white p-8 rounded shadow-md">
    //     <label className="block mb-2 text-sm font-bold">Number:</label>
    //     <input
    //       type="text"
    //       className="border-2 p-2 mb-4 w-full"
    //       value={data.phone}
    //       onChange={(event) => {
    //         setData({ ...data, phone: event.target.value });
    //       }}
    //     />
    //     <div style={{ color: "red" }}>{phoneError}</div>
    //     {click ? (
    //       <div></div>
    //     ) : (
    //       <div>
    //         <label className="block mb-2 text-sm font-bold">Otp:</label>
    //         <input
    //           type="text"
    //           className="border-2 p-2 mb-4 w-full"
    //           value={verify.otp}
    //           onChange={(event) => {
    //             setVerify({ ...verify, otp: event.target.value });
    //           }}
    //         />
    //         <button
    //           className="border-2 p-2 mb-4"
    //           onClick={ver}
    //         >
    //           Verify OTP
    //         </button>
    //       </div>
    //     )}
    //     {click ? (
    //       <div>
    //         <button className="border-2 p-2" onClick={OTPP}>
    //           Send OTP
    //         </button>
    //       </div>
    //     ) : (
    //       <div></div>
    //     )}
    //   </form>
    // </div>
    <>
      <div className="flex items-center justify-center content-center p-3 h-screen w-screen bg-veryLightBlue">
            <div className="p-10 h-auto p-8 mx-auto my-auto rounded-md shadow-lg bg-darkBlue">
                <form className="space-y-4">
                    {click ? (
                        <div>
                            <div className="text-2xl font-bold mb-4">OTP Verification</div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Enter your Phone Number</label>
                                <PhoneInput
                                    defaultCountry={"IN"}
                                    className="w-full p-4 rounded-md focus:outline-none focus:border-polyblue PhoneInputInternationalIconGlobe"
                                    defaultValue={sessionStorage.getItem("num")}
                                    value={data.phone}
                                    onChange={(val) => setData({ phone: val })}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="mb-4">
                            <div className="text-2xl font-bold mb-4">Please enter your otp</div>
                            <div>
                                <OtpInput
                                    className="border-2 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                                    value={verify.otp}
                                    onChange={(val) => setVerify({ ...verify, otp: val })}
                                    numInputs={4}
                                    isInputNum={true}
                                    shouldAutoFocus={true}
                                    inputStyle={{
                                        border: "1px solid transparent",
                                        borderRadius: "8px",
                                        width: "54px",
                                        height: "54px",
                                        fontSize: "12px",
                                        color: "#000",
                                        fontWeight: "400",
                                        caretColor: "blue"
                                    }}
                                    focusStyle={{
                                        border: "1px solid #CFD3DB",
                                        outline: "none"
                                    }}
                                    renderSeparator={<span className="w-0.5"></span>}
                                    renderInput={(props) => <input {...props} />}
                                />
                            </div>
                        </div>
                    )}
                    <div className="mb-4 w-full justify-center items-center content-center flex">
                        <button
                            className="otp-button hover:scale-105 transition-transform duration-300"
                            onClick={click ? OTPP : ver}
                        >
                            {click ? "Send OTP" : "Verify OTP"}
                        </button>
                    </div>
                    <div className={"flex flex-col h-full w-full"}>
                        <p>Otp not received? <button className={"italic hover:-hue-rotate-60"}>resend</button></p>
                    </div>
                </form>
            </div>
        </div>
    </>
  );
};

export default Otp;
