import customtkinter as ctk

# Set appearance mode and color theme
ctk.set_appearance_mode("dark")  # Options: "light", "dark", "system"
ctk.set_default_color_theme("green")  # Options: "blue", "green", "dark-blue"

# Base mappings
base_map = {"Decimal": 10, "Binary": 2, "Hexadecimal": 16, "Octal": 8}

# Conversion function
def convert():
    try:
        num = entry.get().strip()
        from_base = base_map[from_base_var.get()]
        
        # Convert input number to decimal first
        decimal_value = int(num, from_base)
        
        # Convert decimal to all other bases
        binary = bin(decimal_value)[2:]
        octal = oct(decimal_value)[2:]
        hexadecimal = hex(decimal_value)[2:].upper()
        
        # Update result labels
        binary_result.set(f"Binary: {binary}")
        decimal_result.set(f"Decimal: {decimal_value}")
        octal_result.set(f"Octal: {octal}")
        hexadecimal_result.set(f"Hexadecimal: {hexadecimal}")

    except ValueError:
        binary_result.set("Invalid Input!")
        decimal_result.set("")
        octal_result.set("")
        hexadecimal_result.set("")

# Create the main window
root = ctk.CTk()
root.title("Number Base Converter")
root.geometry("400x400")
root.resizable(False, False)

# Create a frame
frame = ctk.CTkFrame(root)
frame.pack(pady=20, padx=20, fill="both", expand=True)

# Input Number
ctk.CTkLabel(frame, text="Enter Number:").pack(pady=5)
entry = ctk.CTkEntry(frame, placeholder_text="Enter a number")
entry.pack(pady=5)

# Select Base of the Input Number
ctk.CTkLabel(frame, text="From Base:").pack(pady=5)
from_base_var = ctk.StringVar(value="Decimal")
from_base_menu = ctk.CTkComboBox(frame, variable=from_base_var, values=list(base_map.keys()))
from_base_menu.pack(pady=5)

# Convert Button
convert_button = ctk.CTkButton(frame, text="Convert", command=convert)
convert_button.pack(pady=10)

# Result Labels
binary_result = ctk.StringVar()
decimal_result = ctk.StringVar()
octal_result = ctk.StringVar()
hexadecimal_result = ctk.StringVar()

ctk.CTkLabel(frame, textvariable=binary_result, font=("Helvetica", 14)).pack(pady=5)
ctk.CTkLabel(frame, textvariable=decimal_result, font=("Helvetica", 14)).pack(pady=5)
ctk.CTkLabel(frame, textvariable=octal_result, font=("Helvetica", 14)).pack(pady=5)
ctk.CTkLabel(frame, textvariable=hexadecimal_result, font=("Helvetica", 14)).pack(pady=5)

# Run the application
root.mainloop()