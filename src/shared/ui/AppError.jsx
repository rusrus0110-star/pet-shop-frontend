function AppError({ message = "Something went wrong" }) {
  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid #ffccc7",
        backgroundColor: "#fff2f0",
        color: "#cf1322",
        borderRadius: "12px",
      }}
    >
      {message}
    </div>
  );
}

export default AppError;
