function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#000",
        padding: "1.5rem 2rem",
        textAlign: "center",
        fontSize: "0.875rem",
        color: "#777",
        borderTop: "none",   // ✅ remove white line
        marginTop: "0",      // ✅ remove top gap
      }}
    >
      <p>Help Center | Privacy Policy | Terms of Use</p>
    </footer>
  );
}

export default Footer;
