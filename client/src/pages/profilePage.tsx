import "../styles/profilePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="profile-wrapper">
        <div className="profile-container">
          <div className="profile-header">
            <h2>My Profile</h2>
          </div>
          <div className="profile-body">
            <h3 className="profile-opt">My lists</h3>
            <h3 className="profile-opt">Customization</h3>
          </div>
        </div>
      </div>
      <div className="content-container">
        {/* <div className="box">
          <div className="box-header">
            <h1 className="header-text">Big Cities</h1>
          </div>
          <div className="box-body">
            <h3>Tokyo, Japan</h3>
            <h3>New York City, New York</h3>
            <h3>Los Angeles, California</h3>
          </div>
        </div> */}
        <button
          type="button"
          className="add-list"
          data-bs-toggle="modal"
          data-bs-target="#addListModal"
        >
          +
        </button>
      </div>

      <div
        className="modal fade"
        id="addListModal"
        tabIndex={-1}
        aria-labelledby="addListModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addListModalLabel">
                Add List
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="listName" className="form-label">List Name</label>
                  <input type="text" className="form-control" name="listName" placeholder="Enter list name" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn submit-list btn-primary">
                Create list
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
