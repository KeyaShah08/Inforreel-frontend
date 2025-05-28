import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="header-custom">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 700 }}>InforReel</h1>
        </Link>

        <Link to="/signin">
          <button
            style={{
              backgroundColor: "#96105E",
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
              padding: "10px 28px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Sign in
          </button>
        </Link>
      </header>

      <style>{`
        .header-custom {
          background-color: rgba(20, 20, 20, 0.65);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(51, 51, 51, 0.35);
          color: white;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 11vh;
          box-sizing: border-box;
          z-index: 666;
          padding: 0 2rem;
        }

        @media (max-width: 768px) {
          .header-custom {
            height: 9vh;
          }

          .header-custom h1 {
            font-size: 1.2rem !important;
          }
        }

        @media (max-width: 480px) {
          .header-custom {
            height: 8vh;
            flex-direction: column;
            align-items: flex-start;
          }

          .header-custom h1 {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </>
  );
}

export default Header;
