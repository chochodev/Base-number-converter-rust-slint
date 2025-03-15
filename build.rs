use slint_build::CompilerConfiguration;

fn main() {
  let config = CompilerConfiguration::new()
    .with_style("fluent-light".into());
  slint_build::compile_with_config("src/ui.slint", config).unwrap();
  // slint_build::compile("src/ui.slint").unwrap();
}
