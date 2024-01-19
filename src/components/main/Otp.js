import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    phone: "",
  });

  const [verify, setVerify] = useState({
    phone: "",
    otp: "",
  });

  let res;

  const [click, setClick] = useState(true);
  const [phoneError, setPhoneError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const OTPP = async (event) => {
    event.preventDefault();
    if (/^\d{10}$/.test(data.phone)) {
      setPhoneError("");
    } else {
      setPhoneError("Phone number must be exactly 10 digits.");
      return;
    }
    await axios.post("http://localhost:5000/user/otp", data).then(() => {
      console.log(data);
    });
    setVerify({ ...verify, phone: data.phone });
    setClick(false);
  };

  const ver = async (event) => {
    event.preventDefault();
    try {
      res = await axios.post("http://localhost:5000/user/verify", verify);
      if (res.status === 200) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("phone", data.phone);
        navigate("/signup");
      }
    } catch (e) {}

    await axios.post("http://localhost:5000/user/verify", verify).then(() => {
      console.log(verify);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="bg-white p-8 rounded shadow-md">
        <label className="block mb-2 text-sm font-bold">Number:</label>
        <input
          type="text"
          className="border-2 p-2 mb-4 w-full"
          value={data.phone}
          onChange={(event) => {
            setData({ ...data, phone: event.target.value });
          }}
        />
        <div style={{ color: "red" }}>{phoneError}</div>
        {click ? (
          <div></div>
        ) : (
          <div>
            <label className="block mb-2 text-sm font-bold">Otp:</label>
            <input
              type="text"
              className="border-2 p-2 mb-4 w-full"
              value={verify.otp}
              onChange={(event) => {
                setVerify({ ...verify, otp: event.target.value });
              }}
            />
            <button
              className="border-2 p-2 mb-4"
              onClick={ver}
            >
              Verify OTP
            </button>
          </div>
        )}
        {click ? (
          <div>
            <button className="border-2 p-2" onClick={OTPP}>
              Send OTP
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </form>
    </div>
  );
};

export default Otp;
