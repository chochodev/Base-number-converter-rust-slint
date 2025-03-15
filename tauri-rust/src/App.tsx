import { useState } from "react"

export default function NumberBaseConverterV2() {
  const [values, setValues] = useState({
    binary: "",
    octal: "",
    decimal: "",
    hexadecimal: "",
  })

  const [activeBase, setActiveBase] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  // Validation patterns for each base
  const validationPatterns = {
    binary: /^[01]*$/,
    octal: /^[0-7]*$/,
    decimal: /^[0-9]*$/,
    hexadecimal: /^[0-9A-Fa-f]*$/,
  }

  // Base information for display
  const baseInfo = {
    binary: { base: 2, label: "Binary", prefix: "0b", digits: "0, 1" },
    octal: { base: 8, label: "Octal", prefix: "0o", digits: "0-7" },
    decimal: { base: 10, label: "Decimal", prefix: "0a", digits: "0-9" },
    hexadecimal: { base: 16, label: "Hexadecimal", prefix: "0x", digits: "0-9, A-F" },
  }

  // Handle input change for any field
  const handleInputChange = (base: string, value: string) => {
    // Validate input for the specific base
    if (value && !validationPatterns[base].test(value)) {
      return
    }

    setActiveBase(base)
    setError(null)

    // Update the current field
    const newValues = { ...values, [base]: value }
    setValues(newValues)

    // If the field is empty, clear all fields
    if (!value) {
      setValues({
        binary: "",
        octal: "",
        decimal: "",
        hexadecimal: "",
      })
      return
    }

    try {
      // Convert to decimal first
      const decimalValue = Number.parseInt(value, baseInfo[base].base)

      if (isNaN(decimalValue)) {
        setError("Invalid number")
        return
      }

      // Then convert decimal to all other bases
      Object.keys(baseInfo).forEach((targetBase) => {
        if (targetBase !== base) {
          newValues[targetBase] = decimalValue.toString(baseInfo[targetBase].base).toUpperCase()
        }
      })

      setValues(newValues)
    } catch (err) {
      setError("Conversion error occurred")
    }
  }

  // Copy value to clipboard
  const copyToClipboard = (base: string) => {
    if (!values[base]) return

    const textToCopy = baseInfo[base].prefix + values[base]
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(base)
        setTimeout(() => setCopied(null), 2000)
      })
      .catch(() => {
        setError("Failed to copy to clipboard")
      })
  }

  // Clear all values
  const clearAll = () => {
    setValues({
      binary: "",
      octal: "",
      decimal: "",
      hexadecimal: "",
    })
    setActiveBase(null)
    setError(null)
  }

  // Generate example for each base
  const getExample = (base: string) => {
    const examples = {
      binary: "1010",
      octal: "52",
      decimal: "42",
      hexadecimal: "2A",
    }
    return examples[base]
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Number System Converter</h2>

      {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(baseInfo).map((base) => (
          <div
            key={base}
            className={`p-4 rounded-lg border-2 transition-all ${activeBase === base ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">{baseInfo[base].label}</h3>
              <div className="text-sm text-gray-500">Base {baseInfo[base].base}</div>
            </div>

            <div className="flex items-center mb-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">{baseInfo[base].prefix}</span>
                </div>
                <input
                  type="text"
                  value={values[base]}
                  onChange={(e) => handleInputChange(base, e.target.value)}
                  className={`w-full pl-8 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 border-solid focus:border-0`}
                  placeholder={`Enter ${baseInfo[base].label}`}
                />
                {values[base] && (
                  <button
                    onClick={() => copyToClipboard(base)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    title="Copy to clipboard"
                  >
                    {copied === base ? (
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p>
                Valid digits: <span className="font-mono">{baseInfo[base].digits}</span>
              </p>
              <p className="mt-1">
                Example:{" "}
                <button
                  className="text-blue-500 hover:underline font-mono"
                  onClick={() => handleInputChange(base, getExample(base))}
                >
                  {baseInfo[base].prefix}
                  {getExample(base)}
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button onClick={clearAll} className="px-4 text-sm py-1 bg-gray-50 border-solid border border-gray-300 hover:bg-gray-100 active:bg-white rounded-md transition-colors">
          Clear All
        </button>
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <h3 className="font-medium text-gray-700 mb-2">Number Systems</h3>
        <ol className="list-disc pl-5 space-y-1">
          <li>
            <strong>Emmanuel Michael</strong>
          </li>
          <li>
            <strong>John Doe</strong>
          </li>
          <li>
            <strong>Emmanuel Michael</strong>
          </li>
          <li>
            <strong>John Doe</strong>
          </li>
        </ol>
      </div>
    </div>
  )
}

