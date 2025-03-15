slint::include_modules!();

use slint::{ModelRc, VecModel};
use std::rc::Rc;

fn main() {
    let app = App::new().unwrap();
    let window = app.window();
    
    // Set the window to be resizable
    window.set_size_policy(WindowSizePolicy::Resize);

    let options = vec![
        "Decimal".into(),
        "Binary".into(),
        "Octal".into(),
        "Hexadecimal".into(),
    ];
    let options_model = ModelRc::from(Rc::new(VecModel::from(options)));

    // Set options for ComboBox
    app.set_options(options_model.clone());

    app.on_calculate({
        let app_weak = app.as_weak();
        move || {
            if let Some(app) = app_weak.upgrade() {
                app.set_has_error(false);
                let input = app.get_input_value().trim().to_string();
                let selected_base = app.get_selected_value().to_string();
    
                if input.is_empty() {
                    app.set_output_value("Invalid number".into());
                    app.set_binary_output("Invalid".into());
                    app.set_octal_output("Invalid".into());
                    app.set_decimal_output("Invalid".into());
                    app.set_hex_output("Invalid".into());
                    return;
                }
    
                // Convert input to decimal first
                let decimal_value = match selected_base.as_str() {
                    "Binary" => u64::from_str_radix(&input, 2),
                    "Octal" => u64::from_str_radix(&input, 8),
                    "Decimal" => input.parse::<u64>(),
                    "Hexadecimal" => u64::from_str_radix(&input, 16),
                    _ => {
                        app.set_output_value("Invalid base".into());
                        return;
                    }
                };
    
                let value = match decimal_value {
                    Ok(v) => v,
                    Err(_) => {
                        app.set_output_value("Invalid number".into());
                        app.set_has_error(true);
                        return;
                    }
                };
    
                // Convert to all bases
                let binary_result = format!("{:b}", value);
                let octal_result = format!("{:o}", value);
                let decimal_result = value.to_string();
                let hex_result = format!("{:x}", value);
    
                // Update UI
                app.set_binary_output(binary_result.into());
                app.set_octal_output(octal_result.into());
                app.set_decimal_output(decimal_result.into());
                app.set_hex_output(hex_result.into());
            }
        }
    });    
    

    app.run().unwrap();
}