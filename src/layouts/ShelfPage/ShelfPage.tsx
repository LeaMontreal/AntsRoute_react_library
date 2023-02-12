export const ShelfPage = () => {
  return (
    <div className="container">
      <div className="mt-3">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="nav-loans-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-loans"
              type="button"
              role="tab"
              aria-controls="nav-loans"
              aria-selected="true"
            >
              Loans
            </button>
            <button
              className="nav-link"
              id="nav-history-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-history"
              type="button"
              role="tab"
              aria-controls="nav-history"
              aria-selected="false"
            >
              Your History
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};
