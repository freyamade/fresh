require "json"

# Get all the pkg files
pkgs = Dir["src/pkg/*.ts"]

# Loop through and build up a map of names to the JSON format required by fresh
output = {}
pkgs.each do |path|
  pkg_name = File.basename path, ".ts"
  summary_line = File.open(path).grep(/const summary: string/)[0]
  summary = /'(.*)'/.match(summary_line)[1]
  output[pkg_name] = {"summary": summary, "installed": false}
end

File.open("src/pkg/pkg.json", "w") do |file|
  file.write(output.to_json)
end
