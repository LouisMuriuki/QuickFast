import { Route } from "react-router";
import MainLayout from "./layout/Mainlayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Invoices from "./Pages/invoices/Invoices";
import Estimates from "./Pages/estimates/Estimates";
import Clients from "./Pages/clients/Clients";
import Settings from "./Pages/Settings/Settings";
import Reports from "./Pages/reports/Reports";
import InvoiceGen from "./Pages/invoicegen/InvoiceGen";
import Persistlogin from "./utils/PersistLogin";
import NotFound from "./Pages/NotFound/NotFound";
import Subscription from "./Pages/subscription/Subscription";
import RequirePayment from "./utils/RequirePayment";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Persistlogin />}>
      {/*        <Route element={<RequireAuth />}> */}
      <Route path="/" element={<MainLayout />}>
        <Route path="invoices">
          <Route index element={<Invoices />} />
          <Route
            path="new"
            element={
              <RequirePayment>
                <InvoiceGen />
              </RequirePayment>
            }
          />
        </Route>
        <Route path="estimates">
          <Route index element={<Estimates />} />
          <Route
            path="new"
            element={
              <RequirePayment>
                <InvoiceGen />
              </RequirePayment>
            }
          />
        </Route>
        <Route path="clients" element={<Clients />} />
        <Route
          path="reports"
          element={
            <RequirePayment>
              <Reports />
            </RequirePayment>
          }
        />
        <Route
          path="settings"
          element={
            <RequirePayment>
              <Settings />
            </RequirePayment>
          }
        />
        <Route
          path="*"
          element={
            <RequirePayment>
              <NotFound />
            </RequirePayment>
          }
        />
        <Route path="subscription" element={<Subscription />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
    // <div className="flex w-full h-full bg-gray-100 ">
    //   <InvoiceLayout />
    // </div>
  );
}

export default App;
