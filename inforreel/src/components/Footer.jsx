function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#141414",
        padding: "1.5rem 2rem",
        textAlign: "center",
        fontSize: "0.875rem",
        color: "#777",
        borderTop: "1px solid rgba(51, 51, 51, 0.35)", // ✅ proper border syntax
        marginTop: "0"
      }}
    >
      <p>Help Center | Privacy Policy | Terms of Use</p>
    </footer>
  );
}

export default Footer;
