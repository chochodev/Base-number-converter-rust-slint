import customtkinter as ctk

# Set appearance mode and color theme
ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("green")

# Base mappings
base_map = {"Decimal": 10, "Binary": 2, "Hexadecimal": 16, "Octal": 8}


def convert_to_decimal(num, base):
    """Convert any base number (integer or float) to decimal."""
    if "." in num:
        whole, frac = num.split(".")
        decimal_whole = int(whole, base)
        decimal_frac = sum(
            int(digit, base) / (base ** (i + 1)) for i, digit in enumerate(frac)
        )
        return decimal_whole + decimal_frac
    return int(num, base)


def decimal_to_base(decimal_num, base, precision=4):
    """Convert a decimal number (integer or float) to another base."""
    whole = int(decimal_num)
    frac = decimal_num - whole
    whole_part = format(
        whole, "b" if base == 2 else "o" if base == 8 else "x" if base == 16 else "d"
    )

    frac_part = []
    while frac and len(frac_part) < precision:
        frac *= base
        digit = int(frac)
        frac_part.append(format(digit, "x" if base == 16 else "d"))
        frac -= digit

    return f"{whole_part}.{''.join(frac_part)}" if frac_part else whole_part


def convert():
    num = entry.get().strip()
    from_base = base_map[from_base_var.get()]

    try:
        # Convert input to decimal
        decimal_value = convert_to_decimal(num, from_base)

        # Convert decimal to other bases
        binary = decimal_to_base(decimal_value, 2)
        octal = decimal_to_base(decimal_value, 8)
        hexadecimal = decimal_to_base(decimal_value, 16)

        # Update result labels
        binary_result.set(f"Binary: {binary}")
        decimal_result.set(f"Decimal: {decimal_value}")
        octal_result.set(f"Octal: {octal}")
        hexadecimal_result.set(f"Hexadecimal: {hexadecimal}")

        result_label.configure(text_color="green")
    except ValueError:
        binary_result.set("Invalid Input!")
        decimal_result.set("")
        octal_result.set("")
        hexadecimal_result.set("")
        result_label.configure(text_color="red")


# Create the main window
root = ctk.CTk()
root.title("Number Base Converter")
root.geometry("420x500")
root.resizable(False, False)

# Create a main frame
frame = ctk.CTkFrame(root, corner_radius=15)
frame.pack(pady=20, padx=20, fill="both", expand=True)

# Title Label
title_label = ctk.CTkLabel(
    frame, text="Number Base Converter", font=("Arial", 20, "bold")
)
title_label.pack(pady=10)

# Input Number
entry = ctk.CTkEntry(
    frame,
    placeholder_text="Enter a number",
    height=40,
    font=("Arial", 14),
    corner_radius=10,
)
entry.pack(pady=5, padx=20, fill="x")

# Select Base of the Input Number
ctk.CTkLabel(frame, text="Select Base:", font=("Arial", 14)).pack(pady=5)
from_base_var = ctk.StringVar(value="Decimal")
from_base_menu = ctk.CTkComboBox(
    frame,
    variable=from_base_var,
    values=list(base_map.keys()),
    height=40,
    corner_radius=10,
    state="readonly",
)
from_base_menu.pack(pady=5, padx=20, fill="x")

# Convert Button
convert_button = ctk.CTkButton(
    frame,
    text="Convert",
    command=convert,
    height=40,
    font=("Arial", 14, "bold"),
    corner_radius=10,
)
convert_button.pack(pady=15, padx=20, fill="x")

# Result Label
result_label = ctk.CTkLabel(
    frame, text="Conversion Results:", font=("Arial", 16, "bold")
)
result_label.pack(pady=5)

# Result Labels
binary_result = ctk.StringVar()
decimal_result = ctk.StringVar()
octal_result = ctk.StringVar()
hexadecimal_result = ctk.StringVar()

ctk.CTkLabel(
    frame, textvariable=binary_result, font=("Arial", 14), text_color="white"
).pack(pady=3)
ctk.CTkLabel(
    frame, textvariable=decimal_result, font=("Arial", 14), text_color="white"
).pack(pady=3)
ctk.CTkLabel(
    frame, textvariable=octal_result, font=("Arial", 14), text_color="white"
).pack(pady=3)
ctk.CTkLabel(
    frame, textvariable=hexadecimal_result, font=("Arial", 14), text_color="white"
).pack(pady=3)

# Run the application
root.mainloop()
