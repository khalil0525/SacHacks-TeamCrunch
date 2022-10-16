import { Route, Routes } from "react-router-dom";
import UserInformation from "./pages/UserInformation";
import Landing from "./pages/Landing";
import ReceiptUpload from "./pages/ReceiptUpload";
import axios from "axios";
import VisionBoard from "./pages/VisionBoard";
import BankInformation from "./pages/BankInformation";

const ClientRouter = () => {
  const getTransactions = async (startDate, endDate) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/transactions?aggregate=true&${startDate}=%222022-10-01%22&${endDate}=%222022-10-15`
    );
    return data;
  };

  return (
    // <SocketContext.Provider value={socket}>
    <Routes>
      {/* <Route path="/" element={<Landing />} /> */}
      <Route path="/" element={<UserInformation />} />
      <Route path="/vision" element={<VisionBoard />} />
      <Route path="/bank-information" element={<BankInformation />} />
      <Route
        path="/user"
        element={<UserInformation getTransactions={getTransactions} />}
      />
      <Route path="/receipt-upload" element={<ReceiptUpload />} />
    </Routes>
    //   </SocketContext.Provider>
  );
};

export default ClientRouter;
