import { Route, Routes } from "react-router-dom";
import UserInformation from "./pages/UserInformation";
import Landing from "./pages/Landing";
import ReceiptUpload from "./pages/ReceiptUpload";

import VisionBoard from "./pages/VisionBoard";
import BankInformation from "./pages/BankInformation";

const ClientRouter = () => {
  return (
    // <SocketContext.Provider value={socket}>
    <Routes>
      {/* <Route path="/" element={<Landing />} /> */}
      <Route path="/" element={<UserInformation />} />
      <Route path="/vision" element={<VisionBoard />} />
      <Route path="/bank-information" element={<BankInformation />} />
      <Route path="/user" element={<UserInformation />} />
      <Route path="/receipt-upload" element={<ReceiptUpload />} />
    </Routes>
    //   </SocketContext.Provider>
  );
};

export default ClientRouter;
