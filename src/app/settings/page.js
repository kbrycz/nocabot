"use client";
import React, { useState } from "react";
import { Switch } from "@headlessui/react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const userPlan = "Pro Plan (Free) - just as example";
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleSave = (e) => {
    e.preventDefault();
    alert("Settings saved (not implemented).");
  };

  return (
    <div className="relative">
      <div className="mx-auto mt-10 mb-10 w-full max-w-2xl bg-white p-6 rounded-md shadow ring-1 ring-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center">Settings</h1>
        <p className="mt-1 text-sm text-gray-600 text-center">
          Manage your preferences, plan, and payment information.
        </p>

        <form onSubmit={handleSave} className="space-y-8 mt-6">
          {/* Theme Toggle */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-base font-semibold text-gray-900">Appearance</h2>
            <p className="mt-1 text-sm text-gray-600">Toggle between light or dark mode.</p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {darkMode ? "Dark Mode" : "Light Mode"}
              </span>
              <Switch
                checked={darkMode}
                onChange={setDarkMode}
                className={classNames(
                  darkMode ? "bg-indigo-600" : "bg-gray-200",
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    darkMode ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
          </div>

          {/* Plan info */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-base font-semibold text-gray-900">Your Plan</h2>
            <p className="mt-1 text-sm text-gray-600">
              Manage your subscription or update your plan here.
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">{userPlan}</p>
                <p className="text-xs text-gray-500">Renews monthly</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => alert("Upgrading plan...")}
                  className="rounded-md bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow hover:bg-indigo-500"
                >
                  Upgrade
                </button>
                <button
                  type="button"
                  onClick={() => alert("Cancel plan...")}
                  className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-semibold text-gray-700 shadow hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h2 className="text-base font-semibold text-gray-900">Payment Information</h2>
            <p className="mt-1 text-sm text-gray-600">
              Update your card details to keep your account active.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="card-number" className="block text-sm font-medium text-gray-900">
                  Card number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="card-number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 focus:outline-indigo-600 sm:text-sm"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="exp-date" className="block text-sm font-medium text-gray-900">
                    Expiration date
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="exp-date"
                      value={expDate}
                      onChange={(e) => setExpDate(e.target.value)}
                      className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 focus:outline-indigo-600 sm:text-sm"
                      placeholder="MM/YY"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-900">
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="cvc"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 focus:outline-indigo-600 sm:text-sm"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="billing-address" className="block text-sm font-medium text-gray-900">
                  Billing address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="billing-address"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 focus:outline-indigo-600 sm:text-sm"
                    placeholder="123 Main St, City, State"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => alert("Payment info updated...")}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
              >
                Update Payment Info
              </button>
            </div>
          </div>

          {/* Bottom Save Button */}
          <div className="flex items-center justify-end gap-x-4 pt-2">
            <button
              type="button"
              className="text-sm font-semibold text-gray-900"
              onClick={() => alert("Changes canceled")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}