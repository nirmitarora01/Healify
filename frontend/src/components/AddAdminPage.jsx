import AdminSideBar from "./AdminSideBar";

const AddAdminPage = () => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <AdminSideBar />

    <div style={{ flex: 1, padding: "20px" }}>
      <h1>Add a new Admin</h1>
      {/* You can place your form here */}
    </div>
  </div>
);

export default AddAdminPage;
