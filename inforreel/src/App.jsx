import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BusinessInfo from "./pages/BusinessInfo";
import BusinessInfoDetails from "./pages/BusinessInfoDetails";
import BusinessInfoDetails1 from "./pages/BusinessInfoDetails1";
import BusinessSignup from "./pages/BusinessSignup";
import Checkout from './pages/Checkout'; // if it's just a component
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import IdentityVerificationIntro from './pages/IdentityVerificationIntro'; // Import the new page
import InfluencerProfileSetup from "./pages/InfluencerProfileSetup";
import InfluencerSignup from "./pages/InfluencerSignup";
import InterestSelection from "./pages/InterestSelection";
import MyCart from "./pages/MyCart"; // ✅ Make sure this line is present
import PolicyPage from "./pages/PolicyPage";
import ResetPassword from "./pages/ResetPassword";
import SignIn from "./pages/SignIn";
import Thankyou from "./pages/Thankyou";
import UserProfileSetup from "./pages/UserProfileSetup";
import UserSignup from "./pages/UserSignup";
import VerifyAccount from "./pages/VerifyAccount";
import Welcome from "./pages/Welcome";





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signup/user" element={<UserSignup />} />
        <Route path="/signup/user/profile" element={<UserProfileSetup />} />
        <Route path="/signup/influencer" element={<InfluencerSignup />} />
        <Route path="/signup/influencer/profile" element={<InfluencerProfileSetup />} />
        <Route path="/signup/business" element={<BusinessSignup />} />
        <Route path="/signup/business/info" element={<BusinessInfo />} />
        <Route path="/verify" element={<VerifyAccount />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup/user/interest" element={<InterestSelection />} />
        <Route path="/interest" element={<InterestSelection />} />
        <Route path="/signup/user/UserProfileSetup" element={<UserProfileSetup />} />
        <Route path="/signup/business/info-details" element={<BusinessInfoDetails/>} />
        <Route path="/signup/business/info-details-1" element={<BusinessInfoDetails1 />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup/verify-intro" element={<IdentityVerificationIntro />} />
        <Route path="/mycart" element={<MyCart />} /> {/* ✅ Route for MyCart */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thankyou" element={<Thankyou />} />






      </Routes>
    </Router>
  );
}

export default App;
