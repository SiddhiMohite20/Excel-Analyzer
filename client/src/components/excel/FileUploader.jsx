import { UploadCloud } from "lucide-react";

function FileUploader({
  file,
  handleFileChange,
  handleUpload,
  loading,
}) {
  return (
    <div className="border-2 border-dashed border-blue-400 rounded-2xl p-16 bg-white text-center shadow-md">

      <UploadCloud
        size={70}
        className="mx-auto text-blue-500"
      />

      <h2 className="text-2xl font-semibold mt-6">
        Drag & Drop Excel File
      </h2>

      <p className="text-gray-500 mt-3">
        or click below to browse
      </p>

      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        id="excelFile"
        className="hidden"
        onChange={handleFileChange}
      />

      <label
        htmlFor="excelFile"
        className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-blue-700 transition"
      >
        Choose File
      </label>

      {file && (
        <p className="mt-5 text-lg font-medium">
          Selected File:
          <span className="text-blue-600 font-semibold">
            {" "}
            {file.name}
          </span>
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`mt-6 ml-4 px-6 py-3 rounded-xl text-white font-semibold transition duration-300 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? (
          <div className="flex items-center gap-2 justify-center">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>

              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>

            Uploading...
          </div>
        ) : (
          "Upload File"
        )}
      </button>

    </div>
  );
}

export default FileUploader;