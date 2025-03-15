import type React from 'react';
import { useState, useRef } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [selectedBase, setSelectedBase] = useState('10');
  const [error, setError] = useState('');
  const [conversions, setConversions] = useState({
    binary: '',
    decimal: '',
    hexadecimal: '',
    octal: '',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [moreDetails, setMoreDetails] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Validation patterns for each base
  const validationPatterns = {
    '2': /^[01]+$/,
    '8': /^[0-7]+$/,
    '10': /^[0-9]+$/,
    '16': /^[0-9A-Fa-f]+$/,
  };

  const baseNames = {
    '2': 'binary',
    '8': 'octal',
    '10': 'decimal',
    '16': 'hexadecimal',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    validateAndConvert(value, selectedBase);
  };

  const handleBaseChange = (value: string) => {
    setSelectedBase(value);
    validateAndConvert(input, value);
  };

  const validateAndConvert = (value: string, base: string) => {
    if (!value) {
      setError('');
      setConversions({
        binary: '',
        decimal: '',
        hexadecimal: '',
        octal: '',
      });
      return;
    }

    // Check if input is valid for the selected base
    if (!validationPatterns[base].test(value)) {
      setError(`Invalid input for ${baseNames[base]} format`);
      setConversions({
        binary: '',
        decimal: '',
        hexadecimal: '',
        octal: '',
      });
      return;
    }

    setError('');

    try {
      // Convert input to decimal first
      const decimalValue = Number.parseInt(value, Number.parseInt(base));

      // Convert decimal to all other bases
      const result = {
        binary: decimalValue.toString(2),
        decimal: decimalValue.toString(10),
        hexadecimal: decimalValue.toString(16).toUpperCase(),
        octal: decimalValue.toString(8),
      };

      // Remove the selected base from the results
      result[baseNames[base]] = '';

      setConversions(result);
    } catch (err) {
      setError('Conversion error occurred');
      setConversions({
        binary: '',
        decimal: '',
        hexadecimal: '',
        octal: '',
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-300 h-screen w-screen">
      <div className="fixed inset-0 gap-4 bg-black/15 flex flex-col items-center justify-center p-4 z-50">
        <h1 className="text-xl font-[600] text-gray-800">
          Base System Converter
        </h1>
        <div
          ref={modalRef}
          className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 max-h-[90vh]"
        >
          <p className="text-gray-600 mb-4 text-sm">
            Enter a number and select its base to convert it to other number
            systems.
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="number" className="text-right font-medium">
                Number
              </label>
              <input
                id="number"
                value={input}
                onChange={handleInputChange}
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-gray-200 placeholder:text-gray-600 focus:ring-teal-500"
                placeholder="Enter a number"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="base" className="text-right font-medium">
                Base
              </label>
              <div className="relative col-span-3">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-gray-200 capitalize focus:ring-teal-500 text-left"
                >
                  {baseNames[selectedBase]} (Base {selectedBase})
                </button>
                {isDropdownOpen && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg transition-all duration-300 ease-in-out border-solid">
                    <li
                      onClick={() => {
                        handleBaseChange('2');
                        setIsDropdownOpen(false);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      Binary (Base 2)
                    </li>
                    <li
                      onClick={() => {
                        handleBaseChange('8');
                        setIsDropdownOpen(false);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      Octal (Base 8)
                    </li>
                    <li
                      onClick={() => {
                        handleBaseChange('10');
                        setIsDropdownOpen(false);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      Decimal (Base 10)
                    </li>
                    <li
                      onClick={() => {
                        handleBaseChange('16');
                        setIsDropdownOpen(false);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      Hexadecimal (Base 16)
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}

            <div className="mt-4 space-y-3">
              <h3 className="font-medium">Conversions:</h3>
              {conversions.binary && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right font-medium">Binary:</span>
                  <div className="col-span-3 rounded-md border border-gray-300 bg-gray-100 px-3 py-2">
                    {conversions.binary}
                  </div>
                </div>
              )}
              {conversions.octal && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right font-medium">Octal:</span>
                  <div className="col-span-3 rounded-md border border-gray-300 bg-gray-100 px-3 py-2">
                    {conversions.octal}
                  </div>
                </div>
              )}
              {conversions.decimal && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right font-medium">Decimal:</span>
                  <div className="col-span-3 rounded-md border border-gray-300 bg-gray-100 px-3 py-2">
                    {conversions.decimal}
                  </div>
                </div>
              )}
              {conversions.hexadecimal && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right font-medium">Hexadecimal:</span>
                  <div className="col-span-3 rounded-md border border-gray-300 bg-gray-100 px-3 py-2">
                    {conversions.hexadecimal}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg space-y-2 max-w-md w-full p-6 py-4 max-h-[90vh]">
          <div className="flex w-full justify-between items-center">
            <h2 className="inline text-md uppercase font-[600]">By Group 3</h2>
            <button
              onClick={() => setMoreDetails((prev) => !prev)}
              className="text-xsm bg-gray-100 transition-all border border-solid border-gray-300 hover:bg-gray-200 text-gray-800 active:bg-gray-100 tracking-wider inline py-1 px-4 rounded-md"
            >
              {!moreDetails ? 'More' : 'Less'} Details
            </button>
          </div>

          {moreDetails && (
            <table className="text-gray-800 text-sm">
              <thead className="w-full text-base">
                <tr className="font-[600] w-full">
                  <td>S/N</td>
                  <td className="px-4 min-w-[18rem]">Name</td>
                  <td>Matric no</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1.</td>
                  <td className="px-4 min-w-[15rem]">Emmanuel Michael</td>
                  <td>MEE/20/0000</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td className="px-4 min-w-[15rem]">John Doe</td>
                  <td>MEE/20/0000</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
