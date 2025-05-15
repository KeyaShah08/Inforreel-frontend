import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      style={{
        backgroundColor: "#141414",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "none",
        marginBottom: "0",
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 700 }}>InforReel</h1>
      </Link>

      {/* 👇 Wrap button in Link */}
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
  );
}

export default Header;
