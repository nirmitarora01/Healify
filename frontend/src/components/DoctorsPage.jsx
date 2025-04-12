import AdminSideBar from "./AdminSideBar";

const DoctorsPage = () => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <AdminSideBar />

    <div style={{ flex: 1, padding: "20px" }}>
      <h1>Fetch the Doctor's List</h1>
      {/* You can place your form here */}
    </div>
  </div>
);

export default DoctorsPage;
