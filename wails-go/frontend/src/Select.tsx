import { useState, useRef, useEffect } from 'react'

type Option = {
  value: string
  label: string
}

type CustomSelectProps = {
  options: Option[]
  value: string
  onChange: (value: string) => void
  id?: string
  className?: string
}

export default function CustomSelect({
  options,
  value,
  onChange,
  id,
  className = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const selectRef = useRef<HTMLDivElement>(null)

  // Find the selected option
  const selectedOption = options.find(option => option.value === value) || options[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setHighlightedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : prev
          )
          break
        case 'Enter':
        case 'Space':
          e.preventDefault()
          onChange(options[highlightedIndex].value)
          setIsOpen(false)
          break
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, highlightedIndex, options, onChange])

  // Reset highlighted index when opening dropdown
  useEffect(() => {
    if (isOpen) {
      const selectedIndex = options.findIndex(option => option.value === value)
      setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0)
    }
  }, [isOpen, options, value])

  return (
    <div 
      ref={selectRef}
      className={`relative ${className}`}
      onBlur={() => setIsOpen(false)}
    >
      <div
        className="flex items-center justify-between px-3 py-2.5 border border-gray-300 rounded-md bg-gray-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(prev => !prev)}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${id}-options`}
        id={id}
        tabIndex={0}
      >
        <span>{selectedOption.label}</span>
        <svg 
          className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <div 
        className={`absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transition-all duration-300 origin-top ${
          isOpen 
            ? 'opacity-100 transform scale-y-100 max-h-60' 
            : 'opacity-0 transform scale-y-0 max-h-0'
        }`}
        role="listbox"
        id={`${id}-options`}
        aria-labelledby={id}
      >
        <ul className="py-1 overflow-auto max-h-60">
          {options.map((option, index) => (
            <li
              key={option.value}
              className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
                highlightedIndex === index 
                  ? 'bg-blue-100 text-blue-900' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
