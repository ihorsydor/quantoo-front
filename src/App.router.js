import React from "react";
import { Routes, Route } from "react-router-dom";

import FormAdd from "./views/form";
import FormListComponent from "./views/form-list";
import AuthorAdd from "./views/author";
import AuthorListComponent from "./views/author-list";
import AuthorSearchComponent from "./views/author-search";
import AuthorSearchBackendComponent from "./views/author-search-backend";
import BookAdd from "./views/book";
import BookListComponent from "./views/book-list";
import FrontendComponent from "./views/frontend";
import MainComponent from "./views/main";
const Router = () => {
  return (
    <Routes>
        <Route path="/form" element={<FormAdd />} />
        <Route path="/form-list" element={<FormListComponent />} />
        <Route path="/author" element={<AuthorAdd />} />
        <Route path="/author-list" element={<AuthorListComponent />} />
        <Route path="/author-search" element={<AuthorSearchComponent />} />
        <Route path="/book" element={<BookAdd />} />
        <Route path="/book-list" element={<BookListComponent />} />
        <Route path="/author-search-backend" element={<AuthorSearchBackendComponent />} />
        <Route path="/frontend" element={<FrontendComponent />} />
        <Route path="/" element={<MainComponent />} />
    </Routes>
  );
};
export default Router