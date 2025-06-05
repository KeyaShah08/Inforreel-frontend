import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const buttonStyle = {
    backgroundColor: "#96105E",
    color: "white",
    fontWeight: 600,
    padding: "12px 24px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    width: "100%",
    maxWidth: "250px",
    display: "block",
    margin: "2rem auto 0 auto",
    transition: 'opacity 0.3s ease',
};

const linkTextStyle = {
    fontSize: "0.8rem",
    color: "#ccc",
    marginTop: "1rem",
    textAlign: "center",
    display: "block",
};

const errorTextStyle = {
    color: "#ff4d4d",
    fontSize: "0.9rem",
    textAlign: "center",
    marginTop: "1rem",
};

export default function IdentityVerificationIntro() {
    const [params] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const urlSessionId = params.get("session_id");
    const [sessionId, setSessionId] = useState(urlSessionId || sessionStorage.getItem("verificationSessionId") || localStorage.getItem("stripe_session_id"));

    useEffect(() => {
        const sessionAlreadyHandled = sessionStorage.getItem("session_verified");

        if (sessionId && !sessionAlreadyHandled) {
            const runFlow = async () => {
                try {
                    const response = await fetch(`http://54.173.98.4:8000/identity-complete?session_id=${sessionId}`);
                    const data = await response.json();

                    if (data.redirectUrl) {
                        sessionStorage.setItem("session_verified", "true");
                        window.location.href = data.redirectUrl;
                    } else {
                        setError("Invalid server response.");
                    }
                } catch (err) {
                    setError("Error verifying identity.");
                }
            };

            runFlow();
        }
    }, [sessionId]);

    const handleLetsVerifyClick = async () => {
        setError(null);
        setIsLoading(true);
        sessionStorage.removeItem("session_verified");

        const apiEndpoint = "http://54.173.98.4:8000/create-session";
        const payload = {
            userId: "681a48835298885fffe60f5b",
            name: "Vendor",
            email: "maanasakakumani@gmail.com",
            username: "ManasaKakumani",
            userType: "vendor",
            return_url: window.location.origin + '/signup/verify-intro',
        };

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || JSON.stringify(errorData);
                setError(errorMessage);
                return;
            }

            const result = await response.json();
            const sessionId = result.data?.sessionId;
            const redirectUrl = result.data?.redirectUrl;

            if (sessionId && redirectUrl) {
                localStorage.setItem("stripe_session_id", sessionId);
                sessionStorage.setItem("verificationSessionId", sessionId);
                window.location.href = `${redirectUrl}?session_id=${sessionId}`;
            } else {
                setError("Missing session ID or redirect URL.");
            }
        } catch (err) {
            setError(`Network error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "'Source Sans Pro', sans-serif", backgroundColor: "#141414", color: "#fff" }}>
            <Header />
            <main style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start",padding: "3rem 1rem",
marginTop: "2rem",
 }}>
                <div style={{ textAlign: "center", maxWidth: "600px", width: "100%" }}>
                    <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>Identity Verification</h1>
                    <p style={{ fontSize: "1.2rem", color: "#ccc", marginBottom: "2rem" }}>
                        Click "Verify Identity" to be redirected to a secure page to complete your identity verification process. This step is required for your account.
                    </p>
                    {isLoading && <p style={{ color: '#ddd', fontSize: '0.9rem' }}>Creating verification session...</p>}
                    {error && <p style={errorTextStyle}>{error}</p>}
                    <button
                        style={{
                            ...buttonStyle,
                            opacity: isLoading || error ? 0.6 : 1,
                            cursor: isLoading ? 'wait' : (error ? 'not-allowed' : 'pointer'),
                        }}
                        onClick={!isLoading && !error ? handleLetsVerifyClick : undefined}
                        disabled={isLoading || !!error}
                    >
                        {isLoading ? 'Redirecting...' : 'Verify Identity'}
                    </button>
                    <p style={linkTextStyle}>
                        <span style={{ marginRight: "5px" }}>ⓘ</span> How identity verification works
                    </p>

                </div>
            </main>
            <Footer />
        </div>
    );
}