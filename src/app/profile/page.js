"use client";
import React from "react";

export default function ProfilePage() {
  return (
    <div className="relative">
      <div className="mx-auto mt-10 mb-10 w-full max-w-2xl bg-white p-6 rounded-md shadow ring-1 ring-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center">Profile Settings</h1>
        <p className="mt-1 text-sm text-gray-600 text-center">
          Update your personal information and preferences.
        </p>

        <form className="space-y-6 mt-6">
          {/* Name fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* First name */}
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
                First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Last name */}
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-900">
              Country
            </label>
            <div className="mt-1">
              <select
                id="country"
                name="country"
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 focus:outline-indigo-600 sm:text-sm"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-x-4 pt-2">
            <button type="button" className="text-sm font-semibold text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}