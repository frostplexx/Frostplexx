{
  description = "GitHub README preview tool";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

  outputs = {
    self,
    nixpkgs,
  }: let
    system = "aarch64-darwin";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    apps.${system}.default = {
      type = "app";
      program = "${pkgs.lib.getExe pkgs.python3Packages.grip}";
    };

    devShells.${system}.default = pkgs.mkShell {
      packages = [pkgs.python3Packages.grip];
      shellHook = ''
        echo "Run: grip README.md --browser"
      '';
    };
  };
}
