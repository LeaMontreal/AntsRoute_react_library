import { useOktaAuth } from "@okta/okta-react"; // manually change
import { useState } from "react";

export const ManageLibraryPage = () => {
  const { authState } = useOktaAuth();

  // Every time user click the 2nd/3rd tab, Force the tab content refresh
  const [changeQuantityOfBooksClick, setChangeQuantityOfBooksClick] =
    useState(false);
  const [messagesClick, setMessagesClick] = useState(false);

  return (
    <div className="container">
      <div className="mt-5">
        <h3>Manage Library</h3>
        {/* tab buttons */}
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="nav-add-book-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-add-book"
              type="button"
              role="tab"
              aria-controls="nav-add-book"
              aria-selected="false"
            >
              Add new book
            </button>
            <button
              className="nav-link"
              id="nav-quantity-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-quantity"
              type="button"
              role="tab"
              aria-controls="nav-quantity"
              aria-selected="true"
            >
              Change quantity
            </button>
            <button
              className="nav-link"
              id="nav-messages-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-messages"
              type="button"
              role="tab"
              aria-controls="nav-messages"
              aria-selected="false"
            >
              Messages
            </button>
          </div>
        </nav>
        {/* tab content */}
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-add-book"
            role="tabpanel"
            aria-labelledby="nav-add-book-tab"
          >
            Add A New Book
          </div>
          <div
            className="tab-pane fade"
            id="nav-quantity"
            role="tabpanel"
            aria-labelledby="nav-quantity-tab"
          >
            {changeQuantityOfBooksClick ? (
              <p>Change Quantity Of Books</p>
            ) : (
              <></>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="nav-messages"
            role="tabpanel"
            aria-labelledby="nav-messages-tab"
          >
            {messagesClick ? <p>Admin Messages</p> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};