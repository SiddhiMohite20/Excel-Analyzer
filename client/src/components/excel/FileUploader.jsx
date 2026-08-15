import { UploadCloud, FileSpreadsheet } from "lucide-react";

function FileUploader({
  file,
  handleFileChange,
  handleUpload,
  loading,
}) {
  return (
    <div className="rounded-xl border border-dashed border-violet-500/30 bg-[#111113] px-5 py-8 text-center transition-all duration-300 hover:border-violet-500/50 hover:bg-violet-500/[0.02] md:px-8 md:py-10">

      {/* Upload Icon */}
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
        <UploadCloud
          size={28}
          strokeWidth={1.7}
        />
      </div>

      {/* Heading */}
      <h2 className="mt-5 text-lg font-semibold tracking-tight text-zinc-100 md:text-xl">
        Upload your Excel file
      </h2>

      {/* Description */}
      <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-zinc-500 md:text-sm">
        Drag and drop your spreadsheet here, or choose a file from your device.
      </p>

      <p className="mt-1 text-[11px] text-zinc-600">
        Supported formats: .xlsx, .xls, .csv
      </p>

      {/* Hidden Input */}
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        id="excelFile"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">

        {/* Choose File */}
        <label
          htmlFor="excelFile"
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-violet-500/30 bg-violet-500/10 px-4 py-2.5 text-sm font-medium text-violet-300 transition-all duration-200 hover:border-violet-500/50 hover:bg-violet-500/20"
        >
          <FileSpreadsheet size={17} />
          Choose File
        </label>

        {/* Upload */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`inline-flex min-w-[120px] items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 ${
            loading
              ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
              : "bg-violet-600 hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-900/20"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
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
                />

                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>

              Uploading...
            </>
          ) : (
            "Upload File"
          )}
        </button>

      </div>

      {/* Selected File */}
      {file && (
        <div className="mx-auto mt-5 flex max-w-md items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/70 px-4 py-2.5">

          <FileSpreadsheet
            size={16}
            className="shrink-0 text-violet-400"
          />

          <p className="truncate text-xs text-zinc-400">
            Selected:
            <span className="ml-1 font-medium text-zinc-200">
              {file.name}
            </span>
          </p>

        </div>
      )}

    </div>
  );
}

export default FileUploader;