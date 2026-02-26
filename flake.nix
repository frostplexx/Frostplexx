{
  description = "GitHub README preview tool";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

  outputs = {
    self,
    nixpkgs,
  }: let
    system = "aarch64-darwin";
    pkgs = nixpkgs.legacyPackages.${system};

    generateScript = pkgs.writeShellApplication {
      name = "generate-readme";
      runtimeInputs = [pkgs.nodejs_22];
      text = ''
        cd "$(git rev-parse --show-toplevel)"
        npm install
        npm run start
      '';
    };
  in {
    apps.${system} = {
      default = {
        type = "app";
        program = "${pkgs.lib.getExe pkgs.python3Packages.grip}";
      };
      generate = {
        type = "app";
        program = "${pkgs.lib.getExe generateScript}";
      };
    };

    devShells.${system}.default = pkgs.mkShell {
      packages = [pkgs.nodejs_22 pkgs.python3Packages.grip];
      shellHook = ''
        echo "Commands:"
        echo "  nix run .#generate       — regenerate README.md"
        echo "  grip README.md --browser  — preview README in browser"
      '';
    };
  };
}
